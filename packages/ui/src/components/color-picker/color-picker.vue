<template>
    <div class="x-color-picker">
        <XPopover trigger="hover">
            <div class="x-color-picker__popup x-flex col">
                <div class="x-color-picker__settings x-flex">
                    <XColorSaturation v-model="color" :hue="hue" />
                    <XColorHue v-model="hue" />
                    <XColorOpacity v-model="alpha" :hue="hue" />
                </div>
                <XColorPreview class="x-color-picker__preview" :color="color" />
                <div class="x-color-picker__value hex">
                    <input v-model.lazy="fmtColor" />
                </div>
            </div>
            <template #target>
                <slot>
                    <XColorBlock class="x-color-picker__picked" :color="modelValue" />
                </slot>
            </template>
        </XPopover>
    </div>
</template>

<script setup lang="ts">
    import { watch, ref, computed } from 'vue';
    import { ColorPickerFormat, XPopover } from '../';
    import XColorBlock from './block.vue';
    import XColorSaturation from './saturation.vue';
    import XColorHue from './hue.vue';
    import XColorOpacity from './opacity.vue';
    import XColorPreview from './preview.vue';
    import { parseColor, rgba2Hex, RGB, RGBA, rgba2String } from '../../utils';
    defineOptions({
        name: 'XColorPicker',
    });
    const props = withDefaults(
        defineProps<{
            format?: ColorPickerFormat;
        }>(),
        {
            format: 'hex',
        }
    );
    const emits = defineEmits<{
        change: [value: string, old: string];
    }>();

    const modelValue = defineModel<string>({ required: true });

    const color = ref(parseColor(modelValue.value));
    const hue = ref({ ...color.value, a: 1 } as RGB);
    const alpha = ref(color.value.a);
    watch(alpha, (value) => {
        color.value.a = value;
    });

    const handleFormat = (color: RGBA) => {
        let fmt = props.format;
        if (fmt === 'hex') {
            fmt = rgba2Hex;
        } else if (fmt === 'rgba') {
            fmt = rgba2String;
        }
        return fmt(color);
    };
    const fmtColor = computed({
        get: () => handleFormat(color.value),
        set: (value) => (color.value = parseColor(value)),
    });

    watch(fmtColor, (value, old) => {
        modelValue.value = value;
        emits('change', value, old);
    });
</script>

<style lang="less">
    .x-color-picker {
        &__picked {
            cursor: pointer;
        }
        &__popup {
            width: var(--x-width);
            background: var(--x-primary);
            border-radius: var(--x-border-radius);
        }
        &__settings {
            width: 100%;
            .x-color-saturation {
                flex-grow: 1;
            }
            > * + * {
                margin-left: var(--x-space-small);
            }
        }
        &__preview {
            margin-top: var(--x-space-small);
        }
        &__value {
            margin-top: var(--x-space-small);
        }
    }
</style>
