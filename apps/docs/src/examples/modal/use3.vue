<template>
    <XModal v-model="visible" content="有标题栏" :modal="false" show-cancel static title="操作提示" />
</template>
<script setup lang="ts">
    import { XModal } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(true);
</script>
