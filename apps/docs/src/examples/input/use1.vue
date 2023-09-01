<template>
    <XInput v-model="value" />
</template>
<script setup lang="ts">
    import { XInput } from '@pkgs/ui';
    import { ref } from 'vue';
    const value = ref('');
</script>
