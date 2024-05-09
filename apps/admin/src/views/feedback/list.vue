<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        v-model:page="page"
        :data="list"
        has-create-time
        :loading="loading"
        :total="total"
        @search="handleSearch"
    >
        <template #default>
            <el-table-column label="用户" prop="user.username" width="100px" />
            <el-table-column label="标题" prop="title" width="300px" />
            <el-table-column label="标题" prop="content" />
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    import type { Feedback } from '@pkgs/model';

    const condition = ref({} as Partial<Feedback>);
    const page = ref({
        pageIndex: 1,
        pageSize: 100,
    });

    const list = ref([] as Feedback[]);
    const total = ref(0);
    const loading = ref(false);
    const handleSearch = async () => {
        loading.value = true;
        const res = await api.findFeedbackPage(page.value.pageIndex, page.value.pageSize, condition.value);
        if (res) {
            list.value = res.list;
            total.value = res.total;
            if (!res.total && page.value.pageIndex > 1) {
                page.value.pageIndex = 1;
            }
        }
        loading.value = false;
    };
</script>
