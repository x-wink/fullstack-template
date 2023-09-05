<template>
    <XBox class="x-input x-flex" :class="{ 'x-input-number': isNumber }" v-bind="rootAttrs">
        <div v-if="hasPrefix" class="x-input__prefix">
            <slot name="prefix">
                {{ props.prefix }}
            </slot>
        </div>
        <div v-if="props.showControls" class="x-input__prefix">
            <XButton icon="Minus" theme="primary" @click="handleStep(-1)" />
        </div>
        <div class="x-input__wrapper x-flex col-center">
            <input
                v-if="modelModifiers.lazy || isNumber"
                ref="refsInput"
                v-model.lazy="internalValue"
                autocomplete="off"
                v-bind="inputAttrs"
            />
            <input v-else ref="refsInput" v-model="internalValue" autocomplete="off" v-bind="inputAttrs" />
            <XButton
                v-if="props.clearable && !isNumber"
                circle
                class="x-input__clear"
                :class="{ '--active': !!internalValue }"
                icon="Close"
                text
                theme="error"
                @click="handleClear"
            />
            <XButton
                v-if="isPassword && props.showPassword"
                circle
                class="x-input__show"
                :class="{ '--active': !!internalValue }"
                :icon="passwordVisible ? 'Hide' : 'View'"
                text
                theme="info"
                @click="handlePasswordVisible"
            />
        </div>
        <div v-if="props.showControls" class="x-input__suffix">
            <XButton icon="Plus" theme="primary" @click="handleStep(1)" />
        </div>
        <div v-if="hasSuffix" class="x-input__suffix">
            <slot name="suffix">
                {{ props.suffix }}
            </slot>
        </div>
    </XBox>
</template>

<script setup lang="ts">
    import { computed, ref, useAttrs, useSlots, watch } from 'vue';
    import { XBox, XButton } from '../';
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
            type: isNumber.value ? 'number' : passwordVisible.value ? 'text' : ((attrs.type ?? 'text') as string),
            ...(isNumber.value
                ? {
                      step: step.value,
                      precision: props.precision,
                  }
                : {}),
        };
    });
    const props = withDefaults(
        defineProps<{
            clearable?: boolean;
            prefix?: string;
            suffix?: string;
            showPassword?: boolean;
            showControls?: boolean;
            stepStrictly?: boolean;
            precision?: number | string;
        }>(),
        {
            precision: 0,
        }
    );
    const slots = useSlots();
    const hasPrefix = computed(() => typeof props.prefix !== 'undefined' || slots.prefix);
    const hasSuffix = computed(() => typeof props.suffix !== 'undefined' || slots.suffix);
    const isPassword = computed(() => inputAttrs.value.type === 'password');
    const isNumber = computed(() => modelModifiers.value.number || attrs.type === 'number');

    const modelModifiers = computed(() => (attrs.modelModifiers ?? {}) as Record<'lazy' | 'number' | 'trim', boolean>);
    const step = computed(() => +((attrs.step as string) ?? 1));

    const passwordVisible = ref(false);
    const handlePasswordVisible = () => {
        passwordVisible.value = !passwordVisible.value;
    };

    const externalValue = defineModel<string | number>({ required: true });
    const internalValue = ref(String(externalValue.value));
    watch(externalValue, (value) => {
        internalValue.value = String(value);
    });
    watch(
        internalValue,
        (value) => {
            if (isNumber.value) {
                // 处理值范围
                const max = Number(attrs.max),
                    min = Number(attrs.min);
                if (+value > max) {
                    value = String(max);
                } else if (+value < min) {
                    value = String(min);
                }
                // 处理严格步进
                if (props.stepStrictly) {
                    const mod = +value % step.value;
                    if (mod) {
                        const offset = Math.round(mod / step.value) * step.value;
                        value = +value - mod + offset + '';
                    }
                }
                // 处理精度
                value = Number(value).toFixed(+props.precision);
            } else {
                // 处理长度范围
                const max = Number(attrs.maxlength),
                    min = Number(attrs.minlength);
                if (value.length > max) {
                    value = value.substring(0, max);
                } else if (value.length < min) {
                    value = value.padEnd(min);
                }
            }

            // 更新值
            if (internalValue.value !== value) {
                internalValue.value = value;
            }
            const emitValue = isNumber.value ? Number(value) : value;
            if (externalValue.value !== emitValue) {
                externalValue.value = emitValue;
            }
        },
        {
            immediate: true,
        }
    );

    const emits = defineEmits<{
        clear: [];
    }>();

    const handleStep = (direction: number) => {
        externalValue.value = +externalValue.value + step.value * direction;
    };

    const handleClear = () => {
        internalValue.value = '';
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
        width: fit-content;
        height: var(--x-height);
        color: fieldtext;
        background-color: field;

        &-number {
            text-align: center;

            .x-input__wrapper {
                width: var(--x-width-mini);
            }
        }

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
                text-align: inherit;
                background-color: transparent;
                border: none;
                padding: 0;
                outline: none;

                &::-webkit-inner-spin-button,
                &::-webkit-outer-spin-button {
                    appearance: none;
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
