<template>
    <XInput v-model="value1" maxlength="10" placeholder="最大长度为10" />
    <br />
    <XInput v-model="value2" minlength="3" />
</template>
<script setup lang="ts">
    import { XInput } from '@pkgs/ui';
    import { ref } from 'vue';
    const value1 = ref('');
    const value2 = ref('最小长度为3，不足后面补空格');
</script>
