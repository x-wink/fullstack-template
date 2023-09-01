<template>
    v-model.lazy: {{ value1 }}
    <XInput v-model.lazy="value1" clearable placeholder="input改为change" />
    <br />
    v-model.number: {{ value2 * 2 }}
    <XInput v-model.number="value2" placeholder="返回number" />
    <br />
    v-model.trim: "{{ value3 }}"
    <XInput v-model.trim="value3" placeholder="去除首尾空格" />
</template>
<script setup lang="ts">
    import { XInput } from '@pkgs/ui';
    import { ref } from 'vue';
    const value1 = ref('');
    const value2 = ref();
    const value3 = ref('');
</script>
