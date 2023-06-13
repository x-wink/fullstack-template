import svg2img from './svg2img.md?raw';
import test from './test.md?raw';
import { createSharedComposable } from '@pkgs/lib';
export const useContext = createSharedComposable(() => {
    const current = ref(0);
    const list = reactive([
        {
            title: 'SVG转图片',
            content: svg2img,
        },
        {
            title: '测试',
            content: test,
        },
    ]);
    return {
        current,
        list,
    };
});
