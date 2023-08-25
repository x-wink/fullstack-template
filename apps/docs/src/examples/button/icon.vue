<template>
    <div class="themes">
        <XButton v-for="(item, index) in buttonThemes" :key="index" icon="Logo" :theme="item">{{ item }}</XButton>
    </div>
    <br />
    <div class="themes">
        <XButton v-for="(item, index) in buttonThemes" :key="index" simple :theme="item">
            <template #icon>
                <Logo />
            </template>
        </XButton>
    </div>
</template>

<script setup lang="ts">
    import { XButton, buttonThemes } from '@pkgs/ui';
    import { Logo } from '@pkgs/ui';
</script>

<style scoped lang="less">
    .themes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(6em, 1fr));
        grid-gap: var(--x-space-mini);
    }
</style>
