<template>
    <div class="x-markdown">
        <div class="html" v-html="content"></div>
    </div>
</template>

<script setup lang="ts">
    import { marked } from 'marked';
    defineOptions({
        name: 'XMarkdown',
    });
    const props = defineProps<{
        md: string;
    }>();
    const content = computed(() => marked(props.md, { mangle: false, headerIds: false }));
</script>

<style lang="less">
    .x-markdown {
        overflow: auto;
        .html {
            * {
                user-select: text;
            }
            > * {
                margin: 20px 0;
                line-height: 1.5em;
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
