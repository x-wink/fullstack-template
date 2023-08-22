<template>
    <x-dialog v-model="visible" class="x-modal" show-modal>
        <div v-if="props.title" class="header">{{ props.title }}</div>
        <div class="content">
            <slot>{{ props.content }}</slot>
        </div>
        <div class="footer flex">
            <x-button v-if="props.showCancel" class="cancel" danger @click="handleClose">
                {{ props.cancelText }}
            </x-button>
            <x-button class="confirm" theme="primary" @click="handleConfirm">{{ props.confirmText }}</x-button>
        </div>
    </x-dialog>
</template>

<script setup lang="ts">
    import XDialog from './x-dialog.vue';
    import { XButton } from './';
    import { ref } from 'vue';
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
    const visible = ref(true);
    const handleClose = (reason: 'cancel' | 'confirm' = 'cancel') => {
        emits('close', reason);
    };
    const handleConfirm = () => {
        handleClose('confirm');
    };
</script>

<style lang="less">
    .x-modal {
        > .x-box {
            padding: 0;
            > .header {
                padding: 10px;
                border-bottom: 1px solid var(--x-primary);
                font-size: 1rem;
            }
            > .content {
                padding: 20px;
            }
            > .footer {
                border-top: 1px solid var(--x-primary);
                > .x-button {
                    flex: 1;
                    margin: 0;
                    padding: 10px 0;
                    border-radius: 0;
                    background: none;
                }
            }
        }
    }
</style>
