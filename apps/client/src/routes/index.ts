import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: { name: 'Home' },
        name: 'App',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('@/views/home.vue'),
                meta: {
                    module: '首页',
                },
            },
            {
                path: '/blog',
                name: 'Blog',
                components: {
                    default: () => import('@/views/blog/main.vue'),
                    aside: () => import('@/views/blog/aside.vue'),
                },
                meta: {
                    module: '博客',
                },
            },
            {
                path: '/canvas',
                name: 'Canvas',
                component: () => import('@/views/canvas.vue'),
                meta: {
                    module: '画布',
                },
            },
        ],
    },
] as RouteRecordRaw[];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
