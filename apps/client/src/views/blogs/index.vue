<template>
    <div class="blogs-container">
        <ul class="list">
            <li v-for="(item, index) in list" :key="index">
                {{ item.name }}
            </li>
        </ul>
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
            name: 'SVG转图片使用画布绘制',
            content: svg2img,
        },
    ]);
</script>

<style scoped lang="less">
    .blogs-container {
        flex-direction: row !important;

        .list {
            height: 100%;
            margin-right: 10px;
        }

        .content {
            flex: 1;
            height: 100%;
        }
    }
</style>
