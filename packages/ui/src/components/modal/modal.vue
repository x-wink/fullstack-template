<template>
    <XPopup v-model="visible" class="x-modal" :class="{ '--input': props.showInput }" modal>
        <XBox class="x-modal__container">
            <div v-if="props.title" class="x-modal__header">{{ props.title }}</div>
            <div v-if="props.showClose" class="x-modal__close">
                <XButton circle icon="Close" text theme="error" @click="handleClose('close')" />
            </div>
            <div class="x-modal__body">
                <div class="x-modal__content">
                    <slot>{{ props.content }}</slot>
                </div>
                <div v-if="props.showInput" class="x-modal__input">
                    <XInput
                        v-model="value"
                        :placeholder="props.placeholder"
                        :type="props.inputType"
                        v-bind="props.inputAttrs"
                    />
                </div>
            </div>
            <div v-if="props.showCancel || props.showConfirm" class="x-modal__footer x-flex">
                <XButton
                    v-if="props.showCancel"
                    class="x-modal__cancel"
                    text
                    theme="error"
                    v-bind="props.cancelAttrs"
                    @click="handleClose('cancel')"
                >
                    {{ props.cancelText }}
                </XButton>
                <XButton
                    v-if="props.showConfirm"
                    class="x-modal__confirm"
                    text
                    theme="primary"
                    v-bind="props.comfirmAttrs"
                    @click="handleConfirm"
                >
                    {{ props.confirmText }}
                </XButton>
            </div>
        </XBox>
    </XPopup>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { XPopup, XBox, XButton, XInput, ModalInputValue, InputType, ModalCloseReason } from '../';
    defineOptions({
        name: 'XModal',
    });
    const props = withDefaults(
        defineProps<{
            title?: string;
            content: string;
            showCancel?: boolean;
            showConfirm?: boolean;
            showClose?: boolean;
            showInput?: boolean;
            cancelText?: string;
            confirmText?: string;
            cancelAttrs?: Record<string, unknown>;
            comfirmAttrs?: Record<string, unknown>;
            placeholder?: string;
            inputType?: InputType;
            inputAttrs?: Record<string, unknown>;
            defaultValue?: ModalInputValue;
        }>(),
        {
            showConfirm: true,
            cancelText: '取消',
            confirmText: '确定',
            defaultValue: '',
        }
    );
    const emits = defineEmits<{
        close: [reason: ModalCloseReason, value: ModalInputValue];
    }>();
    const visible = defineModel<boolean>({ required: true });
    const handleClose = (reason: ModalCloseReason) => {
        emits('close', reason, value.value);
    };
    const handleConfirm = () => {
        handleClose('confirm');
    };

    const value = ref(String(props.defaultValue));
</script>

<style lang="less">
    .x-modal {
        padding: 0;
        min-width: var(--x-width);
        &__header {
            padding: var(--x-space-mini) var(--x-space-small);
            border-bottom: 1px solid var(--x-primary);
            font-size: 1rem;
        }
        &__close {
            position: absolute;
            right: var(--x-space-mini);
            top: var(--x-space-mini);
            .x-button {
                padding: 3px;
                min-width: fit-content;
                min-height: fit-content;
            }
        }
        &__body {
            padding: var(--x-space-small);
            .x-modal__content {
                text-align: center;
            }
            .x-modal__input {
                margin-top: var(--x-space-mini);
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
