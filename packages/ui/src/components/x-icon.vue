<template>
    <component :is="iconComponent" :class="classList" />
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import * as svgs from '@pkgs/icons';
    import type { IconNames } from '@pkgs/icons';
    defineOptions({
        name: 'XIcon',
    });
    const props = withDefaults(
        defineProps<{
            name: IconNames;
            size?: string | number | [string | number, string | number];
            animation?: 'spin' | 'pulse' | 'heart' | 'shake' | 'breathe';
        }>(),
        {
            size: '1em',
        }
    );
    const classList = computed(() => {
        return {
            'x-icon': true,
            [`x-${props.animation}`]: props.animation,
        };
    });
    const iconComponent = computed(() => svgs[props.name]);
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
        position: relative;
        top: 0.05em;
    }
</style>
