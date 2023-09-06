<template>
    <XScrollbar width="100%">
        <div class="content">
            <div v-for="(item, index) in 100" :key="index">这是很长的内容{{ index + 1 }}</div>
        </div>
    </XScrollbar>
</template>
<script setup lang="ts">
    import { XScrollbar } from '@pkgs/ui';
</script>
<style scoped lang="less">
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
</style>
