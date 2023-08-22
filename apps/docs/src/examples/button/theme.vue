<template>
    <div class="themes">
        <XButton v-for="(item, index) in buttonThemes" :key="index" :theme="item">{{ item }}</XButton>
    </div>
</template>

<script setup lang="ts">
    import { XButton, buttonThemes } from '@pkgs/ui';
</script>

<style scoped lang="less"></style>
