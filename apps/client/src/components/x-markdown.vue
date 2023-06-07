<template>
    <div class="markdown-container" v-html="content"></div>
</template>

<script setup lang="ts">
    import { marked } from 'marked';
    const props = defineProps<{
        md: string;
    }>();
    const content = computed(() => marked(props.md));
</script>

<style scoped lang="less">
    .markdown-container {
        display: block !important;
        width: fit-content !important;
        height: fit-content !important;
        margin: auto;
    }
</style>
