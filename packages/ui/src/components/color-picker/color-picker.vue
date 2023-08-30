<template>
    <div class="x-color-picker">
        <slot>
            <XColorBlock class="picked" :color="props.modelValue" />
        </slot>
        <div class="popover x-flex col">
            <div class="settings x-flex">
                <XColorSaturation v-model="color" :hue="hue" />
                <XColorHue v-model="hue" />
                <XColorOpacity v-model="alpha" :hue="hue" />
            </div>
            <div class="preview">
                <XColorPreview :color="color" />
            </div>
            <div class="value hex">
                {{ rgbaToHex(color) }}
            </div>
            <div class="value rgba">
                {{ `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { watch, ref } from 'vue';
    import XColorBlock from './block.vue';
    import XColorSaturation from './saturation.vue';
    import XColorHue from './hue.vue';
    import XColorOpacity from './opacity.vue';
    import XColorPreview from './preview.vue';
    import { parseCSSColor, rgbaToHex, RGB } from './utils';
    defineOptions({
        name: 'XColorPicker',
    });
    const props = withDefaults(
        defineProps<{
            modelValue?: string;
        }>(),
        {
            modelValue: 'transparent',
        }
    );
    const emits = defineEmits<{
        'update:modelValue': [value: string];
        change: [value: string, old: string];
    }>();
    const color = ref(parseCSSColor(props.modelValue));
    const alpha = ref(color.value.a);
    const hue = ref({ ...color.value, a: 1 } as RGB);
    watch(
        color,
        (value, old) => {
            emits('update:modelValue', rgbaToHex(value));
            emits('change', rgbaToHex(value), rgbaToHex(old));
        },
        { deep: true }
    );
    watch(alpha, (value) => {
        color.value.a = value;
    });
</script>

<style scoped lang="less">
    .x-color-picker {
        .picked {
            cursor: pointer;
        }
        .popover {
            width: 220px;
            padding: var(--x-space-small);
            background: var(--x-primary);
            border-radius: var(--x-border-radius);
            .settings {
                width: 100%;
                .x-color-saturation {
                    flex-grow: 1;
                }
                > * + * {
                    margin-left: var(--x-space-small);
                }
            }
            .preview {
                margin-top: var(--x-space-small);
            }
            .value {
                margin-top: var(--x-space-small);
            }
        }
    }
</style>
