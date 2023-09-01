<template>
    <XInput v-model="value1" clearable prefix="https://" suffix="/README.md" />
    <br />
    <XInput v-model="value2">
        <template #prefix>￥</template>
        <template #suffix><XIcon name="Logo" /></template>
    </XInput>
</template>
<script setup lang="ts">
    import { XInput, XIcon } from '@pkgs/ui';
    import { ref } from 'vue';
    const value1 = ref('');
    const value2 = ref('');
</script>
