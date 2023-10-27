<template>
    <div
        class="box"
        :class="{ active: props.active }"
        :style="{
            backgroundColor: props.color,
        }"
    ></div>
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            color?: string;
            active?: boolean;
        }>(),
        {
            color: 'transparent',
            acrive: false,
        }
    );
</script>

<style scoped lang="less">
    .box {
        height: 100%;
        aspect-ratio: 1;
        border: 0.1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        &.active {
            border: 1px outset white;
        }
    }
</style>
