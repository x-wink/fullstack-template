<template>
    <div class="seat-container x-flex col">
        <CommonDate v-model="date" />
        <div class="main fill x-flex">
            <XSeat v-model="seatNo" :config="seatConfig" :leaved="sum.leaved" :selected="sum.selected" />
        </div>
        <div class="footer x-flex col-center row-between">
            <p>已选座位：{{ seatNo[0] }}</p>
            <van-button type="primary" @click="handleConfirm">确认选座</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { generateSeatConfig, type SeatConfig } from '@pkgs/components';
    import { bookingDefaults } from '@pkgs/model';
    import type { RSumRoomBooking, Room, Time } from '@pkgs/model';
    import dayjs from 'dayjs';
    import { showToast } from 'vant';
    const layoutStore = useLayoutStore();
    layoutStore.title = '选座位';

    const route = useRoute();
    const roomId = computed(() => +(route.params.id as string));
    const room = ref<Room>();
    const time = ref<Time>();

    const sum = ref<RSumRoomBooking>({ leaved: [], selected: [] });
    const seatConfig = computed<SeatConfig>(() =>
        generateSeatConfig(room.value?.seat ?? { flipHorizontal: false, flipVertical: false, row: 5, col: 5 })
    );

    const seatNo = ref([]);
    const date = ref(dayjs(new Date()).format('YYYY-MM-DD'));

    const loadData = async () => {
        seatNo.value = [];
        const res = await api.sumRoomBooking(roomId.value, date.value);
        sum.value = res ?? { leaved: [], selected: [] };
    };
    watch(date, loadData);
    onActivated(async () => {
        room.value = await api.getRoom(roomId.value);
        time.value = await api.getTime(1);
        loadData();
    });

    const router = useRouter();
    const userStore = useUserStore();
    const handleConfirm = async () => {
        if (!seatNo.value.length) {
            showToast('请选择座位');
        } else {
            const id = await api.createBooking({
                ...bookingDefaults(),
                userId: userStore.profile!.id,
                roomId: roomId.value,
                seatNo: seatNo.value[0],
                date: new Date(date.value),
                start: time.value?.start,
                end: time.value?.end,
            });
            if (id) {
                router.push({ name: 'Confirm', params: { id } });
            }
        }
    };
</script>

<style scoped lang="less">
    .seat-container {
        .main {
            flex: 1;
            overflow: hidden;
            .seat-container {
                margin: auto;
            }
        }
        .footer {
            padding: var(--gap-mini) var(--gap);
        }
    }
</style>
