<template>
    <button
        class="x-button"
        :class="{
            '--danger': props.danger,
            '--text': props.text,
        }"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
    defineOptions({
        name: 'XButton',
    });
    const props = defineProps<{
        danger?: boolean;
        text?: boolean;
    }>();
</script>

<style lang="less">
    .x-button {
        font-size: inherit;
        color: var(--primary);
        background: none;
        border: none;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        &:active {
            transform: scale(0.8);
        }
        &:not(.--text) {
            padding: 5px 10px;
            background: #fff3;
            &:hover {
                background: #fff6;
            }
        }
        &.--danger {
            color: var(--error);
        }
        + .x-button {
            margin-left: 5px;
        }
    }
</style>
