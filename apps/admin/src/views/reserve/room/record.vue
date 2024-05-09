<template>
    <div v-if="room" class="home x-flex row-center col-center">
        <div class="left x-flex col col-center">
            <p>{{ room.name }}</p>
            <XSeat
                v-if="room.seat"
                v-model="picked"
                allow-overflow
                :config="seatConfig"
                :leaved="summarys?.[1]"
                :selected="summarys?.[0]"
            />
        </div>
        <CommonList
            ref="refsList"
            v-model:condition="condition"
            v-model:page="page"
            action-width="320px"
            :data="list"
            :loading="loading"
            :total="total"
            @search="handleSearch"
        >
            <template #condition>
                <el-form-item prop="date">
                    <el-date-picker
                        v-model="condition.range"
                        clearable
                        placeholder="预约日期"
                        type="daterange"
                        @change="handleRangeChange"
                    />
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
                        {{ bookingStatusDict[row.status] }}
                    </template>
                </el-table-column>
            </template>
        </CommonList>
    </div>
</template>

<script setup lang="ts">
    import type { Booking, Room } from '@pkgs/model';
    import { bookingStatusDict } from '@pkgs/model';
    import { generateSeatConfig } from '@pkgs/components';
    import { dayjs } from 'element-plus';
    import { formatDate } from '@/utils';

    const route = useRoute();
    const roomOpts = ref<Room[]>([]);
    const seatConfig = computed(() => generateSeatConfig(room.value?.seat));
    const room = ref<Room>();
    const summarys = ref<[number[], number[]]>([[], []]);
    const page = ref({
        pageIndex: 1,
        pageSize: 100,
    });
    const condition = ref({
        seatNo: 1,
        roomId: +route.params.id,
        range: [formatDate(dayjs(new Date()).add(-1, 'month').toDate()), formatDate(void 0, true)],
    });
    watchEffect(async () => {
        const id = +route.params.id;
        condition.value.seatNo = 1;
        condition.value.roomId = id;
        room.value = await api.getRoom(id);
        const sumary = await api.sumRoomBooking(id, dayjs(new Date()).format('YYYY-MM-DD'));
        if (sumary) {
            summarys.value = [sumary.selected, sumary.leaved];
        }
        const res = await api.findRoomPage(1, 0);
        if (res) {
            roomOpts.value = res.list;
        }
    });
    const handleRangeChange = ([start, end]: [Date, Date]) => {
        condition.value.range = [formatDate(start), formatDate(end, true)];
    };
    const picked = computed({
        get: () => [condition.value.seatNo],
        set: (val) => {
            condition.value.seatNo = val[0];
        },
    });
    const list = ref<Booking[]>([]);
    const loading = ref(false);
    const total = ref(0);
    const handleSearch = async () => {
        loading.value = true;
        const res = await api.findBookingPage(page.value.pageIndex, page.value.pageSize, condition.value);
        if (res) {
            list.value = res.list;
            total.value = res.total;
        }
        loading.value = false;
    };
    watch(picked, handleSearch, { immediate: true, deep: true });
</script>

<style scoped lang="less">
    .home {
        width: 100%;
        height: 100%;
        gap: var(--gap);
        overflow: hidden;
        .left {
            width: 360px;
            height: 100%;
            gap: var(--gap);
        }
    }
</style>
