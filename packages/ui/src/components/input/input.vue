<template>
    <XBox class="x-input x-flex" v-bind="rootAttrs">
        <div v-if="hasPrefix" class="x-input__prefix">
            <slot name="prefix">
                {{ props.prefix }}
            </slot>
        </div>
        <div class="x-input__wrapper x-flex col-center">
            <input v-if="modelModifiers.lazy" ref="refsInput" v-model.lazy="modelValue" v-bind="inputAttrs" />
            <input v-else-if="modelModifiers.number" ref="refsInput" v-model.number="modelValue" v-bind="inputAttrs" />
            <input v-else-if="modelModifiers.trim" ref="refsInput" v-model.trim="modelValue" v-bind="inputAttrs" />
            <input v-else ref="refsInput" v-model="modelValue" v-bind="inputAttrs" />
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
    import { useAttrs, watch, ref, computed, useSlots } from 'vue';
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
            type: passwordVisible.value ? 'text' : ((attrs.type ?? 'text') as string),
        };
    });
    const props = withDefaults(
        defineProps<{
            clearable?: boolean;
            prefix?: string;
            suffix?: string;
            showPassword?: boolean;
        }>(),
        {}
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
    const modelValue = defineModel<string | number>({ required: true, local: true });
    watch(
        modelValue,
        (value) => {
            const isNumber = typeof value === 'number';
            value = String(value);
            const max = Number(attrs.maxlength),
                min = Number(attrs.minlength);
            if (!Number.isNaN(max) && value.length > max) {
                value = value.substring(0, max);
            } else if (!Number.isNaN(min) && value.length < min) {
                value = value.padEnd(min, isNumber ? '0' : ' ');
            } else {
                return;
            }
            modelValue.value = isNumber ? +value : value;
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
        width: fit-content;
        height: var(--x-height);
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
                flex-shrink: 1;
                font-size: inherit;
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
