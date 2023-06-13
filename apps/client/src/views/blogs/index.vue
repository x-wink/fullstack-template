<template>
    <div class="blogs-container">
        <x-menu v-model:active="current" class="list" :menus="list" vertical />
        <div class="content">
            <x-markdown :md="list[current].content" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import svg2img from './svg2img.md?raw';
    const current = ref(0);
    const list = reactive([
        {
            name: 'SVG转图片',
            content: svg2img,
        },
        {
            name: 'SVG转图片2',
            content: svg2img,
        },
    ]);
</script>

<style scoped lang="less">
    .blogs-container {
        flex-direction: row !important;
        overflow: hidden !important;

        .list {
            height: 100%;
            margin-right: 10px;
            justify-content: flex-start;
        }

        .content {
            flex: 1;
            height: 100%;
            overflow: auto;
        }
    }
</style>
