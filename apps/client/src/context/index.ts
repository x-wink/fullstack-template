import { createSharedComposable } from '@pkgs/lib';
export const useContext = createSharedComposable(() => {
    const portrait = ref(false);
    const updatePortrait = () => {
        portrait.value = window.innerWidth < window.innerHeight;
    };
    updatePortrait();
    window.addEventListener('orientationchange', updatePortrait);
    window.addEventListener('resize', updatePortrait);
    return {
        /**
         * 是否竖屏
         */
        isPortrait: computed(() => portrait),
    };
});
