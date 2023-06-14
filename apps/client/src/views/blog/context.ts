import svg2img from './svg2img.md?raw';
import todo from './todo.md?raw';
import { createSharedComposable } from '@pkgs/lib';
export const useContext = createSharedComposable(() => {
    const list = reactive([
        {
            title: '待办列表',
            content: todo,
        },
        {
            title: 'SVG转图片',
            content: svg2img,
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
