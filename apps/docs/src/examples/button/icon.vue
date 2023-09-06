<template>
    <div class="themes">
        <XButton v-for="(item, index) in themeColors" :key="index" icon="Logo" :theme="item">{{ item }}</XButton>
    </div>
    <br />
    <div class="themes">
        <XButton v-for="(item, index) in themeColors" :key="index" simple :theme="item">
            <template #icon>
                <Logo />
            </template>
        </XButton>
    </div>
</template>

<script setup lang="ts">
    import { XButton, themeColors } from '@pkgs/ui';
    import { Logo } from '@pkgs/ui';
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
