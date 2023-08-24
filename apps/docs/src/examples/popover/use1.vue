<template>
    <XPopover v-model="visible">为方便展示，通过样式设为静态定位</XPopover>
</template>
<script setup lang="ts">
    import { XPopover } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(true);
</script>
<style scoped lang="less">
    .x-popover {
        position: static;
        background: var(--x-error);
        padding: 20px;
        margin: unset;
    }
</style>
