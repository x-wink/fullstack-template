import { createVNode, render, type Component, type VNode, type DefineComponent } from 'vue';
export interface DynamicComponentInstance {
    vnode: VNode;
    destroy: () => void;
}
export const createDynamicComponent = async (
    importer: () => Promise<{ default: Component | DefineComponent }>,
    props: Object,
    container?: HTMLElement,
    nativeProps?: Partial<Pick<HTMLElement, 'className' | 'id' | 'style'>>
): Promise<DynamicComponentInstance> => {
    if (!container) {
        if (nativeProps?.id) {
            document.getElementById(nativeProps.id)?.remove();
        }
        container = document.createElement('div');
        container.className = '__dynamic_component__container';
        Object.assign(container, nativeProps);
        document.body.appendChild(container);
    }
    const { default: component } = await importer();
    const vnode = createVNode(component, {
        ...props,
    });
    render(vnode, container);
    const destroy = () => {
        vnode.el?.remove();
        render(null, container!);
        container?.remove();
    };
    return { vnode, destroy };
};
