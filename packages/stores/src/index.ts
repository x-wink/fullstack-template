import { createPinia } from 'pinia';

declare module 'pinia' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    export interface DefineStoreOptionsBase<S, Store> {
        local?: boolean;
        session?: boolean;
        key?: string;
        ignore?: string[];
    }
}

export const pinia = createPinia();
pinia.use(({ options, store }) => {
    const storage = options.local ? localStorage : options.session ? sessionStorage : void 0;
    if (storage) {
        const key = options.key ?? `pinia-state:${store.$id}`;
        const ignores = options.ignore ?? [];
        const keep = ignores.reduce(
            (sum, item) => {
                sum[item] = store.$state[item];
                return sum;
            },
            {} as Record<string, unknown>
        );
        store.$state = Object.assign(JSON.parse(storage.getItem(key) ?? '{}'), keep);
        store.$subscribe(() => {
            const data = { ...store.$state };
            ignores.forEach((item) => {
                delete data[item];
            });
            storage.setItem(key, JSON.stringify(data));
        });
    }
});

export * from './user';
export * from './layout';
