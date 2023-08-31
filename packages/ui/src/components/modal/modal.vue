<template>
    <XPopup v-model="visible" class="x-modal" :class="{ '--input': props.showInput }" modal>
        <XBox class="x-modal__container">
            <div v-if="props.title" class="x-modal__header">{{ props.title }}</div>
            <div class="x-modal__body">
                <div class="x-modal__content">
                    <slot>{{ props.content }}</slot>
                </div>
                <div v-if="props.showInput" class="x-modal__input">
                    <input v-model="value" :placeholder="props.placeholder" :type="props.inputType" />
                </div>
            </div>
            <div class="x-modal__footer x-flex">
                <XButton v-if="props.showCancel" class="x-modal__cancel" text theme="error" @click="handleClose">
                    {{ props.cancelText }}
                </XButton>
                <XButton class="x-modal__confirm" text theme="primary" @click="handleConfirm">
                    {{ props.confirmText }}
                </XButton>
            </div>
        </XBox>
    </XPopup>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { XPopup, XBox, XButton, ModalInputValue } from '../';
    defineOptions({
        name: 'XModal',
    });
    const props = withDefaults(
        defineProps<{
            title?: string;
            content: string;
            showCancel?: boolean;
            showInput?: boolean;
            cancelText?: string;
            confirmText?: string;
            placeholder?: string;
            inputType?: 'text' | 'password' | 'number';
            defaultValue?: ModalInputValue;
        }>(),
        {
            cancelText: '取消',
            confirmText: '确定',
        }
    );
    const emits = defineEmits<{
        close: [action: 'cancel' | 'confirm', value: ModalInputValue];
    }>();
    const visible = defineModel<boolean>({ required: true });
    const handleClose = (reason: 'cancel' | 'confirm' = 'cancel') => {
        emits('close', reason, value.value);
    };
    const handleConfirm = () => {
        handleClose('confirm');
    };

    const value = ref<ModalInputValue>(props.defaultValue);
</script>

<style lang="less">
    .x-modal {
        padding: 0;
        min-width: var(--x-width);
        // &__container {
        //     border: none;
        // }
        &__header {
            padding: var(--x-space-mini) var(--x-space-small);
            border-bottom: 1px solid var(--x-primary);
            font-size: 1rem;
        }
        &__body {
            padding: var(--x-space-small);
            .x-modal__content {
                text-align: center;
            }
            .x-modal__input {
                margin-top: var(--x-space-mini);
                input {
                    width: 100%;
                    height: var(--x-height);
                    background-color: var(--x-fade-white);
                    border-radius: var(--x-border-radius);
                    padding: 0 var(--x-space-mini);
                }
            }
        }
        &__footer {
            border-top: 1px solid var(--x-primary);
            > .x-button {
                flex: 1;
                margin: 0;
                padding: 10px 0;
                border: none;
                border-radius: 0;
                &.x-modal__confirm {
                    color: var(--x-white);
                }
            }
        }
        &.--input {
            min-width: var(--x-width-large);
            .x-modal__body {
                .x-modal__content {
                    text-align: left;
                }
            }
        }
    }
</style>
