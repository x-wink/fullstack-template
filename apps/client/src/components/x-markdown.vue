<template>
    <div class="markdown-container">
        <div class="html" v-html="content"></div>
    </div>
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
        :deep(.html) {
            overflow: auto;
            * {
                user-select: text;
            }
            > * {
                margin: 20px 0;
                line-height: 2.5em;
            }
            hr {
                border-color: var(--primary);
            }
            code {
                font-family: 'Courier New', Courier, monospace;
                background-color: rgba(255, 255, 255, 0.2);
                display: inline-block;
                margin: 0 7px;
                padding: 3px 7px;
                border-radius: 5px;
            }
        }
    }
</style>
