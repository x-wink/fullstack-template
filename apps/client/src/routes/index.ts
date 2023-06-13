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
                components: {
                    default: () => import('@/views/blogs/main.vue'),
                    aside: () => import('@/views/blogs/aside.vue'),
                },
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
