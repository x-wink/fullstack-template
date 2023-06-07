import { createRouter, createWebHistory } from 'vue-router';

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
            },
            {
                path: '/blogs',
                name: 'Blogs',
                component: () => import('@/views/blogs/index.vue'),
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
