<template>
    <dialog ref="popover" class="x-popover">
        <slot></slot>
    </dialog>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, onUnmounted } from 'vue';
    defineOptions({
        name: 'XPopover',
    });
    const props = defineProps<{
        modelValue: boolean;
        showModal?: boolean;
    }>();
    const popover = ref<HTMLDialogElement>();
    const emits = defineEmits<{
        'update:modelValue': [value: boolean];
    }>();
    const handleClose = () => {
        emits('update:modelValue', false);
    };
    onMounted(() => {
        popover.value!.addEventListener('close', handleClose);
        watch(
            () => props.modelValue,
            (visible) => {
                if (popover.value) {
                    if (visible) {
                        const show = props.showModal ? popover.value.showModal : popover.value.show;
                        show.call(popover.value);
                    } else {
                        popover.value.close();
                    }
                }
            },
            {
                immediate: true,
            }
        );
    });
    onUnmounted(() => {
        popover.value?.removeEventListener('close', handleClose);
    });
</script>

<style lang="less">
    .x-popover {
        border: none;
        outline: none;
        background: none;
        color: white;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;

        &::backdrop {
            background: #000a;
        }
    }
</style>
