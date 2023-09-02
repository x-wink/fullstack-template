<template>
    <XBox class="x-input x-flex" v-bind="rootAttrs">
        <div v-if="hasPrefix" class="x-input__prefix">
            <slot name="prefix">
                {{ props.prefix }}
            </slot>
        </div>
        <div class="x-input__wrapper x-flex col-center">
            <input
                v-if="modelModifiers.lazy"
                ref="refsInput"
                v-model.lazy="modelValue"
                autocomplete="off"
                :class="{ '--controls': props.showControls }"
                v-bind="inputAttrs"
                @change="handleChange"
            />
            <input
                v-else
                ref="refsInput"
                v-model="modelValue"
                autocomplete="off"
                :class="{ '--controls': props.showControls }"
                v-bind="inputAttrs"
                @change="handleChange"
            />
            <XButton
                v-if="props.clearable && attrs.type !== 'number'"
                circle
                class="x-input__clear"
                :class="{ '--active': !!modelValue }"
                icon="Close"
                text
                theme="error"
                @click="handleClear"
            />
            <XButton
                v-if="isPassword && props.showPassword"
                circle
                class="x-input__show"
                :class="{ '--active': !!modelValue }"
                :icon="passwordVisible ? 'Hide' : 'View'"
                text
                theme="info"
                @click="handlePasswordVisible"
            />
        </div>
        <div v-if="hasSuffix" class="x-input__suffix">
            <slot name="suffix">
                {{ props.suffix }}
            </slot>
        </div>
    </XBox>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref, useAttrs, useSlots, watch } from 'vue';
    import { XBox, XButton } from '../';
    import { limitPrecision } from '../../utils';
    defineOptions({
        name: 'XInput',
        inheritAttrs: false,
    });
    const attrs = useAttrs();
    const rootAttrs = computed(() => {
        return {
            id: attrs.id,
            class: attrs.class,
            style: attrs.style,
        };
    });
    const inputAttrs = computed(() => {
        return {
            ...attrs,
            id: void 0,
            class: void 0,
            style: void 0,
            type: passwordVisible.value ? 'text' : ((attrs.type ?? 'text') as string),
            precision: props.precision,
        };
    });
    const props = withDefaults(
        defineProps<{
            clearable?: boolean;
            prefix?: string;
            suffix?: string;
            showPassword?: boolean;
            showControls?: boolean;
            stepStrictly?: number;
            precision?: number;
        }>(),
        {
            stepStrictly: 0,
            precision: 0,
        }
    );
    const slots = useSlots();
    const hasPrefix = computed(() => typeof props.prefix !== 'undefined' || slots.prefix);
    const hasSuffix = computed(() => typeof props.suffix !== 'undefined' || slots.suffix);

    const isPassword = computed(() => attrs.type === 'password');
    const passwordVisible = ref(false);
    const handlePasswordVisible = () => {
        passwordVisible.value = !passwordVisible.value;
    };

    const modelModifiers = computed(() => (attrs.modelModifiers ?? {}) as Record<'lazy' | 'number' | 'trim', boolean>);
    const modelValue = defineModel<string | number>({ required: true });

    const refsInput = ref<HTMLInputElement>();
    watch(
        modelValue,
        (value) => {
            const isNumber = modelModifiers.value.number || attrs.type === 'number';
            // 处理值类型
            if (!isNumber && typeof value === 'number') {
                value = String(value);
            } else if (isNumber && typeof value !== 'number') {
                value = Number(value);
            }
            // 处理长度限制，参考MDN文档，长度限制只对以下类型的输入框生效
            if (typeof value === 'string') {
                if (['text', 'search', 'url', 'tel', 'email', 'password'].includes((attrs.type as string) ?? 'text')) {
                    const max = Number(attrs.maxlength),
                        min = Number(attrs.minlength);
                    if (value.length > max) {
                        value = value.substring(0, max);
                    } else if (value.length < min) {
                        value = value.padEnd(min);
                    }
                }
            } else if (typeof value === 'number') {
                // 处理值范围，参考MDN文档，值范围只对以下类型的输入框生效
                if (
                    ['date', 'month', 'week', 'time', 'datetime-local', 'number', 'range'].includes(
                        attrs.type as string
                    )
                ) {
                    const max = Number(attrs.max),
                        min = Number(attrs.min);
                    if (value > max) {
                        value = max;
                    } else if (value < min) {
                        value = min;
                    }
                }
            }

            if (modelValue.value !== value) {
                modelValue.value = value;
            }
        },
        {
            immediate: true,
        }
    );
    const handleChange = () => {
        let value = modelValue.value;
        if (typeof value === 'number') {
            // 处理严格步进
            if (props.stepStrictly >= 0) {
                const mod = value % props.stepStrictly;
                if (mod) {
                    const offset = Math.round(mod / props.stepStrictly) * props.stepStrictly;
                    value = value - mod + offset;
                }
            }
            // 处理精度
            if (props.precision >= 0) {
                value = limitPrecision(value, props.precision);
                if (refsInput.value) {
                    refsInput.value.value = value.toFixed(props.precision);
                }
            }
        }
        if (modelValue.value !== value) {
            modelValue.value = value;
        }
    };
    onMounted(handleChange);

    const emits = defineEmits<{
        clear: [];
    }>();
    const handleClear = () => {
        modelValue.value = '';
        emits('clear');
    };

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
        width: fit-content;
        height: var(--x-height);
        color: fieldtext;
        background-color: field;

        &__prefix,
        &__suffix {
            .x-button {
                height: 100%;
                border-radius: 0;
            }
        }

        &__prefix {
            &:not(:has(.x-button)) {
                padding-left: var(--x-space-mini);
            }
        }

        &__suffix {
            &:not(:has(.x-button)) {
                padding-right: var(--x-space-mini);
            }
        }

        &__wrapper {
            overflow: hidden;
            height: 100%;
            width: var(--x-width);
            padding: 0 var(--x-space-mini);

            input {
                width: 100%;
                height: 100%;
                line-height: inherit;
                font-size: inherit;
                color: inherit;
                background-color: transparent;
                border: none;
                padding: 0;
                outline: none;

                &::-webkit-inner-spin-button,
                &::-webkit-outer-spin-button {
                    appearance: none;
                }

                &.--controls {
                    &::-webkit-inner-spin-button,
                    &::-webkit-outer-spin-button {
                        appearance: auto;
                    }
                }
            }

            .x-input__clear,
            .x-input__show {
                transform: scale(0) rotate(90deg);
                margin-left: -1em;
                padding: 1px;
                min-width: fit-content;
                min-height: fit-content;
            }
        }

        &:focus-within,
        &:hover {
            .x-input__clear,
            .x-input__show {
                &.--active {
                    transform: scale(1);
                    margin-left: var(--x-space-mini);
                }
            }
        }
    }
</style>
