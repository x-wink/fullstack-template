import { createUser, detailUser, updateUser, type User } from '@/api/user';
import router from '@/routes';
let user: User | undefined;
export const getUser = async (): Promise<User> => {
    if (!user) {
        const localUser = JSON.parse(localStorage.getItem('user') || 'null') as User | null;
        if (localUser) {
            user = await detailUser(localUser.id!);
        }
        if (!user) {
            user = {};
            user.id = await createUser(user);
        }
        setUser(user, false);
    }
    return user;
};
export const setUser = async (user: User, api = true) => {
    if (api) {
        await updateUser(user);
    }
    localStorage.setItem('user', JSON.stringify(user));
};
export const doSignout = async () => {
    localStorage.clear();
    await router.replace({ name: 'Home' });
    showAlert('您的身份信息已失效');
};

import { showConfirmDialog, showDialog } from 'vant';
export const showAlert = (message: string) => {
    return showDialog({ message });
};
export const showConfirm = (message: string) => {
    return showConfirmDialog({ message });
};

import mitt from 'mitt';
export const eventBus = mitt();
