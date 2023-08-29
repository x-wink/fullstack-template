<template>
    <dialog ref="popover" class="x-popover" :class="classList" :style="popoverStyle">
        <slot></slot>
    </dialog>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
    import { PopoverPlacement } from './types';
    defineOptions({
        name: 'XPopover',
    });
    const props = withDefaults(
        defineProps<{
            modelValue?: boolean;
            static?: boolean;
            modal?: boolean;
            arrow?: boolean;
            placement?: PopoverPlacement;
            offset?: [number, number];
            position?: [number, number];
        }>(),
        {
            modelValue: true,
            placement: 'bottom',
            offset: () => [0, 0],
            position: () => [0, 0],
        }
    );
    const classList = computed(() => {
        return {
            '--static': props.static,
            '--arrow': props.arrow,
            [`--arrow-${props.placement?.split('-')[1] ?? 'center'}`]: props.arrow,
            [`--placement-${props.placement?.split('-')[0]}`]: true,
        };
    });
    const popoverStyle = computed(() => {
        return props.static
            ? {}
            : {
                  left: props.position[0] + 'px',
                  top: props.position[1] + 'px',
                  transform: `translate(${props.offset[0]}px, ${props.offset[1]}px)`,
              };
    });

    const popover = ref<HTMLDialogElement>();
    const emits = defineEmits<{
        'update:modelValue': [value: boolean];
        open: [];
        close: [];
        change: [visible: boolean];
    }>();

    const handleOpen = () => {
        emits('update:modelValue', true);
    };
    const handleClose = () => {
        emits('update:modelValue', false);
    };
    const handleToggle = () => {
        emits('update:modelValue', !props.modelValue);
    };
    onMounted(() => {
        popover.value!.addEventListener('close', handleClose);
        watch(
            () => props.modelValue,
            (visible) => {
                visible ? emits('open') : emits('close');
                emits('change', visible);
                if (popover.value) {
                    if (visible) {
                        const show = props.modal && !props.static ? popover.value.showModal : popover.value.show;
                        show.call(popover.value);
                    } else {
                        popover.value.close();
                    }
                }
            },
            {
                immediate: true,
            }
        );
    });
    onUnmounted(() => {
        popover.value?.removeEventListener('close', handleClose);
    });

    defineExpose({
        open: handleOpen,
        close: handleClose,
        toggle: handleToggle,
    });
</script>

<style lang="less">
    .x-popover {
        border: none;
        border-radius: var(--x-border-radius);
        outline: none;
        background: none;
        color: white;
        position: fixed;

        &.--static {
            position: relative;
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
