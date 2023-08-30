<template>
    <div ref="refsContainer" class="x-color-opacity">
        <canvas ref="refsCanvas"></canvas>
        <div class="slide" :style="slideStyle"></div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref, watch } from 'vue';
    import { RGB, createDragContainer, rgbaToHex } from './utils';

    defineOptions({
        name: 'XColorOpacity',
    });
    const props = withDefaults(
        defineProps<{
            modelValue: number;
            hue: RGB;
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
    const emits = defineEmits<{
        'update:modelValue': [value: number];
    }>();
    const handleValue = (val: number) => {
        const p = 10 ** props.precision;
        return ~~(val * p) / p;
    };
    const alpha = computed({
        get: () => props.modelValue,
        set: (value) => emits('update:modelValue', value),
    });
    alpha.value = handleValue(alpha.value);

    const slideStyle = computed(() => {
        return {
            height: `${props.slide}px`,
            top: `${position.value[1]}px`,
        };
    });
    const position = computed(() => [0, alpha.value * (refsCanvas.value?.offsetHeight ?? 0)]);
    const refsCanvas = ref<HTMLCanvasElement>();
    const render = () => {
        if (refsCanvas.value) {
            const cvs = refsCanvas.value;
            const ctx = cvs.getContext('2d')!;
            cvs.width = props.width;
            cvs.height = props.height;

            ctx.clearRect(0, 0, cvs.width, cvs.height);

            const gridSize = 5;
            const numColumns = cvs.width / gridSize;
            const numRows = cvs.height / gridSize;
            for (let col = 0; col < numColumns; col++) {
                for (let row = 0; row < numRows; row++) {
                    if ((col + row) % 2 === 0) {
                        ctx.fillStyle = '#ccc';
                    } else {
                        ctx.fillStyle = '#fff';
                    }
                    ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
                }
            }

            const saturationGradient = ctx.createLinearGradient(0, 0, cvs.width, cvs.height);
            saturationGradient.addColorStop(0, `${rgbaToHex({ ...props.hue, a: 0 })}`);
            saturationGradient.addColorStop(1, `${rgbaToHex(props.hue)}`);
            ctx.fillStyle = saturationGradient;
            ctx.fillRect(0, 0, cvs.width, cvs.height);
        }
    };
    watch([refsCanvas, () => props.width, () => props.height, () => props.hue], render, { deep: true });
    const refsContainer = ref<HTMLDivElement>();
    onMounted(() => {
        createDragContainer(refsContainer.value!, (x, y) => {
            alpha.value = handleValue(y / refsContainer.value!.clientHeight);
        });
    });
</script>
<style lang="less">
    .x-color-opacity {
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
