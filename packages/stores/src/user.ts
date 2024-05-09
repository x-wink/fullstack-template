import { UserType, type Menu, type PSignin, type User } from '@pkgs/model';
import type { TreeNode } from '@xwink/utils';
import { defineStore } from 'pinia';
import { decode } from '@pkgs/jwt';
import { ref, computed } from 'vue';
import * as api from '@pkgs/apis';

export const useUserStore = defineStore(
    'user',
    () => {
        const code = ref('');
        const token = ref('');
        const profile = ref<User>();
        const isEmployee = computed(() => profile.value?.type === UserType.EMPLOYEE);
        const menus = ref<TreeNode<Menu>[]>([]);
        const returnUrl = ref('');

        const signin = async (form: PSignin) => {
            const res = await api.signin(form);
            if (res) {
                token.value = res;
                profile.value = decode(res) as User;
                await loadMenu();
            }
            return res;
        };
        const signout = () => {
            token.value = '';
            profile.value = undefined;
            menus.value = [];
            returnUrl.value = location.toString();
            location.reload();
        };
        const loadMenu = async (params?: Partial<Menu>) => {
            menus.value = (await api.searchMenu(params)) ?? [];
        };
        return {
            code,
            token,
            profile,
            isEmployee,
            menus,
            returnUrl,
            signin,
            signout,
            loadMenu,
        };
    },
    { local: true, ignore: ['code'] }
);
