<template>
    <XPopup v-model="visible" class="x-modal" modal>
        <XBox>
            <div v-if="props.title" class="header">{{ props.title }}</div>
            <div class="content">
                <slot>{{ props.content }}</slot>
            </div>
            <div class="footer x-flex">
                <XButton v-if="props.showCancel" class="cancel" text theme="error" @click="handleClose">
                    {{ props.cancelText }}
                </XButton>
                <XButton class="confirm" text theme="primary" @click="handleConfirm">{{ props.confirmText }}</XButton>
            </div>
        </XBox>
    </XPopup>
</template>

<script setup lang="ts">
    import { XPopup, XBox, XButton } from '../';
    defineOptions({
        name: 'XModal',
    });
    const props = withDefaults(
        defineProps<{
            title?: string;
            content: string;
            showCancel?: boolean;
            cancelText?: string;
            confirmText?: string;
        }>(),
        {
            cancelText: '取消',
            confirmText: '确定',
        }
    );
    const emits = defineEmits<{
        close: [action: 'cancel' | 'confirm'];
    }>();
    const visible = defineModel<boolean>({ required: true });
    const handleClose = (reason: 'cancel' | 'confirm' = 'cancel') => {
        emits('close', reason);
    };
    const handleConfirm = () => {
        handleClose('confirm');
    };
</script>

<style lang="less">
    .x-modal {
        padding: 0;
        min-width: var(--x-width);
        > .x-box {
            border: none;
            > .header {
                padding: 10px;
                border-bottom: 1px solid var(--x-primary);
                font-size: 1rem;
            }
            > .content {
                padding: var(--x-space);
            }
            > .footer {
                border-top: 1px solid var(--x-primary);
                > .x-button {
                    flex: 1;
                    margin: 0;
                    padding: 10px 0;
                    border: none;
                    border-radius: 0;
                    &.confirm {
                        color: var(--x-white);
                    }
                }
            }
        }
    }
</style>
