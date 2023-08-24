<template>
    <XModal content="这是一个弹窗" :show-modal="false" />
</template>
<script setup lang="ts">
    import { XModal } from '@pkgs/ui';
</script>
<style scoped lang="less">
    .x-modal {
        position: static;
        margin: unset;
    }
</style>
