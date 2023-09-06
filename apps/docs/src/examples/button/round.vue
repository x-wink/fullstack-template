<template>
    <div class="themes">
        <XButton v-for="(item, index) in themeColors" :key="index" round :theme="item">{{ item }}</XButton>
    </div>
</template>

<script setup lang="ts">
    import { XButton, themeColors } from '@pkgs/ui';
</script>

<style scoped lang="less">
    .themes {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .x-button {
            margin: var(--x-space-mini);
        }
    }
</style>
