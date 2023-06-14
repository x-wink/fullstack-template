import svg2img from './svg2img.md?raw';
import test from './test.md?raw';
import { createSharedComposable } from '@pkgs/lib';
export const useContext = createSharedComposable(() => {
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
    const route = useRoute();
    const current = ref(
        Math.max(
            list.findIndex((item) => item.title === route.query.title),
            0
        )
    );
    const router = useRouter();
    watch(
        current,
        (value) => {
            router.push({ name: route.name!, query: { ...route.query, title: list[value].title } });
        },
        {
            immediate: true,
        }
    );
    return {
        current,
        list,
    };
});
