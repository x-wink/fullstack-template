export const debounce = <T extends (...args: A) => void, A extends unknown[]>(func: T, delay: number): T => {
    let clearId: ReturnType<typeof setTimeout>;
    return ((...args: A) => {
        clearTimeout(clearId);
        clearId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }) as T;
};

import { getCurrentScope, onScopeDispose, effectScope, EffectScope } from 'vue';
const tryOnScopeDispose = (fn: () => void) => {
    if (getCurrentScope()) {
        onScopeDispose(fn);
    }
};
export const createSharedComposable = <T, P extends unknown[]>(setup: (...args: P) => T): ((...args: P) => T) => {
    let subscribers = 0;
    let state: T | undefined;
    let scope: EffectScope | undefined;

    const dispose = () => {
        subscribers -= 1;
        if (scope && subscribers <= 0) {
            scope.stop();
            state = undefined;
            scope = undefined;
        }
    };
    return (...args: P) => {
        subscribers += 1;
        if (!state) {
            scope = effectScope(true);
            state = scope.run(() => setup(...args));
        }
        tryOnScopeDispose(dispose);
        return state!;
    };
};
