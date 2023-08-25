<template>
    <div class="x-flex wrap">
        <XPopover
            v-for="(item, index) in popoverArrowPlacements"
            :key="index"
            v-model="visible"
            arrow
            :arrow-placement="item"
            static
        >
            箭头位置：{{ item }}
        </XPopover>
    </div>
</template>
<script setup lang="ts">
    import { XPopover, popoverArrowPlacements } from '@pkgs/ui';
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
