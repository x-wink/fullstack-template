<template>
    <div class="x-scrollbar" :style="scrollbarStyle" @mousewheel="handleWheel">
        <div ref="refsContainer" class="x-scrollbar__container" @scroll="handleScroll">
            <div ref="refsWrapper" class="x-scrollbar__wrapper">
                <slot></slot>
            </div>
        </div>
        <div v-show="horizontalVisible" class="x-scrollbar__bar horizontal">
            <div class="x-scrollbar__thumb" :style="horizontalThumbStyle"></div>
        </div>
        <div v-show="verticalVisible" class="x-scrollbar__bar vertical">
            <div class="x-scrollbar__thumb" :style="verticalThumbStyle"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';

    defineOptions({
        name: 'XScrollbar',
    });
    const props = withDefaults(
        defineProps<{
            width?: string;
            height?: string;
            maxWidth?: string;
            maxHeight?: string;
        }>(),
        {
            width: 'auto',
            height: 'auto',
        }
    );
    const scrollbarStyle = computed(() => {
        return {
            width: props.width,
            height: props.height,
            maxWidth: props.maxWidth,
            maxHeight: props.maxHeight,
        };
    });

    const refsContainer = ref<HTMLDivElement>();
    const refsWrapper = ref<HTMLDivElement>();

    const horizontalVisible = ref(false);
    const horizontalThumb = reactive({
        size: 0,
        position: 0,
    });
    const horizontalThumbStyle = computed(() => {
        return {
            width: `${horizontalThumb.size * 100}%`,
            transform: `translateX(${horizontalThumb.position * 100}%)`,
        };
    });

    const verticalVisible = ref(false);
    const verticalThumb = reactive({
        size: 0,
        position: 0,
    });
    const verticalThumbStyle = computed(() => {
        return {
            height: `${verticalThumb.size * 100}%`,
            transform: `translateY(${verticalThumb.position * 100}%)`,
        };
    });

    const update = () => {
        console.info('update');
        const { offsetHeight, scrollHeight, offsetWidth, scrollWidth } = refsContainer.value!;
        horizontalVisible.value = offsetWidth < scrollWidth;
        horizontalThumb.size = Math.max(0.1, offsetWidth / scrollWidth);
        verticalVisible.value = offsetHeight < scrollHeight;
        verticalThumb.size = Math.max(0.1, offsetHeight / scrollHeight);
    };

    const handleWheel = (e: WheelEvent) => {
        if (verticalVisible.value || horizontalVisible.value) {
            e.preventDefault();
            if (verticalVisible.value) {
                refsContainer.value?.scrollBy(0, e.deltaY);
            } else if (horizontalVisible.value) {
                refsContainer.value?.scrollBy(e.deltaY, 0);
            }
        }
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, offsetHeight, scrollLeft, scrollWidth, offsetWidth } = refsContainer.value!;
        horizontalThumb.position =
            ((scrollLeft / (scrollWidth - offsetWidth)) * (1 - horizontalThumb.size)) / horizontalThumb.size;
        verticalThumb.position =
            ((scrollTop / (scrollHeight - offsetHeight)) * (1 - verticalThumb.size)) / verticalThumb.size;
    };

    let ro: ResizeObserver;
    onMounted(() => {
        update();
        ro = new ResizeObserver(update);
        ro.observe(refsContainer.value!);
        ro.observe(refsWrapper.value!);
    });
    onUnmounted(() => {
        ro.disconnect();
    });
</script>

<style lang="less">
    .x-scrollbar {
        position: relative;
        overflow: hidden;
        &__container {
            max-width: inherit;
            max-height: inherit;
            width: 100%;
            height: 100%;
            overflow: auto;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        &__wrapper {
            min-width: 100%;
            min-height: 100%;
            width: fit-content;
            height: fit-content;
        }
        &__bar {
            position: absolute;
            border-radius: var(--x-border-radius);
            &.horizontal {
                width: 100%;
                height: var(--x-border-radius);
                bottom: var(--x-space-mini);
                left: 0;
            }
            &.vertical {
                width: var(--x-border-radius);
                height: 100%;
                right: var(--x-space-mini);
                top: 0;
            }
        }
        &__thumb {
            cursor: pointer;
            border-radius: inherit;
            background: var(--x-primary);
            width: 100%;
            height: 100%;
        }
    }
</style>
