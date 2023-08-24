<template>
    {{ md }}
    <XMarkdown :md="md" />
</template>
<script setup lang="ts">
    import { XMarkdown } from '@pkgs/ui';
    const md = `### 这是富文本渲染`;
</script>
<style scoped lang="less"></style>
