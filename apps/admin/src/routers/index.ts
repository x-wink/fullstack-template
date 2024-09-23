import { createRouter, createWebHistory } from 'vue-router';
export const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes: [
        {
            name: 'App',
            path: '/',
            redirect: { name: 'Home' },
            component: () => import('@/layouts/index.vue'),
            children: [
                {
                    name: 'Home',
                    path: 'home',
                    component: () => import('@/views/home/index.vue'),
                },
                {
                    name: 'SystemManage',
                    path: 'system',
                    redirect: { name: 'UserManage' },
                    children: [
                        {
                            name: 'Demo',
                            path: 'demo',
                            component: () => import('@/views/system/demo/index.vue'),
                            meta: {
                                guest: true,
                            },
                        },
                        {
                            name: 'UserManage',
                            path: 'user',
                            redirect: { name: 'SearchUser' },
                            children: [
                                {
                                    name: 'SearchUser',
                                    path: 'list',
                                    component: () => import('@/views/system/user/list.vue'),
                                },
                                {
                                    name: 'CreateUser',
                                    path: 'form',
                                    component: () => import('@/views/system/user/form.vue'),
                                },
                                {
                                    name: 'UpdateUser',
                                    path: 'form/:id',
                                    component: () => import('@/views/system/user/form.vue'),
                                },
                            ],
                        },
                        {
                            name: 'MenuManage',
                            path: 'menu',
                            redirect: { name: 'SearchMenu' },
                            children: [
                                {
                                    name: 'SearchMenu',
                                    path: 'list',
                                    component: () => import('@/views/system/menu/list.vue'),
                                },
                                {
                                    name: 'CreateMenu',
                                    path: 'form',
                                    component: () => import('@/views/system/menu/form.vue'),
                                },
                                {
                                    name: 'UpdateMenu',
                                    path: 'form/:id',
                                    component: () => import('@/views/system/menu/form.vue'),
                                },
                            ],
                        },
                        {
                            name: 'RoleManage',
                            path: 'role',
                            redirect: { name: 'SearchRole' },
                            children: [
                                {
                                    name: 'SearchRole',
                                    path: 'list',
                                    component: () => import('@/views/system/role/list.vue'),
                                },
                                {
                                    name: 'CreateRole',
                                    path: 'form',
                                    component: () => import('@/views/system/role/form.vue'),
                                },
                                {
                                    name: 'UpdateRole',
                                    path: 'form/:id',
                                    component: () => import('@/views/system/role/form.vue'),
                                },
                            ],
                        },
                        {
                            name: 'LogManage',
                            path: 'log',
                            redirect: { name: 'SearchLog' },
                            children: [
                                {
                                    name: 'SearchLog',
                                    path: 'list',
                                    component: () => import('@/views/system/log/list.vue'),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'Signin',
            path: '/signin',
            component: () => import('@/views/login/index.vue'),
            meta: {
                guest: true,
            },
        },
    ],
});
router.beforeEach((to, _, next) => {
    const userStore = useUserStore();
    if (!to.meta.guest && !userStore.token) {
        next({ name: 'Signin' });
    } else {
        next();
    }
});
