<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        v-model:page="page"
        action-width="200px"
        allow-export
        :data="list"
        has-create-time
        :loading="loading"
        :total="total"
        @export="handleExport"
        @search="handleSearch"
    >
        <template #condition>
            <el-form-item prop="username">
                <el-input v-model="condition.username" clearable placeholder="学号" />
            </el-form-item>
            <el-form-item prop="realname">
                <el-input v-model="condition.realname" clearable placeholder="真实姓名" />
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="condition.phone" clearable placeholder="手机号码" />
            </el-form-item>
            <el-form-item prop="location">
                <el-select v-model="condition.location" clearable placeholder="区域">
                    <el-option v-for="(item, index) in userLocationOpts" :key="index" v-bind="item" />
                </el-select>
            </el-form-item>
            <el-form-item prop="status">
                <el-select v-model="condition.status" clearable placeholder="审批状态">
                    <el-option
                        v-for="(item, index) in userStatusOpts"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
        </template>
        <template #default>
            <el-table-column label="学号" prop="username" width="120px" />
            <el-table-column label="真实姓名" prop="realname" />
            <el-table-column label="手机号码" prop="phone" />
            <el-table-column label="导师名称" prop="leader" />
            <el-table-column label="区域" prop="location" />
            <el-table-column label="审核状态" prop="status">
                <template #default="{ row }">
                    {{ userStatusDict[row.status] }}
                </template>
            </el-table-column>
            <el-table-column label="免审特权" prop="isVip">
                <template #default="{ row }">
                    <el-switch v-model="row.isVip" @change="handleVip(row.id, row.isVip)" />
                </template>
            </el-table-column>
        </template>
        <template #action="{ row }">
            <template v-if="row.status === UserStatus.APPROVAL">
                <el-button :icon="SuccessFilled" text type="success" @click="handleApproval(row, UserStatus.ACCEPT)">
                    通过
                </el-button>
                <el-button :icon="Failed" text type="danger" @click="handleApproval(row, UserStatus.REJECT)">
                    拒绝
                </el-button>
            </template>
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    import type { User } from '@pkgs/model';
    import { UserStatus, UserType, userStatusDict, userStatusOpts, userLocationOpts } from '@pkgs/model';
    import type { CommonListInstance } from '@/components';
    import { ElMessage } from 'element-plus';
    import { SuccessFilled, Failed } from '@element-plus/icons-vue';

    const condition = ref({
        username: '',
        type: UserType.STUDENT,
        status: UserStatus.APPROVAL,
    } as Partial<User>);
    const page = ref({
        pageIndex: 1,
        pageSize: 100,
    });

    const refsList = ref<CommonListInstance>();
    const list = ref([] as User[]);
    const total = ref(0);
    const loading = ref(false);
    const handleSearch = async () => {
        loading.value = true;
        const res = await api.findUserPage(page.value.pageIndex, page.value.pageSize, condition.value);
        if (res) {
            list.value = res.list;
            total.value = res.total;
            if (!res.total && page.value.pageIndex > 1) {
                page.value.pageIndex = 1;
            }
        }
        loading.value = false;
    };

    const handleApproval = async (item: User, status: UserStatus) => {
        const res = await api.approvalUser({ id: item.id!, status });
        const text = status === UserStatus.ACCEPT ? '审批通过' : '拒绝注册';
        if (res) {
            item.status = status;
            ElMessage.success(text + '成功');
        } else {
            ElMessage.error(text + '失败');
        }
    };
    const handleVip = async (id: number, isVip: boolean) => {
        const res = await api.updateUser({ id, isVip });
        const text = isVip ? '免审' : '取消免审';
        if (res) {
            handleSearch();
            ElMessage.success(text + '成功');
        } else {
            ElMessage.error(text + '失败');
        }
    };

    import * as XLSX from 'xlsx';
    const handleExport = async () => {
        const res = await api.findUserPage(1, 0, condition.value);
        if (res) {
            const data = res.list.map((item) => ({
                学号: item.username,
                真实姓名: item.realname,
                手机号码: item.phone,
                导师名称: item.leader,
                区域: item.location,
                审核状态: userStatusDict[item.status!],
            }));
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.sheet_add_aoa(ws, [Object.keys(data[0])], { origin: 'A1' });
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, '注册审核信息.xlsx');
        }
    };
</script>
