<template>
    <div class="room-container x-flex col col-center">
        <CommonPlace />
        <div class="x-flex col list">
            <van-button
                v-for="(item, index) in list"
                :key="index"
                block
                round
                type="primary"
                @click="handleRoute(item)"
            >
                {{ item.name }}
            </van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Room } from '@pkgs/model';
    import { showToast } from 'vant';
    const layoutStore = useLayoutStore();
    layoutStore.title = '选场地';

    const list = ref<Room[]>([]);

    onActivated(async () => {
        const res = await api.findRoomPage(1, 0, { enabled: 1 });
        if (res) {
            list.value = res.list;
        } else {
            showToast('加载场地失败');
        }
    });

    const router = useRouter();
    const handleRoute = (item: Room) => {
        router.push({ name: 'Seat', params: { id: item.id } });
    };
</script>

<style scoped lang="less">
    .room-container {
        .common-place {
            margin-top: 80px;
        }
        .list {
            width: 80%;
            margin: auto;
            gap: var(--gap);
            li {
                width: 100%;
                padding: 30px;
                font-size: 23px;
                color: #fcfafa;
            }
        }
    }
</style>
