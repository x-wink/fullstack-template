<template>
    <div class="scene flex col" :style="{ aspectRatio: props.col / props.row }">
        <div v-for="y in props.row" :key="y" class="row flex" :style="{ height: `${100 / props.row}%` }">
            <Box
                v-for="x in props.col"
                :key="x"
                :active="calcBoxActive((y - 1) * props.col + x - 1)"
                :color="calcBoxColor((y - 1) * props.col + x - 1)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Container, Shape, Point } from './core';
    import Box from './box.vue';

    const props = withDefaults(
        defineProps<{
            row?: number;
            col?: number;
            boxes: Container;
            current?: Shape;
        }>(),
        {
            row: 4,
            col: 4,
        }
    );

    const calcBoxColor = (i: number) => {
        let res = 'transparent';
        let value = props.boxes.flat()[i];
        if (!value && props.current) {
            value = props.current.contain(new Point(i % props.col, Math.floor(i / props.col)));
        }
        res = Shape.color[value];
        return res;
    };
    const calcBoxActive = (i: number) => {
        let res = props.boxes.flat()[i] > 0;
        if (!res && props.current) {
            if (props.current.contain(new Point(i % props.col, Math.floor(i / props.col))) !== 0) {
                res = true;
            }
        }
        return res;
    };
</script>

<style scoped lang="less">
    .scene {
        height: 100%;
        overflow: hidden;
        border: 2px inset white;
        border-radius: var(--x-border-radius);
        background-color: rgba(0, 0, 0, 0.3);
        + .scene {
            margin-left: 20px;
        }
    }
</style>
