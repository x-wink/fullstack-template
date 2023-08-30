import { createSharedComposable } from '.';
export const useClickOutside = createSharedComposable((el: HTMLElement, fn: (e?: MouseEvent) => void) => {
    const handleClick = (event: MouseEvent) => {
        if (el.contains(event.target as HTMLElement)) {
            fn(event);
        }
    };
    return {
        invoke: () => {
            console.info('invoke');
            window.addEventListener('click', handleClick);
        },
        revoke: () => {
            window.removeEventListener('click', handleClick);
        },
    };
});
