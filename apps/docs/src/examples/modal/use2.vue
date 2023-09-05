<template>
    <XModal v-model="visible" content="有取消按钮" :modal="false" show-cancel static />
</template>
<script setup lang="ts">
    import { XModal } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(true);
</script>
