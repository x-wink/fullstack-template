<template>
    <component :is="props.tag" class="x-text" :class="textClass">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { ThemeColor } from '.';

    defineOptions({
        name: 'XText',
    });
    const props = withDefaults(
        defineProps<{
            theme?: ThemeColor;
            tag?: keyof HTMLElementTagNameMap;
            ellipsis?: boolean;
        }>(),
        {
            theme: 'default',
            tag: 'span',
        }
    );
    const textClass = computed(() => {
        return {
            ellipsis: props.ellipsis,
            [`--${props.theme}`]: true,
        };
    });
</script>

<style lang="less">
    .x-text {
        word-break: break-all;

        &.ellipsis {
            display: inline-block;
            max-width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        @themes: default, primary, second, info, success, warn, error;
        @fcs: var(--x-white), var(--x-purple), var(--x-mauve), var(--x-blue), var(--x-green), var(--x-yellow),
            var(--x-red);
        each(@themes, {
            &.--@{value} {
                color: extract(@fcs, @index);
            }
        });
    }
</style>
