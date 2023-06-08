<template>
    <dialog ref="dialog" class="x-dialog">
        <x-box>
            <slot></slot>
        </x-box>
    </dialog>
</template>

<script setup lang="ts">
    defineOptions({
        name: 'XDialog',
    });
    const props = defineProps<{
        modelValue: boolean;
        showModal?: boolean;
    }>();
    const dialog = ref<HTMLDialogElement>();
    const emits = defineEmits<{
        'update:modelValue': [value: boolean];
    }>();
    const handleClose = () => {
        emits('update:modelValue', false);
    };
    onMounted(() => {
        dialog.value!.addEventListener('close', handleClose);
        watch(
            () => props.modelValue,
            (visible) => {
                if (dialog.value) {
                    if (visible) {
                        const show = props.showModal ? dialog.value.showModal : dialog.value.show;
                        show.call(dialog.value);
                    } else {
                        dialog.value.close();
                    }
                }
            },
            {
                immediate: true,
            }
        );
    });
    onUnmounted(() => {
        dialog.value?.removeEventListener('close', handleClose);
    });
</script>

<style lang="less">
    .x-dialog {
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
        > .x-box {
            padding: 20px;
        }
    }
</style>
