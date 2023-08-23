<template>
    <ClientOnly>
        <Teleport to="#app">
            <XRain :style="rainStyle" />
        </Teleport>
    </ClientOnly>
</template>

<script setup lang="ts">
    import { XRain } from '@pkgs/ui';
    import { useData } from 'vitepress';
    import { computed } from 'vue';
    const { isDark } = useData();
    const rainStyle = computed(() => {
        return {
            backgroundColor: isDark.value ? '#000' : '#e1e1e1',
            color: isDark.value ? '#0f0' : '#8175',
        };
    });
</script>

<style scoped lang="less">
    .x-rain {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>
