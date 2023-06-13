<template>
    <div class="blogs-main-container">
        <x-markdown :md="list[current].content" />
    </div>
</template>

<script setup lang="ts">
    import { useContext } from './context';
    defineOptions({
        name: 'BlogsMain',
    });
    const { current, list } = useContext();
</script>

<style scoped lang="less">
    .blogs-main-container {
        .x-markdown {
            max-width: 100%;
            max-height: 100%;
        }
    }
</style>
