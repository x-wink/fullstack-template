<template>
    <Teleport :disabled="props.static" to="body">
        <dialog v-bind="attrs" ref="popup" class="x-popup" :class="classList" :style="popupStyle">
            <slot></slot>
        </dialog>
    </Teleport>
</template>

<script setup lang="ts">
    import { computed, onMounted, onUnmounted, ref, useAttrs, watch } from 'vue';
    import { isClientSide, useClickOutside } from '../../utils';
    import { PopupPlacement } from './types';
    defineOptions({
        name: 'XPopup',
        inheritAttrs: false,
    });
    const attrs = useAttrs();
    const props = withDefaults(
        defineProps<{
            static?: boolean;
            modal?: boolean;
            arrow?: boolean;
            placement?: PopupPlacement;
            offset?: [number, number];
            position?: [number, number];
            target?: HTMLElement;
            closeOnClickOutside?: boolean;
        }>(),
        {
            placement: 'bottom',
            offset: () => [0, 0],
            position: () => [0, 0],
        }
    );
    const classList = computed(() => {
        return {
            '--static': props.static,
            '--relative': !!props.target,
            '--arrow': props.arrow,
            [`--arrow-${props.placement?.split('-')[1] ?? 'center'}`]: props.arrow,
            [`--placement-${props.placement?.split('-')[0]}`]: true,
        };
    });
    const popupStyle = computed(() => {
        return props.static
            ? {}
            : {
                  left: pos.value[0] + 'px',
                  top: pos.value[1] + 'px',
                  transform: `translate(${props.offset[0]}px, ${props.offset[1]}px)`,
              };
    });

    const popup = ref<HTMLDialogElement>();
    const emits = defineEmits<{
        clickOutside: [];
        open: [];
        close: [];
        change: [visible: boolean];
    }>();

    const visible = defineModel<boolean>({ required: true, default: false, local: true });
    watch(visible, (value) => {
        value ? emits('open') : emits('close');
        emits('change', value);
    });

    const handleOpen = () => {
        visible.value = true;
    };
    const handleClose = () => {
        visible.value = false;
    };
    const handleToggle = () => {
        visible.value = !visible.value;
        return visible.value;
    };

    const pos = ref(props.position);
    const calculatePopupPosition = (
        el: HTMLElement,
        target: HTMLElement,
        placement: PopupPlacement
    ): [number, number] => {
        const targetRect = target.getBoundingClientRect();
        const { width: targetWidth, height: targetHeight } = targetRect;

        const width = el.offsetWidth;
        const height = el.offsetHeight;

        let left = targetRect.left + window.scrollX;
        let top = targetRect.top + window.scrollY;

        const [targetDir, popupDir = 'center'] = placement.split('-');

        let vertical = false;
        const arrowSize = props.arrow ? 10 : 0;
        switch (targetDir) {
            case 'top':
                top -= height + arrowSize;
                vertical = true;
                break;
            case 'right':
                left += targetWidth + arrowSize;
                break;
            default:
            case 'bottom':
                top += targetHeight + arrowSize;
                vertical = true;
                break;
            case 'left':
                left -= width + arrowSize;
                break;
        }

        switch (popupDir) {
            case 'top':
                break;
            case 'right':
                left += targetWidth - arrowSize * 2;
                break;
            case 'bottom':
                top += targetHeight - height;
                break;
            case 'left':
                left -= width - arrowSize * 2;
                break;
            default:
            case 'center':
                if (vertical) {
                    left += (targetWidth - width) / 2;
                } else {
                    top += (targetHeight - height) / 2;
                }
                break;
        }

        left = Math.max(0, Math.min(document.body.offsetWidth - width, left));
        top = Math.max(0, Math.min(document.body.offsetHeight - height, top));

        return [left, top];
    };
    const updatePosition = () => {
        if (props.target && popup.value) {
            pos.value = calculatePopupPosition(popup.value, props.target, props.placement);
        }
        requestAnimationFrame(updatePosition);
    };
    isClientSide && requestAnimationFrame(updatePosition);

    const { observe, unobserve } = useClickOutside(() => {
        emits('clickOutside');
        props.closeOnClickOutside && handleClose();
    });
    watch(
        [visible, popup],
        ([visible, el]) => {
            if (el) {
                if (visible) {
                    const show = props.modal && !props.static ? el.showModal : el.show;
                    show.call(el);
                    setTimeout(() => {
                        observe(() => el);
                    }, 100);
                } else {
                    el.close();
                    unobserve(() => el);
                }
            }
        },
        {
            immediate: true,
        }
    );
    onMounted(() => {
        popup.value!.addEventListener('close', handleClose);
    });
    onUnmounted(() => {
        popup.value?.removeEventListener('close', handleClose);
    });

    defineExpose({
        open: handleOpen,
        close: handleClose,
        toggle: handleToggle,
    });
</script>

<style lang="less">
    .x-popup {
        border: none;
        border-radius: var(--x-border-radius);
        outline: none;
        position: fixed;
        z-index: 9999;
        transition: left 0s, top 0s;
        color: var(--x-white);
        background: var(--x-primary);
        padding: var(--x-space-small);

        &.--relative {
            position: absolute;
        }
        &.--static {
            position: relative;
            z-index: unset;
        }

        &::backdrop {
            background: #000a;
        }

        &.--arrow {
            &::before {
                content: '';
                display: block;
                width: var(--x-space-small);
                height: var(--x-space-small);
                background: inherit;
                position: absolute;
                z-index: -1;
            }

            &.--placement-top,
            &.--placement-bottom {
                &.--arrow-center::before {
                    left: 0;
                    right: 0;
                    margin: auto;
                }

                &.--arrow-left::before {
                    right: var(--x-space-small);
                }

                &.--arrow-right::before {
                    left: var(--x-space-small);
                }
            }

            &.--placement-left,
            &.--placement-right {
                &.--arrow-center::before {
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }

                &.--arrow-bottom::before {
                    top: var(--x-space-small);
                }

                &.--arrow-top::before {
                    bottom: var(--x-space-small);
                }
            }

            &.--placement-top {
                &::before {
                    bottom: 0;
                    transform: translateY(50%) rotate(45deg);
                }
            }

            &.--placement-right {
                &::before {
                    left: 0;
                    transform: translateX(-50%) rotate(45deg);
                }
            }

            &.--placement-bottom {
                &::before {
                    top: 0;
                    transform: translateY(-50%) rotate(45deg);
                }
            }

            &.--placement-left {
                &::before {
                    right: 0;
                    transform: translateX(50%) rotate(45deg);
                }
            }
        }
    }
</style>
