<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        action-width="320px"
        allow-create
        allow-remove
        allow-update
        :data="list"
        default-expand-all
        :loading="loading"
        :total="0"
        @create="handleCreate"
        @remove="handleDelete"
        @search="handleSearch"
        @update="handleUpdate"
    >
        <template #condition>
            <el-form-item prop="label">
                <el-input v-model="condition.label" clearable placeholder="名称" />
            </el-form-item>
        </template>
        <template #default>
            <el-table-column label="名称" prop="data.label" />
            <el-table-column label="权限" prop="data.permission" />
            <el-table-column label="地址" prop="data.url" />
            <el-table-column label="类型">
                <template #default="{ row }">
                    <el-tag>{{ row.data.type ? '外链' : '路由' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="data.sort" />
            <el-table-column label="显示">
                <template #default="{ row }">
                    <el-switch v-model="row.data.visible" active-text="可见" @change="handleStatus(row)" />
                </template>
            </el-table-column>
        </template>
        <template #action="{ row }">
            <el-button :icon="Plus" text type="success" @click="handleCreate(row.id)">添加下级</el-button>
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    import type { Menu } from '@pkgs/model';
    import type { TreeNode } from '@xwink/utils';
    import type { CommonListInstance } from '@/components';
    import { ElMessage } from 'element-plus';
    import { Plus } from '@element-plus/icons-vue';

    const userStore = useUserStore();

    const condition = ref({
        label: '',
    } as Partial<Menu>);

    const refsList = ref<CommonListInstance>();
    const list = computed(() => userStore.menus);
    const loading = ref(false);
    const handleSearch = async () => {
        loading.value = true;
        await userStore.loadMenu(condition.value);
        loading.value = false;
    };

    const router = useRouter();
    const handleCreate = (pid?: number) => {
        router.push({ name: 'CreateMenu', query: { pid } });
    };
    const handleStatus = async (row: TreeNode<Menu>) => {
        const res = await api.statusMenu({ id: row.id, visible: row.data.visible });
        if (res) {
            ElMessage.success((row.data.visible ? '显示' : '隐藏') + '成功');
        } else {
            ElMessage.error((row.data.visible ? '显示' : '隐藏') + '失败');
        }
    };
    const handleUpdate = (row: TreeNode<Menu>) => {
        router.push({ name: 'UpdateMenu', params: { id: row.id } });
    };
    const handleDelete = async (rows: TreeNode<Menu>[]) => {
        const res = await api.removeMenu(rows.map((item) => item.id));
        if (res) {
            ElMessage.success('删除成功');
            refsList.value!.search();
        } else {
            ElMessage.error('删除失败');
        }
    };
</script>
