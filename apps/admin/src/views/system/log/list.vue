<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        v-model:page="page"
        allow-remove
        :data="list"
        has-create-time
        :loading="loading"
        :total="total"
        @remove="handleDelete"
        @search="handleSearch"
    >
        <template #condition>
            <el-form-item prop="userId">
                <el-input v-model="condition.userId" clearable placeholder="用户ID" />
            </el-form-item>
            <el-form-item prop="module">
                <el-select v-model="condition.module" clearable placeholder="功能模块">
                    <el-option
                        v-for="(item, index) in moduleOpts"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item prop="action">
                <el-select v-model="condition.action" clearable placeholder="用户操作">
                    <el-option
                        v-for="(item, index) in actionOpts"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
        </template>
        <template #default>
            <el-table-column label="用户ID" prop="userId" />
            <el-table-column label="数据ID" prop="dataId" />
            <el-table-column label="功能模块" prop="module" />
            <el-table-column label="用户操作" prop="action" />
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    import type { Log } from '@pkgs/model';
    import type { CommonListInstance } from '@/components';
    import { LogModule } from '@pkgs/model';
    import { ElMessage } from 'element-plus';
    import { LogAction } from '@pkgs/model';

    const condition = ref({
        userId: void 0,
        module: void 0,
        action: void 0,
    } as Partial<Log>);
    const page = ref({
        pageIndex: 1,
        pageSize: 100,
    });

    const moduleOpts = [
        {
            label: '系统',
            value: LogModule.SYSTEM,
        },
    ];
    const actionOpts = [
        {
            label: '登录',
            value: LogAction.LOGIN,
        },
    ];

    const refsList = ref<CommonListInstance>();
    const list = ref([] as Log[]);
    const total = ref(0);
    const loading = ref(false);
    const handleSearch = async () => {
        loading.value = true;
        const res = await api.findLogPage(page.value.pageIndex, page.value.pageSize, condition.value);
        if (res) {
            list.value = res.list;
            total.value = res.total;
            if (!res.total && page.value.pageIndex > 1) {
                page.value.pageIndex = 1;
            }
        }
        loading.value = false;
    };

    const handleDelete = async (rows: Log[]) => {
        const res = await api.removeLog(rows.map((item) => item.id!));
        if (res) {
            ElMessage.success('删除成功');
            refsList.value!.search();
        } else {
            ElMessage.error('删除失败');
        }
    };
</script>
