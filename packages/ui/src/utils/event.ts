import { onMounted, onUnmounted } from 'vue';
export const useClickOutside = (fn: (e?: MouseEvent) => void) => {
    const els = [] as HTMLElement[];
    const handleClick = (e: MouseEvent) => {
        if (els.some((el) => !el.contains(e.target as HTMLElement))) {
            fn(e);
            console.info('outside');
        }
    };
    onMounted(() => {
        window.addEventListener('click', handleClick);
    });
    onUnmounted(() => {
        window.removeEventListener('click', handleClick);
    });
    return {
        observe: (target: HTMLElement | (() => HTMLElement)) => {
            const el = target instanceof Function ? target() : target;
            els.push(el);
        },
        unobserve: (target: HTMLElement | (() => HTMLElement)) => {
            const el = target instanceof Function ? target() : target;
            els.splice(els.indexOf(el), 1);
        },
    };
};
