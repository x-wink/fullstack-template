import { type DynamicComponentInstance, createDynamicComponent } from './dynamic';
export const showModal = (props: {
    title?: string;
    content: string;
    showCancel?: boolean;
    cancelText?: string;
    confirmText?: string;
}) => {
    return new Promise<void>((resolve, reject) => {
        let instance: DynamicComponentInstance;
        createDynamicComponent(() => import('../components/modal/modal.vue'), {
            ...props,
            onClose(action: 'cancel' | 'confirm') {
                instance?.destroy();
                if (action === 'confirm') {
                    resolve();
                } else {
                    reject();
                }
            },
        }).then((res) => {
            instance = res;
        });
    });
};
export const showAlert = (content: string, title?: string, confirmText = '知道了') =>
    showModal({ title, content, confirmText });
export const showComfirm = (content: string, title?: string) => showModal({ title, content, showCancel: true });
