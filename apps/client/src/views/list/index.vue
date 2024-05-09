<template>
    <div class="list-container x-flex col">
        <CommonDate v-model="date" />
        <div class="list fill x-flex col">
            <CommonCard v-for="(item, index) in list" :key="index">
                <div class="content x-flex col">
                    <div class="row x-flex row-between col-center">
                        <p class="label">预约座位：</p>
                        <p class="value">{{ item.seatNo }}</p>
                    </div>
                    <div class="row x-flex row-between col-center">
                        <p class="label">柜子编号：</p>
                        <p class="value">{{ item.seatNo }}</p>
                    </div>
                    <div class="row x-flex row-between col-center">
                        <p class="label">位置：</p>
                        <p class="value">{{ item.room?.name }}</p>
                    </div>
                    <div class="row x-flex row-between col-center">
                        <p class="label">状态：</p>
                        <p class="value x-flex col-center wrap">
                            <span>{{ bookingStatusDict[item.status] }}</span>
                            <van-button v-if="canConfirm(item)" round type="primary" @click="handleConfirm(item)">
                                确认
                            </van-button>
                            <van-button
                                v-if="canSign(item)"
                                round
                                type="primary"
                                @click="handleSign(item, SignType.SIGN_IN)"
                            >
                                签到
                            </van-button>
                            <van-button
                                v-if="canLeave(item)"
                                round
                                type="primary"
                                @click="handleSign(item, SignType.SIGN_PAUSE)"
                            >
                                暂离
                            </van-button>
                            <van-button
                                v-if="canDone(item)"
                                round
                                type="primary"
                                @click="handleSign(item, SignType.SIGN_OUT)"
                            >
                                签退
                            </van-button>
                            <van-button v-if="canCancel(item)" round type="primary" @click="handleCancel(item)">
                                取消预约
                            </van-button>
                        </p>
                    </div>
                </div>
            </CommonCard>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { showToast } from 'vant';
    import dayjs from 'dayjs';
    import type { Booking } from '@pkgs/model';
    import { BookingStatus, ID, SignType, bookingStatusDict } from '@pkgs/model';
    const layoutStore = useLayoutStore();
    layoutStore.title = '座位预约';

    const date = ref(dayjs(new Date()).format('YYYY-MM-DD'));

    const list = ref<Booking[]>([]);
    const userStore = useUserStore();
    const loadData = async () => {
        const page = await api.findBookingPage(1, 0, {
            date: date.value,
            userId: userStore.profile?.id,
        });
        list.value = page?.list ?? [];
    };
    onActivated(loadData);
    watch(date, loadData);

    const canConfirm = (item: Booking) => {
        return [BookingStatus.CONFIRM].includes(item.status);
    };
    const canSign = (item: Booking) => {
        return [BookingStatus.ACCEPT, BookingStatus.LEAVED].includes(item.status);
    };
    const canLeave = (item: Booking) => {
        return [BookingStatus.FULFILL].includes(item.status);
    };
    const canDone = (item: Booking) => {
        return [BookingStatus.FULFILL].includes(item.status);
    };
    const canCancel = (item: Booking) => {
        return [BookingStatus.ACCEPT].includes(item.status);
    };

    const router = useRouter();
    const handleConfirm = (item: Booking) => {
        router.push({ name: 'Confirm', params: { id: item[ID] } });
    };
    const handleSign = (item: Booking, type: SignType) => {
        router.push({ name: 'Scan', params: { id: item[ID], type } });
    };

    const handleCancel = async (item: Booking) => {
        const res = await api.statusBooking({ id: item[ID]!, status: BookingStatus.CANCEL });
        if (res) {
            item.status = BookingStatus.CANCEL;
            showToast('取消预约成功');
        } else {
            showToast('取消预约失败');
        }
    };
</script>

<style scoped lang="less">
    .list-container {
        .list {
            padding: var(--gap);
            gap: var(--gap);
            overflow: auto;
            .common-card {
                .content {
                    gap: 5px;
                    .row {
                        .label {
                            color: #acacac;
                        }
                        .value {
                            gap: var(--gap-mini);
                            .van-button {
                                height: 20px;
                                padding: 0 var(--gap);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
