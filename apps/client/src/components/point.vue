<template>
    <div
        class="point"
        :class="{
            active,
            nowrap: props.point.nowrap,
        }"
        :style="{ left: props.point.location[0], top: props.point.location[1] }"
        @click="handlePickPoint(props.point.name)"
    >
        <div class="name" :style="{ bottom: props.point.offset[2] }">{{ props.point.name }}</div>
        <img alt="main" class="main" :src="loadAssets(props.point.name + '.gif')" />
        <img
            alt="bg"
            class="bg"
            :src="loadAssets(active ? 'point2.png' : 'point.png')"
            :style="{ left: props.point.offset[0], top: props.point.offset[1] }"
        />
    </div>
</template>

<script setup lang="ts">
    import { eventBus, loadAssets } from '@/utils';
    import { ref } from 'vue';
    const props = defineProps<{
        point: {
            name: string;
            location: string[];
            offset: string[];
            nowrap?: boolean;
        };
    }>();
    const active = ref(false);
    eventBus.on('activePoint', (name) => {
        if (name !== props.point.name) {
            active.value = false;
        }
    });
    const emits = defineEmits<{ (e: 'active', name: string): void }>();
    const handlePickPoint = (name: string) => {
        active.value = true;
        emits('active', name);
        eventBus.emit('activePoint', name);
    };
</script>

<style scoped lang="less">
    .point {
        position: absolute;
        width: 33%;

        &.active {
            .name {
                background: var(--error);
                box-shadow: 0 0 10px gold, 0 0 10px gold, 0 0 10px gold;
            }
        }
        &.nowrap {
            .name {
                white-space: nowrap;
                max-width: unset;
            }
        }

        .name {
            position: absolute;
            background: var(--primary);
            border-radius: 100px;
            left: 0;
            right: 0;
            width: max-content;
            max-width: 100%;
            padding: 5px 8px;
            margin: 0 auto;
            text-align: center;
            z-index: 20;
            font-size: 15px;
        }

        img {
            width: 100%;
        }
        .main {
            position: relative;
            z-index: 10;
        }
        .bg {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 9;
        }
    }
</style>
