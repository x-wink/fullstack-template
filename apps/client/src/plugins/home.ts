import { PluginDefine, definePlugin } from '@/core';

export const HomePlugin = definePlugin((context) => {
    const id = 'Home';
    const view = {
        name: id,
        route: '/home',
        $main: () => import('@/views/home.vue'),
    };
    context.registView(view);
    const router = useRouter();
    router.push({ name: id });

    context.registModule({
        name: id,
        title: '首页',
        route: view.route,
    });
    return {
        id,
    } as PluginDefine;
});
