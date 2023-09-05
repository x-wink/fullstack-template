<template>
    <XInputNumber v-model="value" show-controls step="10" />
</template>
<script setup lang="ts">
    import { XInputNumber } from '@pkgs/ui';
    import { ref } from 'vue';
    const value = ref(0);
</script>
<style scoped lang="less"></style>
