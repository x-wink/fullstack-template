<template>
    <div
        class="x-photo-wall"
        :class="{
            active: props.active,
        }"
        :style="{
            height: props.height + 'px',
            margin: `${Math.abs(props.skew) * 5}px auto`,
            [`--skew`]: `${props.skew}deg`,
            [`--duration`]: `${duration}s`,
        }"
    >
        <div
            v-for="(item, index) in props.data"
            :key="index"
            class="photo x-flex row-center col-end"
            :style="{
                transform: `rotateY(${(index * 360) / props.data.length}deg) translateZ(${props.height}px)`,
            }"
        >
            <img :alt="`Photo ${index + 1}`" :src="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    defineOptions({
        name: 'XPhotoWall',
    });
    const props = withDefaults(
        defineProps<{
            data: string[];
            active?: boolean;
            height?: number;
            skew?: number;
            speed?: number;
        }>(),
        {
            active: true,
            height: 200,
            skew: 0,
            speed: 15,
        }
    );
    const duration = computed(() => 30 - Math.min(30, Math.max(0, props.speed)) || 0.1);
</script>

<style scoped lang="less">
    @keyframes rotateCircle {
        0% {
            transform: rotateX(var(--skew)) rotateY(0deg);
            /* 初始状态为不旋转 */
        }

        100% {
            transform: rotateX(var(--skew)) rotateY(360deg);
            /* 旋转一圈 */
        }
    }

    .x-photo-wall {
        width: 100%;
        position: relative;
        transform-style: preserve-3d;
        &.active {
            animation: rotateCircle var(--duration) infinite linear;
        }

        .photo {
            height: 100%;
            width: 30%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            transform-origin: center center;
            img {
                object-fit: contain;
                max-width: 100%;
                max-height: 100%;
                margin: auto;
            }
        }
    }
</style>
