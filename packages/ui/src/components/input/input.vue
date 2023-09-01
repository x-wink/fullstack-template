<template>
    <XBox :id="props.id" class="x-input" :class="props.class" :style="props.style">
        <div class="x-input__wrapper x-flex col-center">
            <input ref="refsInput" v-model="modelValue" type="text" v-bind="attrs" />
            <XButton
                v-if="props.clearable"
                circle
                class="x-input__clear"
                :class="{ '--active': !!modelValue }"
                icon="Close"
                text
                theme="error"
                @click="handleClear"
            />
        </div>
    </XBox>
</template>

<script setup lang="ts">
    import { useAttrs, StyleValue, watch, ref } from 'vue';
    import { XBox, XButton } from '../';
    defineOptions({
        name: 'XInput',
        inheritAttrs: false,
    });
    const attrs = useAttrs();
    const props = withDefaults(
        defineProps<{
            clearable?: boolean;
            id?: string;
            class?: any;
            style?: StyleValue;
        }>(),
        {}
    );
    const modelValue = defineModel<string>({ required: true });
    watch(
        modelValue,
        (value) => {
            const max = Number(attrs.maxlength),
                min = Number(attrs.minlength);
            if (!Number.isNaN(max) && value.length > max) {
                modelValue.value = value.substring(0, max);
            } else if (!Number.isNaN(min) && value.length < min) {
                modelValue.value = value.padEnd(min);
            }
        },
        {
            immediate: true,
        }
    );

    const emits = defineEmits<{
        clear: [];
    }>();
    const handleClear = () => {
        modelValue.value = '';
        emits('clear');
    };

    const refsInput = ref<HTMLInputElement>();
    defineExpose({
        focus: () => {
            refsInput.value?.focus();
        },
        blur: () => {
            refsInput.value?.blur();
        },
    });
</script>

<style lang="less">
    .x-input {
        width: var(--x-width);
        &__wrapper {
            overflow: hidden;
            padding: 0 var(--x-space-mini);
            input {
                width: 100%;
                height: var(--x-height);
                line-height: var(--x-height);
                flex-shrink: 1;
            }
            .x-input__clear {
                transform: scale(0) rotate(90deg);
                margin-left: -1em;
                padding: 1px;
                min-width: fit-content;
                min-height: fit-content;
            }
        }
        &:focus-within,
        &:hover {
            .x-input__clear {
                &.--active {
                    transform: scale(1);
                    margin-left: var(--x-space-mini);
                }
            }
        }
    }
</style>
