<template>
    <XInput v-model="value" placeholder="请输入文本" />
</template>
<script setup lang="ts">
    import { XInput } from '@pkgs/ui';
    import { ref } from 'vue';
    const value = ref('');
</script>
