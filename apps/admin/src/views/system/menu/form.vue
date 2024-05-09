<template>
    <CommonForm v-model="form" :create="create" :get="get" :rules="rules" :update="update" @saved="handleSaved">
        <el-form-item label="上级菜单" prop="parentId">
            <el-tree-select
                v-model="form.parentId"
                accordion
                check-strictly
                clearable
                :data="menuTree"
                default-expand-all
                node-key="id"
                :props="{
                    label: 'title',
                    disabled: ignoreSelfAndChildren,
                }"
                show-checkbox
            />
        </el-form-item>
        <el-form-item label="名称" prop="label">
            <el-input v-model="form.label" clearable />
        </el-form-item>
        <el-form-item label="权限" prop="permission">
            <el-input v-model="form.permission" clearable />
        </el-form-item>
        <el-form-item label="地址" prop="url">
            <el-input v-model="form.url" clearable />
        </el-form-item>
        <el-form-item label="类型" prop="type">
            <el-radio-group v-model="form.type">
                <el-radio-button :label="0">路由</el-radio-button>
                <el-radio-button :label="1">外链</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
            <el-input-number v-model="form.sort" :step="10" />
        </el-form-item>
        <el-form-item label="显示" prop="visible">
            <el-switch v-model="form.visible" active-text="可见" />
        </el-form-item>
    </CommonForm>
</template>

<script setup lang="ts">
    import { menuDefaults } from '@pkgs/model';
    import type { Menu } from '@pkgs/model';
    import type { TreeNode } from '@xwink/utils';
    import { deepTree } from '@xwink/utils';

    const route = useRoute();
    const form = ref<Partial<Menu>>(menuDefaults());
    const rules = computed(() => {
        return {
            username: [{ required: true, message: '用户名不能为空' }],
            password: [{ required: !route.params.id, message: '密码不能为空' }],
            phone: [{ required: true, message: '手机号码不能为空' }],
            enabled: [{ required: true, message: '启用状态不能为空' }],
        };
    });

    const userStore = useUserStore();
    const menuTree = computed(() => userStore.menus);
    const ignoreIds = [+route.params.id] as number[];
    const ignoreSelfAndChildren = (node: TreeNode<Menu>) => {
        if (ignoreIds.includes(node.id) || ignoreIds.includes(node.pid!)) {
            ignoreIds.push(...node.children.map((item) => item.id));
            return true;
        }
    };

    watch(
        () => form.value.parentId,
        (pid) => {
            if (!pid) {
                form.value.parentId = void 0;
            }
            const arr = pid ? deepTree(menuTree.value, (node) => node.id === pid).pop()!.children : menuTree.value;
            const old = arr.find((item) => item.id === +route.params.id);
            if (old) {
                form.value.sort = old.sort;
            } else {
                form.value.sort = (arr.length ?? 0) * 10;
            }
        }
    );

    watch(
        () => route.query.pid as string,
        (pid) => {
            form.value.parentId = pid ? +pid : void 0;
        },
        { immediate: true }
    );

    const get = api.getMenu;
    const create = api.createMenu;
    const update = api.updateMenu;

    const router = useRouter();
    const handleSaved = () => {
        router.push({ name: 'SearchMenu' });
    };
</script>
