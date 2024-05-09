<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        v-model:page="page"
        allow-create
        allow-remove
        allow-update
        :data="list"
        has-create-time
        :loading="loading"
        :total="total"
        @create="handleCreate"
        @remove="handleDelete"
        @search="handleSearch"
        @update="handleUpdate"
    >
        <template #condition>
            <el-form-item prop="location">
                <el-input v-model="condition.location" clearable placeholder="地点" />
            </el-form-item>
        </template>
        <template #default>
            <el-table-column label="保洁阿姨" prop="user.username" />
            <el-table-column label="时间" prop="time" />
            <el-table-column label="地点" prop="location" />
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    import type { CleanTask } from '@pkgs/model';
    import { ElMessage } from 'element-plus';
    import type { CommonListInstance } from '@/components';

    const condition = ref({} as Partial<CleanTask>);
    const page = ref({
        pageIndex: 1,
        pageSize: 100,
    });

    const refsList = ref<CommonListInstance>();
    const list = ref([] as CleanTask[]);
    const total = ref(0);
    const loading = ref(false);
    const handleSearch = async () => {
        loading.value = true;
        const res = await api.findCleanTaskPage(page.value.pageIndex, page.value.pageSize, condition.value);
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
        router.push({ name: 'CreateCleaning' });
    };
    const handleUpdate = (row: CleanTask) => {
        router.push({ name: 'UpdateCleaning', params: { id: row.id } });
    };
    const handleDelete = async (rows: CleanTask[]) => {
        const res = await api.removeCleanTask(rows.map((item) => item.id!));
        if (res) {
            ElMessage.success('删除成功');
            refsList.value!.search();
        } else {
            ElMessage.error('删除失败');
        }
    };
</script>
