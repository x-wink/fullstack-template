<template>
    <div class="themes">
        <XButton v-for="(item, index) in buttonThemes" :key="index" text :theme="item">{{ item }}</XButton>
    </div>
</template>

<script setup lang="ts">
    import { XButton, buttonThemes } from '@pkgs/ui';
</script>

<style scoped lang="less">
    .themes {
        display: flex;
    }
</style>
