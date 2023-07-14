import { createVNode, render, type Component, type VNode } from 'vue';
export interface DynamicComponentInstance {
    vnode: VNode;
    destroy: () => void;
}
export const createDynamicComponent = (
    component: Component,
    props: Object,
    container?: HTMLElement,
    nativeProps?: Partial<Pick<HTMLElement, 'className' | 'id' | 'style'>>
): DynamicComponentInstance => {
    if (!container) {
        if (nativeProps?.id) {
            document.getElementById(nativeProps.id)?.remove();
        }
        container = document.createElement('div');
        container.className = '__dynamic_component__container';
        Object.assign(container, nativeProps);
        document.body.appendChild(container);
    }
    const vnode = createVNode(component, {
        ...props,
    });
    render(vnode, container);
    const destroy = () => {
        vnode.el?.remove();
        render(null, container as HTMLElement);
        container?.remove();
    };
    return { vnode, destroy };
};
