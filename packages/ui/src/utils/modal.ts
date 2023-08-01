import { createDynamicComponent } from './dynamicComponent';
import XModal from '../components/x-modal.vue';
export const showModal = (props: {
    title?: string;
    content: string;
    showCancel?: boolean;
    cancelText?: string;
    confirmText?: string;
}) => {
    return new Promise<void>((resolve, reject) => {
        const instance = createDynamicComponent(XModal, {
            ...props,
            onClose(action: 'cancel' | 'confirm') {
                instance.destroy();
                if (action === 'confirm') {
                    resolve();
                } else {
                    reject();
                }
            },
        });
    });
};
export const showAlert = (content: string, title?: string) => showModal({ title, content, confirmText: '知道了' });
export const showComfirm = (content: string, title?: string) => showModal({ title, content, showCancel: true });