<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        allow-create
        allow-remove
        allow-update
        :data="list"
        :loading="loading"
        :total="0"
        @create="handleCreate"
        @remove="handleDelete"
        @search="handleSearch"
        @update="handleUpdate"
    >
        <template #condition>
            <el-form-item prop="name">
                <el-input v-model="condition.name" clearable placeholder="角色名" />
            </el-form-item>
        </template>
        <template #default>
            <el-table-column label="角色名称" prop="name" />
            <el-table-column label="角色代码" prop="code" />
            <el-table-column label="状态" prop="enabled">
                <template #default="{ row }">
                    <el-switch v-model="row.enabled" active-text="启用" @change="handleStatus(row)" />
                </template>
            </el-table-column>
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    import type { Role } from '@pkgs/model';
    import type { CommonListInstance } from '@/components';
    import { ElMessage } from 'element-plus';

    const condition = ref({
        name: '',
    } as Partial<Role>);

    const refsList = ref<CommonListInstance>();
    const list = ref([] as Role[]);
    const loading = ref(false);
    const handleSearch = async () => {
        loading.value = true;
        const res = await api.searchRole(condition.value);
        if (res) {
            list.value = res;
        }
        loading.value = false;
    };

    const router = useRouter();
    const handleCreate = () => {
        router.push({ name: 'CreateRole' });
    };
    const handleStatus = async (row: Role) => {
        const res = await api.statusRole({ id: row.id!, enabled: row.enabled });
        if (res) {
            ElMessage.success((row.enabled ? '启用' : '禁用') + '成功');
        } else {
            ElMessage.error((row.enabled ? '启用' : '禁用') + '失败');
        }
    };
    const handleUpdate = (row: Role) => {
        router.push({ name: 'UpdateRole', params: { id: row.id } });
    };
    const handleDelete = async (rows: Role[]) => {
        const res = await api.removeRole(rows.map((item) => item.id!));
        if (res) {
            ElMessage.success('删除成功');
            refsList.value!.search();
        } else {
            ElMessage.error('删除失败');
        }
    };
</script>
