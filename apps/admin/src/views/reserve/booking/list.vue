<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        v-model:page="page"
        allow-export
        :data="list"
        :loading="loading"
        :total="total"
        @export="handleExport"
        @remove="handleDelete"
        @search="handleSearch"
    >
        <template #condition>
            <el-form-item v-if="condition.user" prop="user.username">
                <el-input v-model="condition.user.username" clearable placeholder="学号" />
            </el-form-item>
            <el-form-item v-if="condition.user" prop="user.realname">
                <el-input v-model="condition.user.realname" clearable placeholder="姓名" />
            </el-form-item>
            <el-form-item prop="roomId">
                <el-select v-model="condition.roomId" clearable placeholder="场地">
                    <el-option v-for="(item, index) in roomOpts" :key="index" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item prop="date">
                <el-date-picker
                    v-model="condition.range"
                    clearable
                    placeholder="预约日期"
                    type="daterange"
                    @change="handleRangeChange"
                />
            </el-form-item>
            <el-form-item prop="status">
                <el-select v-model="condition.status" clearable placeholder="预约状态">
                    <el-option v-for="(item, index) in bookingStatusOpts" :key="index" v-bind="item" />
                </el-select>
            </el-form-item>
        </template>
        <template #default>
            <el-table-column label="学号" prop="user.username" />
            <el-table-column label="姓名" prop="user.realname" />
            <el-table-column label="手机号码" prop="user.phone" />
            <el-table-column label="场地" prop="roomId">
                <template #default="{ row }">
                    {{ roomOpts.find((item) => item.id === row.roomId)?.name }}
                </template>
            </el-table-column>
            <el-table-column label="座位" prop="seatNo" />
            <el-table-column label="预约日期" prop="date" sortable>
                <template #default="{ row }">
                    {{ new Date(row.date).toLocaleDateString() }}
                </template>
            </el-table-column>
            <el-table-column label="预约状态" prop="enabled">
                <template #default="{ row }">
                    <el-select v-model="row.status" @change="handleStatus(row)">
                        <el-option v-for="(item, index) in bookingStatusOpts" :key="index" v-bind="item" />
                    </el-select>
                </template>
            </el-table-column>
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    import { BookingStatus, ID, bookingStatusDict, bookingStatusOpts } from '@pkgs/model';
    import type { Booking, Room, Student } from '@pkgs/model';
    import { ElMessage, dayjs } from 'element-plus';
    import type { CommonListInstance } from '@/components';
    import { formatDate } from '@/utils';

    const condition = ref<Partial<Booking> & { range?: [Date, Date] }>({
        user: {} as Student,
        range: [formatDate(dayjs(new Date()).add(-1, 'month').toDate()), formatDate(void 0, true)],
    });
    const page = ref({
        pageIndex: 1,
        pageSize: 100,
    });

    const roomOpts = ref<Room[]>([]);
    const handleLoadData = async () => {
        const res = await api.findRoomPage(1, 0);
        if (res) {
            roomOpts.value = res.list;
        }
    };
    handleLoadData();

    const handleRangeChange = ([start, end]: [Date, Date]) => {
        condition.value.range = [formatDate(start), formatDate(end, true)];
    };

    const refsList = ref<CommonListInstance>();
    const list = ref([] as Booking[]);
    const total = ref(0);
    const loading = ref(false);
    const handleSearch = async () => {
        loading.value = true;
        const res = await api.findBookingPage(page.value.pageIndex, page.value.pageSize, condition.value);
        if (res) {
            list.value = res.list;
            total.value = res.total;
            if (!res.total && page.value.pageIndex > 1) {
                page.value.pageIndex = 1;
            }
        }
        loading.value = false;
    };

    const handleStatus = async (row: Booking) => {
        const res = await api.statusBooking({ id: row.id!, status: row.status });
        if (res) {
            ElMessage.success(`修改状态为【${bookingStatusDict[row.status]}】成功`);
        } else {
            ElMessage.error(`修改状态为【${bookingStatusDict[row.status]}失败`);
        }
    };
    const handleDelete = async (rows: Booking[]) => {
        const res = await api.removeBooking(rows.map((item) => item.id!));
        if (res) {
            ElMessage.success('删除成功');
            refsList.value!.search();
        } else {
            ElMessage.error('删除失败');
        }
    };

    import * as XLSX from 'xlsx';
    const handleExport = async () => {
        const list = await api.exportBooking(condition.value);
        if (list) {
            const data = list.map((item) => ({
                ID: item.id,
                学号: item.user!.username,
                姓名: item.user!.realname,
                手机号码: item.user!.phone,
                场地: roomOpts.value.find((room) => room[ID] === item.roomId)?.name,
                座位号: item.seatNo,
                预约日期: dayjs(item.date).format('YYYY-MM-DD'),
                预约状态:
                    item.status === BookingStatus.CANCEL
                        ? '已取消'
                        : item.status === BookingStatus.APPROVAL
                          ? '审核中'
                          : item.status === BookingStatus.REJECT
                            ? '审核被拒'
                            : dayjs(item.date).diff(dayjs(Date.now()).format('YYYY-MM-DD'), 'day') > 0
                              ? '已预约'
                              : item.sign?.end
                                ? '已完成'
                                : item.sign?.start
                                  ? dayjs(item.date).diff(dayjs(Date.now()).format('YYYY-MM-DD'), 'day') === 0
                                      ? '进行中'
                                      : '违约（未签退）'
                                  : '违约（未签到）',
                签到时间: item.sign?.start ? dayjs(item.sign?.start).format('YYYY-MM-DD HH:mm:ss') : '',
                签退时间: item.sign?.end ? dayjs(item.sign?.end).format('YYYY-MM-DD HH:mm:ss') : '',
                使用时长:
                    item.sign?.start && item.sign?.end
                        ? Number(dayjs(item.sign?.end).diff(item.sign?.start, 'minutes') / 60).toFixed(2) + '小时'
                        : '',
                暂离次数: item.sign?.leave,
            }));
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.sheet_add_aoa(ws, [Object.keys(data[0])], { origin: 'A1' });
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, '预约记录.xlsx');
        }
    };
</script>
