<template>
    <img alt="icon" class="common-icon" :src="path" :style="style" />
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            name: string;
            width?: string;
            height?: string;
        }>(),
        {
            width: '1em',
            height: '1em',
        }
    );
    const loadAssets = (file: string) => {
        return new URL(`../assets/icons/${file}.png`, import.meta.url).href;
    };
    const path = computed(() => loadAssets(props.name));

    const style = computed(() => ({ width: props.width, height: props.height }));
</script>

<style lang="less">
    .common-icon {
        display: inline;
        vertical-align: middle;
    }
</style>
