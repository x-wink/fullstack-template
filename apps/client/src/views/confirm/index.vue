<template>
    <div class="confirm-container x-flex col">
        <CommonCard>
            <template #header-left>
                <div class="x-flex col-end">
                    <p class="status">待确认</p>
                    <p class="tips">{{ rest }}分钟后自动关闭</p>
                </div>
            </template>
            <div class="content x-flex col">
                <div class="row x-flex row-between col-center">
                    <p class="label">学号：</p>
                    <p class="value">{{ userStore.profile?.username }}</p>
                </div>
                <div class="row x-flex row-between col-center">
                    <p class="label">预约日期：</p>
                    <p class="value">{{ dayjs(booking?.date).format('MM月DD日') }}</p>
                </div>
                <div class="row x-flex row-between col-center">
                    <p class="label">预约座位：</p>
                    <p class="value">{{ booking?.seatNo }}</p>
                </div>
                <div class="row x-flex row-between col-center">
                    <p class="label">柜子编号：</p>
                    <p class="value">{{ booking?.seatNo }}</p>
                </div>
                <div class="row x-flex row-between col-center">
                    <p class="label">位置：</p>
                    <p class="value">{{ booking?.room?.name }}</p>
                </div>
            </div>
        </CommonCard>
        <CommonRule :loading="loading" @confirm="handleConfirm">已了解，确认预约</CommonRule>
    </div>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs';
    import { showToast } from 'vant';
    import { CREATE_TIME, type Booking, BookingStatus } from '@pkgs/model';
    const layoutStore = useLayoutStore();
    layoutStore.title = '预约';

    const userStore = useUserStore();

    const route = useRoute();
    const router = useRouter();
    const bookingId = computed(() => +(route.params.id as string));
    const booking = ref<Booking>();
    onActivated(async () => {
        if (bookingId.value) {
            booking.value = await api.getBooking(bookingId.value);
            if (booking.value?.status !== BookingStatus.CONFIRM || rest.value <= 0) {
                router.replace({ name: 'List' });
            }
        }
    });

    const rest = computed(
        () =>
            15 -
            (Math.ceil(
                (Date.now() - (Date.parse(booking.value?.[CREATE_TIME] as unknown as string) || Date.now())) / 60000
            ) || 0)
    );

    const loading = ref(false);
    const handleConfirm = async () => {
        loading.value = true;
        const res = await api.statusBooking({
            id: bookingId.value,
            status: BookingStatus.APPROVAL,
        });
        if (res) {
            const data = await api.getBooking(bookingId.value);
            if (data?.status === BookingStatus.ACCEPT) {
                showToast('免审批预约成功');
                router.replace({ name: 'List' });
            } else {
                router.replace({ name: 'Status', params: { status: 'booking' } });
            }
        } else {
            showToast('确认预约失败');
        }
        loading.value = false;
    };
</script>

<style scoped lang="less">
    .confirm-container {
        overflow: auto !important;
        padding: var(--gap);
        gap: var(--gap);
        .common-card {
            .status {
                font-size: 25px;
                color: var(--red);
            }
            .tips {
                color: #999;
                margin-left: var(--gap-mini);
            }
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
</style>
