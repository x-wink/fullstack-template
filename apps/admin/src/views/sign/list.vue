<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        v-model:page="page"
        allow-export
        :data="list"
        has-create-time
        :loading="loading"
        :total="total"
        @export="handleExport"
        @search="handleSearch"
    >
        <template #condition>
            <el-form-item v-if="condition.user" label="学号" prop="user.username">
                <el-input v-model="condition.user.username" clearable />
            </el-form-item>
            <el-form-item label="操作类型" prop="type">
                <el-select v-model="condition.type" clearable placeholder="全部">
                    <el-option
                        v-for="(item, index) in signTypeOpts"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
        </template>
        <template #default>
            <el-table-column label="学号" prop="user.username" width="120px" />
            <el-table-column label="真实姓名" prop="user.realname" width="120px" />
            <el-table-column label="经度" prop="longitude" width="120px" />
            <el-table-column label="纬度" prop="latitude" width="120px" />
            <el-table-column label="打卡地点" prop="location" />
            <el-table-column label="操作类型" prop="type" width="80px">
                <template #default="{ row }">
                    <el-tag :type="getTypeColor(row)">{{ getTypeLabel(row) }}</el-tag>
                </template>
            </el-table-column>
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    import { signTypeDict, signTypeColor, signTypeOpts } from '@pkgs/model';
    import type { Sign, Sort } from '@pkgs/model';

    const condition = ref({
        type: void 0,
        user: {
            username: '',
        },
    } as Partial<Sign>);
    const page = ref({
        pageIndex: 1,
        pageSize: 100,
    });

    const list = ref([] as Sign[]);
    const total = ref(0);
    const loading = ref(false);
    const handleSearch = async (_: unknown, sort: Sort) => {
        loading.value = true;
        const res = await api.findSignPage(page.value.pageIndex, page.value.pageSize, { sort, ...condition.value });
        if (res) {
            list.value = res.list;
            total.value = res.total;
            if (!res.total && page.value.pageIndex > 1) {
                page.value.pageIndex = 1;
            }
        }
        loading.value = false;
    };

    const getTypeColor = (row: Sign) => {
        return signTypeColor[row.type];
    };
    const getTypeLabel = (row: Sign) => {
        return signTypeDict[row.type];
    };

    import * as XLSX from 'xlsx';
    const handleExport = async () => {
        const res = await api.findSignPage(1, 0, condition.value);
        if (res) {
            const data = res.list.map((item) => ({
                学号: item.user?.username,
                真实姓名: item.user?.realname,
                经度: item.longitude,
                纬度: item.latitude,
                打卡地点: item.location,
                操作类型: getTypeLabel(item),
            }));
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.sheet_add_aoa(ws, [Object.keys(data[0])], { origin: 'A1' });
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, '签到信息.xlsx');
        }
    };
</script>
