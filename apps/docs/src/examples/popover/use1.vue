<template>
    <div class="container x-flex">
        <XPopover trigger="hover">
            <template #target>
                <XButton theme="primary">鼠标移入</XButton>
            </template>
            这里是弹窗内容
        </XPopover>
        <XPopover trigger="click">
            <template #target>
                <XButton theme="primary">鼠标单击</XButton>
            </template>
            这里是弹窗内容
        </XPopover>
    </div>
</template>
<script setup lang="ts">
    import { XButton, XPopover } from '@pkgs/ui';
</script>
<style scoped lang="less">
    .container {
        :deep(.x-popover-target) {
            + .x-popover-target {
                margin-left: var(--x-space);
            }
        }
    }
</style>
