<template>
    <div class="x-drawer" :class="{ active: visible }">
        <slot></slot>
        <div class="btn flex row-center col-center">
            <x-icon :name="visible ? 'left-arrow' : 'right-arrow'" style="font-size: 24px" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useModel } from 'vue';

    const props = defineProps<{
        modelValue?: boolean;
    }>();
    const visible = useModel(props, 'modelValue');
</script>

<style scoped lang="less">
    .x-drawer {
        width: 0;
        height: 100%;
        position: relative;
        background: #fff3;
        &.active {
            width: unset;
        }
        .btn {
            position: absolute;
            right: -20px;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 20px;
            height: 30px;
            border: 1px solid var(--primary);
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border-left: 0;
        }
    }
</style>
