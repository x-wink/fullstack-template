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
            {
                path: '/icon',
                name: 'Icon',
                component: () => import('@/views/icon.vue'),
                meta: {
                    module: '图标',
                },
            },
        ],
    },
    {
        path: '/game',
        name: 'Game',
        redirect: { name: 'FiveGame' },
        children: [
            {
                path: 'five',
                name: 'FiveGame',
                component: () => import('@/games/five.vue'),
            },
        ],
    },
] as RouteRecordRaw[];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
