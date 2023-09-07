<template>
    <Transition name="scrollbar-fade">
        <div
            v-show="horizontalVisible"
            class="x-scrollbar__bar"
            :class="props.vertical ? '--vertical' : '--horizontal'"
        >
            <div ref="refsThumb" class="x-scrollbar__thumb" :style="thumbStyle"></div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import { createDragableElement } from '../../utils';
    const props = defineProps<{
        size: number;
        position: number;
        visible: boolean;
        container?: HTMLElement;
        vertical?: boolean;
    }>();
    const thumbStyle = computed(() => {
        return {
            [props.vertical ? 'height' : 'width']: `${props.size * 100}%`,
            transform: `translate${props.vertical ? 'Y' : 'X'}(${props.position * 100}%)`,
        };
    });
    const actived = ref(false);
    let destroy: undefined | (() => void);
    const refsThumb = ref<HTMLElement>();
    watch(
        [() => props.container, refsThumb],
        ([container, el]) => {
            if (container && el) {
                destroy = createDragableElement(el, container, {
                    start: () => {
                        actived.value = true;
                    },
                    end: () => {
                        actived.value = false;
                    },
                    move: (x, y) => {
                        if (props.vertical) {
                            container.scrollTo(container.scrollLeft, y * container.scrollHeight);
                        } else {
                            container.scrollTo(x * container.scrollWidth, container.scrollTop);
                        }
                    },
                });
            } else {
                destroy?.();
                destroy = void 0;
            }
        },
        { immediate: true }
    );
    const horizontalVisible = computed(() => props.visible || actived.value);
</script>

<style lang="less">
    .x-scrollbar {
        &__bar {
            position: absolute;
            border-radius: var(--x-border-radius);
            &.--horizontal {
                width: 100%;
                height: var(--x-border-radius);
                bottom: var(--x-space-mini);
                left: 0;
            }
            &.--vertical {
                width: var(--x-border-radius);
                height: 100%;
                right: var(--x-space-mini);
                top: 0;
            }
        }
        &__thumb {
            width: 100%;
            height: 100%;
            border-radius: inherit;
            background-color: var(--x-primary);
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.3s;
            &:hover,
            &:active {
                opacity: 1;
            }
        }
        .scrollbar-fade {
            &-enter-active {
                transition: opacity 300ms ease-out;
            }

            &-leave-active {
                transition: opacity 150ms ease-out;
            }

            &-enter-from,
            &-leave-active {
                opacity: 0;
            }
        }
    }
</style>
