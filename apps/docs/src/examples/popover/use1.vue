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
        <XPopover v-model="visible" trigger="manual">
            <template #target>
                <XButton theme="primary" @click="visible = !visible">手动控制</XButton>
            </template>
            这里是弹窗内容
        </XPopover>
    </div>
</template>
<script setup lang="ts">
    import { XButton, XPopover } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(false);
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
