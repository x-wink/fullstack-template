<template>
    <XButton theme="primary" @click="handleChange(1)">增加内容</XButton>
    <XButton theme="second" @click="handleChange(-1)">减少内容</XButton>
    <XScrollbar max-width="100%">
        <div class="content">
            <div v-for="(item, index) in count" :key="index">这是很长的内容{{ index + 1 }}</div>
        </div>
    </XScrollbar>
</template>
<script setup lang="ts">
    import { XButton, XScrollbar } from '@pkgs/ui';
    import { ref } from 'vue';
    const count = ref(3);
    const handleChange = (direction: number) => {
        count.value = Math.min(100, Math.max(3, count.value + direction * 3));
    };
</script>
<style scoped lang="less">
    .x-scrollbar {
        margin-top: var(--x-space);
        .content {
            background-color: #0003;
            display: flex;
            padding: var(--x-space) 0;
            width: fit-content;
            div {
                white-space: nowrap;
                + div {
                    margin-left: var(--x-space);
                }
            }
        }
    }
</style>
