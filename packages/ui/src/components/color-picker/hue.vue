<template>
    <div ref="refsContainer" class="x-color-hue">
        <canvas ref="refsCanvas"></canvas>
        <div class="slide" :style="slideStyle"></div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref, watch } from 'vue';
    import { RGB, createDragContainer, getColor, getPosition } from './utils';

    defineOptions({
        name: 'XColorHue',
    });
    const props = withDefaults(
        defineProps<{
            modelValue: RGB;
            width?: number;
            height?: number;
            slide?: number;
        }>(),
        {
            width: 15,
            height: 100,
            slide: 5,
        }
    );
    const emits = defineEmits<{
        'update:modelValue': [value: RGB];
    }>();
    const color = computed({
        get: () => props.modelValue,
        set: (value) => emits('update:modelValue', value),
    });

    const slideStyle = computed(() => {
        return {
            height: `${props.slide}px`,
            top: `${position.value[1]}px`,
        };
    });

    const position = ref([0, 0]);
    const refsCanvas = ref<HTMLCanvasElement>();
    const render = () => {
        if (refsCanvas.value) {
            const cvs = refsCanvas.value;
            const ctx = cvs.getContext('2d')!;
            cvs.width = props.width;
            cvs.height = props.height;

            const gradient = ctx.createLinearGradient(0, 0, cvs.width, cvs.height);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(1 / 6, 'yellow');
            gradient.addColorStop(2 / 6, 'lime');
            gradient.addColorStop(3 / 6, 'cyan');
            gradient.addColorStop(4 / 6, 'blue');
            gradient.addColorStop(5 / 6, 'magenta');
            gradient.addColorStop(1, 'red');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, cvs.width, cvs.height);

            position.value = getPosition(cvs, color.value);
        }
    };
    watch([refsCanvas, () => props.width, () => props.height], render, { deep: true });

    const refsContainer = ref<HTMLDivElement>();
    onMounted(() => {
        createDragContainer(refsContainer.value!, (x, y) => {
            position.value = [x, y];
            color.value = getColor(refsCanvas.value!, x, y);
        });
    });
</script>
<style lang="less">
    .x-color-hue {
        position: relative;
        width: max-content;
        canvas {
            width: 100%;
            height: 100%;
        }
        .slide {
            width: 120%;
            border: 1px solid var(--x-white);
            border-radius: var(--x-border-radius);
            cursor: pointer;
            box-shadow: 0 0 2px 2px var(--x-fade-black);

            position: absolute;
            left: 0;
            transform: translate(-10%, -50%);
            pointer-events: none;
        }
    }
</style>
./utils
