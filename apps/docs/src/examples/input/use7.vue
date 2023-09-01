<template>
    <XInput v-model="value1" clearable placeholder="请输入密码" type="password" />
    <br />
    <XInput v-model.number="value2" clearable placeholder="可切换显示密码" show-password type="password" />
</template>
<script setup lang="ts">
    import { XInput } from '@pkgs/ui';
    import { ref } from 'vue';
    const value1 = ref('');
    const value2 = ref('');
</script>
