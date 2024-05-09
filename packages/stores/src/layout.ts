import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayoutStore = defineStore(
    'layout',
    () => {
        const title = ref('首页');
        return {
            title,
        };
    },
    { local: true }
);
