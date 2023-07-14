<template>
    <component :is="svgs[props.name]" class="x-icon" />
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { svgs } from '../icons';
    defineOptions({
        name: 'XIcon',
    });
    const props = withDefaults(
        defineProps<{
            name: string;
            size?: string | number | [string | number, string | number];
        }>(),
        {
            size: '1em',
        }
    );
    const iconSize = computed(() =>
        (Array.isArray(props.size) ? props.size : [props.size, props.size]).map((item) =>
            Number.isNaN(Number(item)) ? item : `${item}px`
        )
    );
</script>

<style lang="less">
    .x-icon {
        width: v-bind('iconSize[0]');
        height: v-bind('iconSize[1]');
    }
</style>
