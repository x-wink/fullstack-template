<template>
    <CommonForm
        v-model="form"
        :create="create"
        :get="get"
        :rules="rules"
        :update="update"
        @loaded="handleLoaded"
        @saved="handleSaved"
    >
        <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" clearable />
        </el-form-item>
        <el-form-item label="角色代码" prop="code">
            <el-input v-model="form.code" clearable />
        </el-form-item>
        <el-form-item label="角色权限" prop="permissions">
            <ElTreeSelect
                ref="refsTree"
                v-model="permissions"
                accordion
                clearable
                collapse-tags
                collapse-tags-tooltip
                :data="menuTree"
                default-expand-all
                multiple
                node-key="id"
                :props="{
                    label: 'title',
                }"
                show-checkbox
                @check="handleCheck"
            />
        </el-form-item>
        <el-form-item label="启用状态" prop="enabled">
            <el-switch v-model="form.enabled" active-text="启用" />
        </el-form-item>
    </CommonForm>
</template>

<script setup lang="ts">
    import { roleDefaults } from '@pkgs/model';
    import type { Menu, Role } from '@pkgs/model';
    import type { TreeNode } from '@xwink/utils';
    import { ElTreeSelect } from 'element-plus';

    const form = ref<Partial<Role>>(roleDefaults());
    const rules = computed(() => {
        return {
            name: [{ required: true, message: '角色名称不能为空' }],
            code: [{ required: true, message: '角色代码不能为空' }],
            permissions: [{ required: true, message: '角色权限不能为空' }],
            enabled: [{ required: true, message: '启用状态不能为空' }],
        };
    });

    const userStore = useUserStore();
    const menuTree = computed(() => [{ title: '全部', children: userStore.menus, id: -1 }]);
    const permissions = ref([] as number[]);
    const refsTree = ref<InstanceType<typeof ElTreeSelect>>();
    const handleCheck = (_: TreeNode<Menu>, data: { checkedKeys: number[]; halfCheckedKeys: number[] }) => {
        form.value.permissions = [...data.checkedKeys, ...data.halfCheckedKeys].filter((item) => item !== -1);
    };

    const get = api.getRole;
    const create = api.createRole;
    const update = api.updateRole;

    const handleLoaded = () => {
        permissions.value = form.value.permissions!;
    };
    const router = useRouter();
    const handleSaved = () => {
        router.push({ name: 'SearchRole' });
    };
</script>
