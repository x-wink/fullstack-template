<template>
    <div>
        <Mobile v-if="isPortrait" />
        <Pc v-else />
    </div>
</template>

<script setup lang="ts">
    import { useContext } from '@/context';
    import Mobile from './mobile.vue';
    import Pc from './pc.vue';
    const { isPortrait } = useContext();
</script>

<style scoped lang="less">
    > :deep(.x-rain) {
        font-size: 2rem;
        color: var(--x-primary);
    }
    > :deep(.layout) {
        perspective: none;
        width: 90%;
        height: calc(98% - 20px);
        max-width: 1200px;
        background: none;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        > .main {
            flex: 1;
            display: flex;
            overflow: hidden;
        }
    }
</style>
