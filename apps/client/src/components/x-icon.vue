<template>
    <component :is="svgs[props.name]" class="x-icon" />
</template>

<script setup lang="ts">
    import { svgs } from '@/icons';
    defineOptions({
        name: 'XIcon',
    });
    const props = defineProps<{
        name: string;
    }>();
</script>

<style lang="less">
    .x-icon {
        width: 1em;
        height: 1em;
    }
</style>
