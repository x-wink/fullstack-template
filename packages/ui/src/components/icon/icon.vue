<template>
    <component :is="iconComponent" :class="classList" />
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import * as svgs from '@pkgs/icons';
    import { IconAnimation, IconName } from './types';
    defineOptions({
        name: 'XIcon',
    });
    const props = withDefaults(
        defineProps<{
            name: IconName;
            size?: string | number;
            animation?: IconAnimation;
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
