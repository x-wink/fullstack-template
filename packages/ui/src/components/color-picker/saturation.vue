<template>
    <div ref="refsContainer" class="x-color-saturation">
        <canvas ref="refsCanvas" @click="handleClick"></canvas>
        <div class="dot" :style="dotStyle"></div>
    </div>
</template>

<script setup lang="ts">
    import { computed, nextTick, onMounted, ref, watch } from 'vue';
    import { RGB, RGBA, createDragContainer, rgba2Hex, colorDiff } from '../../utils';

    defineOptions({
        name: 'XColorSaturation',
    });
    const props = withDefaults(
        defineProps<{
            modelValue: RGBA;
            hue: RGB;
            width?: number;
            height?: number;
            dot?: number;
        }>(),
        {
            width: 100,
            height: 100,
            dot: 10,
        }
    );
    const emits = defineEmits<{
        'update:modelValue': [value: RGB];
    }>();
    const color = computed({
        get: () => props.modelValue,
        set: (value) => emits('update:modelValue', value),
    });

    const dotStyle = computed(() => {
        return {
            width: `${props.dot}px`,
            height: `${props.dot}px`,
            left: `${position.value[0]}px`,
            top: `${position.value[1]}px`,
        };
    });

    const position = ref([0, 0]);
    const refsCanvas = ref<HTMLCanvasElement>();
    const render = () => {
        if (refsCanvas.value) {
            const cvs = refsCanvas.value;
            const ctx = cvs.getContext('2d', { willReadFrequently: true })!;
            cvs.width = props.width;
            cvs.height = props.height;

            ctx.clearRect(0, 0, cvs.width, cvs.height);

            const saturationGradient = ctx.createLinearGradient(0, 0, cvs.width, 0);
            saturationGradient.addColorStop(0, 'hsl(0, 0%, 100%)');
            saturationGradient.addColorStop(1, rgba2Hex(props.hue));
            ctx.fillStyle = saturationGradient;
            ctx.fillRect(0, 0, cvs.width, cvs.height);

            ctx.globalCompositeOperation = 'multiply';

            const brightnessGradient = ctx.createLinearGradient(0, 0, 0, cvs.height);
            brightnessGradient.addColorStop(0, 'hsl(0, 0%, 100%)');
            brightnessGradient.addColorStop(1, 'hsl(0, 0%, 0%)');
            ctx.fillStyle = brightnessGradient;
            ctx.fillRect(0, 0, cvs.width, cvs.height);
        }
    };
    const getPosition = (cvs: HTMLCanvasElement, color: RGB) => {
        const ctx = cvs.getContext('2d')!;

        const imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
        const data = imageData.data;

        let closestDiff = Infinity;
        let x = -1;
        let y = -1;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const diff = colorDiff(color, { r, g, b });

            if (diff < closestDiff) {
                closestDiff = diff;
                x = (i / 4) % cvs.width;
                y = Math.floor(i / (4 * cvs.width));
            }
        }
        return [x, y];
    };
    const getColor = (cvs: HTMLCanvasElement, x: number, y: number) => {
        const ctx = cvs.getContext('2d')!;
        x = Math.min(cvs.width - 0.1, x);
        y = Math.min(cvs.height - 0.1, y);
        const imageData = ctx.getImageData(x, y, 1, 1);
        const data = imageData.data;

        const r = data[0];
        const g = data[1];
        const b = data[2];
        return { r, g, b };
    };
    watch(
        [refsCanvas, () => props.width, () => props.height, () => props.hue],
        ([, , , hue], [, , , oldHue]) => {
            render();
            nextTick(() => {
                if (hue !== oldHue) {
                    color.value = {
                        ...getColor(refsCanvas.value!, position.value[0], position.value[1]),
                        a: color.value.a,
                    };
                } else {
                    position.value = getPosition(refsCanvas.value!, color.value);
                }
            });
        },
        { deep: true }
    );
    const handleClick = (e: MouseEvent) => {
        color.value = { ...getColor(refsCanvas.value!, e.offsetX, e.offsetY), a: color.value.a };
    };
    const refsContainer = ref<HTMLDivElement>();
    onMounted(() => {
        createDragContainer(refsContainer.value!, (x, y) => {
            position.value = [x, y];
            color.value = { ...getColor(refsCanvas.value!, x, y), a: color.value.a };
        });
    });
</script>
<style lang="less">
    .x-color-saturation {
        position: relative;
        width: max-content;
        aspect-ratio: 1;

        canvas {
            width: 100%;
            height: 100%;
        }

        .dot {
            box-shadow: 0 0 2px 2px var(--x-black);
            border: 1px solid var(--x-white);
            border-radius: 50%;
            cursor: pointer;

            position: absolute;
            transform: translate(-50%, -50%);
            pointer-events: none;
        }
    }
</style>
./utils
