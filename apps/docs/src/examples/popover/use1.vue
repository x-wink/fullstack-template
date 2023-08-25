<template>
    <XPopover v-model="visible" static>普通弹出层</XPopover>
</template>
<script setup lang="ts">
    import { XPopover } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(true);
</script>
<style scoped lang="less">
    .x-popover {
        background: var(--x-primary);
        padding: var(--x-space);
        margin: var(--x-space-small);
    }
</style>
