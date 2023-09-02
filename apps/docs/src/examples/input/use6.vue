<template>
    <p>v-model.lazy: {{ value1 }}</p>
    <XInput v-model.lazy="value1" clearable placeholder="input改为change" />
    <br />

    <p>v-model.number: {{ value2 * 2 }}</p>
    <XInput v-model.number="value2" clearable placeholder="返回number" />
    <br />

    <p>v-model.trim: "{{ value3 }}"</p>
    <XInput v-model.trim="value3" clearable placeholder="去除首尾空格" />
</template>
<script setup lang="ts">
    import { XInput } from '@pkgs/ui';
    import { ref } from 'vue';
    const value1 = ref('');
    const value2 = ref(0);
    const value3 = ref('');
</script>
