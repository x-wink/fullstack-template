<template>
    <div class="blogs-aside-container">
        <x-menu v-model:active="current" class="list" :menus="list" vertical />
    </div>
</template>

<script setup lang="ts">
    import { useContext } from './context';
    defineOptions({
        name: 'BlogsAside',
    });
    const { current, list } = useContext();
</script>

<style scoped lang="less">
    .blogs-aside-container {
        flex-direction: row !important;
        overflow: hidden !important;

        .list {
            height: 100%;
            padding: 10px;
            margin-right: 10px;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }
</style>
