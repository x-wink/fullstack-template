<template>
    <div class="x-color-preview" :style="{ height: `${props.height}px` }">
        <canvas ref="refsCanvas"></canvas>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import { RGBA, rgba2Hex } from '../../utils';

    defineOptions({
        name: 'XColorPreview',
    });
    const props = withDefaults(
        defineProps<{
            color: RGBA;
            height?: number;
        }>(),
        {
            height: 20,
        }
    );

    const refsCanvas = ref<HTMLCanvasElement>();
    const render = () => {
        if (refsCanvas.value) {
            const cvs = refsCanvas.value;
            const ctx = cvs.getContext('2d')!;
            cvs.width = cvs.parentElement!.clientWidth;
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

            ctx.fillStyle = rgba2Hex(props.color);
            ctx.fillRect(0, 0, cvs.width, cvs.height);
        }
    };
    watch([refsCanvas, props], render, { deep: true });
    onMounted(() => {
        new ResizeObserver(render).observe(refsCanvas.value!.parentElement!);
    });
</script>
<style lang="less">
    .x-color-preview {
        width: 100%;
    }
</style>
