<template>
    <XColorSlider v-model="alpha" class="x-color-opacity" :render="render" />
</template>

<script setup lang="ts">
    import { RGB } from '../../utils';
    import XColorSlider from './slider.vue';
    const props = defineProps<{
        hue: RGB;
    }>();

    const alpha = defineModel<number>({ required: true });

    const render = (cvs: HTMLCanvasElement) => {
        const ctx = cvs.getContext('2d')!;

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
        saturationGradient.addColorStop(0, `rgba(${props.hue.r}, ${props.hue.g}, ${props.hue.b}, 0)`);
        saturationGradient.addColorStop(1, `rgba(${props.hue.r}, ${props.hue.g}, ${props.hue.b}, 1)`);
        ctx.fillStyle = saturationGradient;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
    };
</script>
