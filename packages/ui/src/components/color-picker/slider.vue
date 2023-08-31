<template>
    <div ref="refsContainer" class="x-color-slider">
        <canvas ref="refsCanvas" :height="props.height" :width="props.width"></canvas>
        <div class="slide" :style="slideStyle"></div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import { createDragContainer, limitPrecision } from '../../utils';

    const props = withDefaults(
        defineProps<{
            render: (cvs: HTMLCanvasElement) => void;
            width?: number;
            height?: number;
            slide?: number;
            precision?: number;
        }>(),
        {
            width: 15,
            height: 100,
            slide: 5,
            precision: 2,
        }
    );
    const value = defineModel<number>({ required: true });
    value.value = limitPrecision(value.value, props.precision);

    const slideStyle = computed(() => {
        return {
            height: `${props.slide}px`,
            top: `${position.value[1]}px`,
        };
    });
    const position = computed(() => [0, value.value * (refsCanvas.value?.offsetHeight || props.height)]);
    const refsCanvas = ref<HTMLCanvasElement>();
    const refsContainer = ref<HTMLDivElement>();
    onMounted(() => {
        if (refsCanvas.value) {
            props.render(refsCanvas.value);
            new ResizeObserver(([cvs]) => {
                props.render(cvs.target as HTMLCanvasElement);
            }).observe(refsCanvas.value);
        }
        createDragContainer(refsContainer.value!, (x, y) => {
            value.value = limitPrecision(y / refsContainer.value!.clientHeight, props.precision);
        });
    });
</script>
<style lang="less">
    .x-color-slider {
        position: relative;
        width: max-content;
        canvas {
            width: 100%;
            height: 100%;
        }
        .slide {
            width: 120%;
            box-shadow: 0 0 2px 2px var(--x-black);
            border: 1px solid var(--x-white);
            border-radius: var(--x-border-radius);
            cursor: pointer;

            position: absolute;
            left: 0;
            transform: translate(-10%, -50%);
            pointer-events: none;
        }
    }
</style>
