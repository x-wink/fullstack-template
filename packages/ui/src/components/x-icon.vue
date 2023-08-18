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
            size?: string | number;
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
</script>

<style lang="less">
    .x-icon {
        font-size: v-bind('props.size');
        display: inline-block;
        color: inherit;
        line-height: 0;
        text-align: center;
        vertical-align: -0.125em;
        svg {
            display: inline-block;
            overflow: hidden;
            line-height: 1;
        }
    }
</style>
