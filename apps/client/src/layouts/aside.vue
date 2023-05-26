<template>
    <aside class="aside"></aside>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
    .aside {
        max-width: 200px;
        &:not(:empty) {
            border-right: 2px dashed #333;
        }
    }
</style>
