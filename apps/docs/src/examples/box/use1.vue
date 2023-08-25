<template>
    <div class="x-flex wrap">
        <XBox>空盒子</XBox>
        <XBox shadow>阴影盒子</XBox>
        <XBox animation>动画盒子</XBox>
    </div>
</template>
<script setup lang="ts">
    import { XBox } from '@pkgs/ui';
</script>
<style scoped lang="less">
    .x-box {
        width: var(--x-width-mini);
        height: var(--x-width-mini);
        line-height: var(--x-width-mini);
        text-align: center;
        + .x-box {
            margin-left: var(--x-space);
        }
    }
</style>
