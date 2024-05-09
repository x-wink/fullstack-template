<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        v-model:page="page"
        allow-create
        allow-remove
        allow-update
        :data="list"
        :loading="loading"
        :total="total"
        @create="handleCreate"
        @remove="handleDelete"
        @search="handleSearch"
        @update="handleUpdate"
    >
        <template #default>
            <el-table-column label="开始时间" prop="start">
                <template #default="{ row }">
                    {{ handleFormat(row.start) }}
                </template>
            </el-table-column>
            <el-table-column label="结束时间" prop="end">
                <template #default="{ row }">
                    {{ handleFormat(row.end) }}
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="enabled">
                <template #default="{ row }">
                    <el-switch v-model="row.enabled" active-text="启用" @change="handleStatus(row)" />
                </template>
            </el-table-column>
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    import type { Time } from '@pkgs/model';
    import { ElMessage } from 'element-plus';
    import type { CommonListInstance } from '@/components';

    const condition = ref({} as Partial<Time>);
    const page = ref({
        pageIndex: 1,
        pageSize: 100,
    });

    const handleFormat = (time: Date) => new Date(`2023-01-01T${time as unknown as string}Z`).toLocaleTimeString();

    const refsList = ref<CommonListInstance>();
    const list = ref([] as Time[]);
    const total = ref(0);
    const loading = ref(false);
    const handleSearch = async () => {
        loading.value = true;
        const res = await api.findTimePage(page.value.pageIndex, page.value.pageSize, condition.value);
        if (res) {
            list.value = res.list;
            total.value = res.total;
            if (!res.total && page.value.pageIndex > 1) {
                page.value.pageIndex = 1;
            }
        }
        loading.value = false;
    };

    const router = useRouter();
    const handleCreate = () => {
        router.push({ name: 'CreateTime' });
    };
    const handleStatus = async (row: Time) => {
        const res = await api.statusTime({ id: row.id!, enabled: row.enabled });
        if (res) {
            ElMessage.success((row.enabled ? '启用' : '禁用') + '成功');
        } else {
            ElMessage.error((row.enabled ? '启用' : '禁用') + '失败');
        }
    };
    const handleUpdate = (row: Time) => {
        router.push({ name: 'UpdateTime', params: { id: row.id } });
    };
    const handleDelete = async (rows: Time[]) => {
        const res = await api.removeTime(rows.map((item) => item.id!));
        if (res) {
            ElMessage.success('删除成功');
            refsList.value!.search();
        } else {
            ElMessage.error('删除失败');
        }
    };
</script>
