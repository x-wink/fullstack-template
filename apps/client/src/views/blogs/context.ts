import svg2img from './svg2img.md?raw';
import test from './test.md?raw';
import { createSharedComposable } from '@pkgs/lib';
export const useContext = createSharedComposable(() => {
    console.info('start');
    const current = ref(0);
    const list = reactive([
        {
            name: 'SVG转图片',
            content: svg2img,
        },
        {
            name: '测试',
            content: test,
        },
    ]);
    return {
        current,
        list,
    };
});
