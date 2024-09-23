<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        v-model:page="page"
        allow-create
        allow-export
        allow-remove
        allow-update
        :data="list"
        :loading="loading"
        :total="total"
        @create="handleCreate"
        @export="handleExport"
        @remove="handleDelete"
        @search="handleSearch"
        @update="handleUpdate"
    >
        <template #condition>
            <el-form-item prop="username">
                <el-input v-model="condition.username" clearable placeholder="用户名/学号" />
            </el-form-item>
            <el-form-item prop="realname">
                <el-input v-model="condition.realname" clearable placeholder="真实姓名" />
            </el-form-item>
            <el-form-item prop="leader">
                <el-input v-model="condition.leader" clearable placeholder="导师姓名" />
            </el-form-item>
            <el-form-item prop="phone">
                <el-input v-model="condition.phone" clearable placeholder="手机号码" />
            </el-form-item>
            <el-form-item prop="type">
                <el-select v-model="condition.type" clearable placeholder="用户类型">
                    <el-option v-for="(item, index) in userTypeOpts" :key="index" v-bind="item" />
                </el-select>
            </el-form-item>
            <el-form-item prop="enabled">
                <el-select v-model="condition.enabled" clearable placeholder="状态">
                    <el-option v-for="(item, index) in userEnabledOpts" :key="index" v-bind="item" />
                </el-select>
            </el-form-item>
        </template>
        <template #default>
            <el-table-column label="用户名" prop="username" />
            <el-table-column label="真实姓名" prop="realname" />
            <el-table-column label="手机号码" prop="phone" />
            <el-table-column label="导师姓名" prop="leader" />
            <el-table-column label="类型" prop="type">
                <template #default="{ row }">
                    {{ userTypeDict[row.type] }}
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
    import { UserType, type User, UserStatus, userTypeDict, userTypeOpts, userEnabledOpts } from '@pkgs/model';
    import type { CommonListInstance } from '@/components';
    import { ElMessage } from 'element-plus';

    const condition = ref({
        username: '',
        status: UserStatus.ACCEPT,
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

    const router = useRouter();
    const handleCreate = () => {
        router.push({ name: 'CreateUser' });
    };
    const handleStatus = async (row: User) => {
        const res = await api.statusUser({ id: row.id!, enabled: row.enabled });
        if (res) {
            ElMessage.success((row.enabled ? '启用' : '禁用') + '成功');
        } else {
            ElMessage.error((row.enabled ? '启用' : '禁用') + '失败');
        }
    };
    const handleUpdate = (row: User) => {
        router.push({ name: 'UpdateUser', params: { id: row.id } });
    };
    const handleDelete = async (rows: User[]) => {
        const res = await api.removeUser(rows.map((item) => item.id!));
        if (res) {
            ElMessage.success('删除成功');
            refsList.value!.search();
        } else {
            ElMessage.error('删除失败');
        }
    };

    import * as XLSX from 'xlsx';
    const handleExport = async () => {
        const res = await api.findUserPage(1, 0, { type: UserType.STUDENT, status: UserStatus.ACCEPT });
        if (res) {
            const data = res.list.map((item) => ({
                ID: item.id,
                学号: item.username,
                姓名: item.realname,
                手机号码: item.phone,
                学院: item.location,
                导师名称: item.leader,
            }));
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.sheet_add_aoa(ws, [Object.keys(data[0])], { origin: 'A1' });
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, '学生信息.xlsx');
        }
    };
</script>
