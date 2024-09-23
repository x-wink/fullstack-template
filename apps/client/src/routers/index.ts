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
                    name: 'Home',
                    path: 'home',
                    component: () => import('@/views/home/index.vue'),
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
        } else {
            next();
        }
    } else {
        next();
    }
});
