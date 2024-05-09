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
                {
                    name: 'ReserveManage',
                    path: 'reserve',
                    redirect: { name: 'SearchReserve' },
                    children: [
                        {
                            name: 'RoomManage',
                            path: 'room',
                            redirect: { name: 'SearchRoom' },
                            children: [
                                {
                                    name: 'SearchRoom',
                                    path: 'list',
                                    component: () => import('@/views/reserve/room/list.vue'),
                                },
                                {
                                    name: 'CreateRoom',
                                    path: 'form',
                                    component: () => import('@/views/reserve/room/form.vue'),
                                },
                                {
                                    name: 'UpdateRoom',
                                    path: 'form/:id',
                                    component: () => import('@/views/reserve/room/form.vue'),
                                },
                                {
                                    name: 'RoomRecord',
                                    path: 'record/:id',
                                    component: () => import('@/views/reserve/room/record.vue'),
                                },
                            ],
                        },
                        {
                            name: 'TimeManage',
                            path: 'time',
                            redirect: { name: 'SearchTime' },
                            children: [
                                {
                                    name: 'SearchTime',
                                    path: 'list',
                                    component: () => import('@/views/reserve/time/list.vue'),
                                },
                                {
                                    name: 'CreateTime',
                                    path: 'form',
                                    component: () => import('@/views/reserve/time/form.vue'),
                                },
                                {
                                    name: 'UpdateTime',
                                    path: 'form/:id',
                                    component: () => import('@/views/reserve/time/form.vue'),
                                },
                            ],
                        },
                        {
                            name: 'BookingManage',
                            path: 'booking',
                            redirect: { name: 'SearchBooking' },
                            children: [
                                {
                                    name: 'SearchBooking',
                                    path: 'list',
                                    component: () => import('@/views/reserve/booking/list.vue'),
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'SignManage',
                    path: 'sign',
                    redirect: { name: 'SearchSign' },
                    children: [
                        {
                            name: 'SearchSign',
                            path: 'list',
                            component: () => import('@/views/sign/list.vue'),
                        },
                    ],
                },
                {
                    name: 'FeedbackManage',
                    path: 'feedback',
                    redirect: { name: 'SearchFeedback' },
                    children: [
                        {
                            name: 'SearchFeedback',
                            path: 'list',
                            component: () => import('@/views/feedback/list.vue'),
                        },
                    ],
                },
                {
                    name: 'CleaningManage',
                    path: 'cleaning',
                    redirect: { name: 'SearchCleaning' },
                    children: [
                        {
                            name: 'SearchCleaning',
                            path: 'list',
                            component: () => import('@/views/cleaning/list.vue'),
                        },
                        {
                            name: 'CreateCleaning',
                            path: 'form',
                            component: () => import('@/views/cleaning/form.vue'),
                        },
                        {
                            name: 'UpdateCleaning',
                            path: 'form/:id',
                            component: () => import('@/views/cleaning/form.vue'),
                        },
                    ],
                },
                {
                    name: 'ApprovalManage',
                    path: 'approval',
                    redirect: { name: 'SearchSignupApproval' },
                    children: [
                        {
                            name: 'SignupApproval',
                            path: 'signup',
                            redirect: { name: 'SearchSignupApproval' },
                            children: [
                                {
                                    name: 'SearchSignupApproval',
                                    path: 'list',
                                    component: () => import('@/views/approval/signup/list.vue'),
                                },
                            ],
                        },
                        {
                            name: 'BookingApproval',
                            path: 'booking',
                            redirect: { name: 'SearchBookingApproval' },
                            children: [
                                {
                                    name: 'SearchBookingApproval',
                                    path: 'list',
                                    component: () => import('@/views/approval/booking/list.vue'),
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
