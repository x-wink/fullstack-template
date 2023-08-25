<template>
    <div class="themes">
        <XButton v-for="(item, index) in buttonThemes" :key="index" link :theme="item">{{ item }}</XButton>
    </div>
</template>

<script setup lang="ts">
    import { XButton, buttonThemes } from '@pkgs/ui';
</script>

<style scoped lang="less">
    .themes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(6em, 1fr));
        grid-gap: var(--x-space-mini);
    }
</style>
