import { PluginDefine, definePlugin } from '@/core';

export const BlogPlugin = definePlugin((context) => {
    const id = 'Blog';
    const view = {
        name: id,
        route: '/blog',
        $main: () => import('@/views/blog/main.vue'),
        $aside: () => import('@/views/blog/aside.vue'),
    };
    context.registView(view);

    context.registModule({
        name: id,
        title: '博客',
        route: view.route,
    });
    return {
        id,
    } as PluginDefine;
});
