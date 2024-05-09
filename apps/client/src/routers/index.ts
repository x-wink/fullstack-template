import { UserStatus } from '@pkgs/model';
import { exprised } from '@pkgs/jwt';
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
                    name: 'Signin',
                    path: 'signin',
                    component: () => import('@/views/signin/index.vue'),
                    meta: {
                        guest: true,
                        header: false,
                    },
                },
                {
                    name: 'Signup',
                    path: 'signup',
                    component: () => import('@/views/signup/index.vue'),
                    meta: {
                        guest: true,
                        header: false,
                    },
                },
                {
                    name: 'Status',
                    path: 'status/:status',
                    component: () => import('@/views/status/index.vue'),
                    meta: {},
                },
                {
                    name: 'Room',
                    path: 'room',
                    component: () => import('@/views/room/index.vue'),
                    meta: {},
                },
                {
                    name: 'Seat',
                    path: 'seat/:id',
                    component: () => import('@/views/seat/index.vue'),
                    meta: {},
                },
                {
                    name: 'Confirm',
                    path: 'confirm/:id',
                    component: () => import('@/views/confirm/index.vue'),
                    meta: {},
                },
                {
                    name: 'Help',
                    path: 'help',
                    component: () => import('@/views/help/index.vue'),
                    meta: {},
                },
                {
                    name: 'Rule',
                    path: 'rule',
                    component: () => import('@/views/rule/index.vue'),
                    meta: {},
                },
                {
                    name: 'Feedback',
                    path: 'feedback',
                    component: () => import('@/views/feedback/index.vue'),
                    meta: {},
                },
                {
                    name: 'Task',
                    path: 'task',
                    component: () => import('@/views/task/index.vue'),
                    meta: {},
                },
                {
                    name: 'List',
                    path: 'list',
                    component: () => import('@/views/list/index.vue'),
                    meta: {},
                },
                {
                    name: 'Scan',
                    path: 'scan/:id/:type',
                    component: () => import('@/views/scan/index.vue'),
                    meta: {
                        guest: true,
                    },
                },
                {
                    name: 'Home',
                    path: 'home',
                    component: () => import('@/views/home/index.vue'),
                    meta: {
                        header: false,
                        footer: true,
                    },
                },
                {
                    name: 'Profile',
                    path: 'profile',
                    component: () => import('@/views/profile/index.vue'),
                    meta: {
                        header: false,
                        footer: true,
                    },
                },
            ],
        },
    ],
});
router.beforeEach((to, _, next) => {
    const userStore = useUserStore();
    if (location.protocol === 'https:' && to.name === 'Signup') {
        const search = new URLSearchParams(window.location.search);
        const code = search.get('code');
        if (!code) {
            const path = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
                import.meta.env.VITE_APPID
            }&redirect_uri=${encodeURIComponent(
                location.origin + router.resolve(to).href
            )}&response_type=code&scope=snsapi_userinfo&state=xwink#wechat_redirect`;
            location.replace(path);
            return;
        }
        userStore.code = code;
    }
    if (!to.meta.guest) {
        if (!userStore.token || exprised(userStore.token)) {
            next({ name: 'Signin' });
        } else if (userStore.profile?.status !== UserStatus.ACCEPT && to.name !== 'Status') {
            next({ name: 'Status', params: { status: 'approval' } });
        } else {
            next();
        }
    } else {
        next();
    }
});
