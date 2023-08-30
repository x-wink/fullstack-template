<template>
    <XPopup
        v-model="visible"
        arrow
        class="x-popover"
        v-bind="attrs"
        close-on-click-outside
        :target="refsTarget"
        @mouseenter="handleEnterPopover"
        @mouseleave="handleLeavePopover"
    >
        <slot>弹出层</slot>
    </XPopup>
    <div ref="refsTarget" class="x-popover-target" v-on="triggerEvent">
        <slot name="target"></slot>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, useAttrs, watch } from 'vue';
    import { XPopup } from '../popup';
    import { PopoverTrigger } from './types';
    import { debounce } from '../../utils';
    defineOptions({
        name: 'XPopover',
        inheritAttrs: false,
    });
    const attrs = useAttrs();
    const props = withDefaults(
        defineProps<{
            modelValue?: boolean;
            trigger?: PopoverTrigger;
            dalay?: number;
        }>(),
        {
            modelValue: false,
            trigger: 'hover',
            dalay: 100,
        }
    );
    const emits = defineEmits<{
        'update:modelValue': [value: boolean];
    }>();

    const visible = ref(props.modelValue);
    watch(visible, (value) => {
        emits('update:modelValue', value);
    });

    const refsTarget = ref<HTMLDivElement>();

    const active = ref(false);
    const triggerEvent = computed(() => {
        return props.trigger === 'click'
            ? {
                  click: handleActive,
              }
            : props.trigger === 'hover'
            ? {
                  mouseenter: handleActive,
                  mouseleave: handleClose,
              }
            : {
                  foucs: handleActive,
                  blur: handleClose,
              };
    });
    const handleActive = () => {
        active.value = true;
        visible.value = true;
    };
    const handleInactive = () => {
        active.value = false;
        if (!inPopover.value && !active.value) {
            visible.value = false;
        }
    };
    const handleClose = debounce(handleInactive, props.dalay);

    const inPopover = ref(false);
    const handleEnterPopover = () => {
        inPopover.value = true;
    };
    const handleLeavePopover = () => {
        inPopover.value = false;
        if (props.trigger === 'hover') {
            handleInactive();
        }
    };
</script>

<style scoped lang="less">
    .x-popover {
        &-target {
            cursor: pointer;
            width: fit-content;
        }
    }
</style>
