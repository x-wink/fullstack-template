<template>
    <XInput v-model="modelValue" class="x-input-number" type="number">
        <slot></slot>
    </XInput>
</template>

<script setup lang="ts">
    import { XInput } from '../';
    defineOptions({
        name: 'XInputNumber',
    });
    const modelValue = defineModel<number>({ required: true });
</script>
