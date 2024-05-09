<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        v-model:page="page"
        action-width="200px"
        allow-export
        :data="list"
        :loading="loading"
        :total="total"
        @export="handleExport"
        @search="handleSearch"
    >
        <template #condition>
            <el-form-item prop="user.username">
                <el-input v-model="condition.user.username" clearable placeholder="学号" />
            </el-form-item>
            <el-form-item prop="user.realname">
                <el-input v-model="condition.user.realname" clearable placeholder="真实姓名" />
            </el-form-item>
            <el-form-item prop="user.phone">
                <el-input v-model="condition.user.phone" clearable placeholder="手机号码" />
            </el-form-item>
            <el-form-item prop="user.leader">
                <el-input v-model="condition.user.leader" clearable placeholder="导师姓名" />
            </el-form-item>
            <el-form-item prop="roomId">
                <el-select v-model="condition.roomId" clearable placeholder="场地">
                    <el-option v-for="(item, index) in roomOpts" :key="index" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item prop="seatNo">
                <el-input v-model="condition.seatNo" clearable placeholder="座位号" />
            </el-form-item>
            <el-form-item prop="status">
                <el-select v-model="condition.status" clearable placeholder="审批状态">
                    <el-option
                        v-for="(item, index) in bookingStatusOpts"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
        </template>
        <template #default>
            <el-table-column label="学号" prop="user.username" />
            <el-table-column label="真实姓名" prop="user.realname" />
            <el-table-column label="手机号码" prop="user.phone" />
            <el-table-column label="导师姓名" prop="user.leader" />
            <el-table-column label="场地" prop="room.name" />
            <el-table-column label="座位号" prop="seatNo" />
            <el-table-column label="预约日期" prop="date" sortable width="120px">
                <template #default="{ row }">
                    {{ new Date(row.date).toLocaleDateString() }}
                </template>
            </el-table-column>
            <!-- <el-table-column label="预约时间" prop="time" width="160px">
                <template #default="{ row }">{{ formatTime(row.start) }}~{{ formatTime(row.end) }}</template>
            </el-table-column> -->
            <el-table-column label="预约状态" prop="status" width="80px">
                <template #default="{ row }">
                    {{ bookingStatusDict[row.status] }}
                </template>
            </el-table-column>
            <el-table-column label="免审特权" prop="isVip">
                <template #default="{ row }">
                    <el-switch v-model="row.user.isVip" @change="handleVip(row.userId, row.user.isVip)" />
                </template>
            </el-table-column>
        </template>
        <template #action="{ row }">
            <template v-if="row.status === BookingStatus.APPROVAL">
                <el-button :icon="SuccessFilled" text type="success" @click="handleApproval(row, BookingStatus.ACCEPT)">
                    通过
                </el-button>
                <el-button :icon="Failed" text type="danger" @click="handleApproval(row, BookingStatus.REJECT)">
                    拒绝
                </el-button>
            </template>
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    // import { formatTime } from '@/utils';
    import type { Booking, Room, Student } from '@pkgs/model';
    import { bookingStatusDict, bookingStatusOpts, BookingStatus, ID } from '@pkgs/model';
    import type { CommonListInstance } from '@/components';
    import { ElMessage } from 'element-plus';
    import { SuccessFilled, Failed } from '@element-plus/icons-vue';

    const condition = ref({
        status: void 0,
        user: {} as Student,
        roomId: void 0,
        seatNo: void 0,
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

    const handleApproval = async (item: Booking, status: BookingStatus) => {
        const res = await api.statusBooking({ id: item[ID]!, status });
        const text = status === BookingStatus.ACCEPT ? '审批通过' : '拒绝预约';
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
        const res = await api.findBookingPage(1, 0, condition.value);
        if (res) {
            const data = res.list.map((item) => ({
                学号: item.user?.username,
                真实姓名: item.user?.realname,
                手机号码: item.user?.phone,
                导师名称: item.user?.leader,
                场地: item.room?.name,
                座位号: item.seatNo,
                预约日期: new Date(item.date).toLocaleDateString(),
                预约状态: bookingStatusDict[item.status],
            }));
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.sheet_add_aoa(ws, [Object.keys(data[0])], { origin: 'A1' });
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, '预约审核记录.xlsx');
        }
    };
</script>
