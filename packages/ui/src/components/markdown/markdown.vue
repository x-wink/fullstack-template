<template>
    <div class="x-markdown">
        <div class="html" v-html="content"></div>
    </div>
</template>

<script setup lang="ts">
    import { marked } from 'marked';
    import { computed } from 'vue';
    defineOptions({
        name: 'XMarkdown',
    });
    const props = defineProps<{
        md: string;
    }>();
    const content = computed(() =>
        marked(props.md, { mangle: false, headerIds: false }).replace(/<a href="/g, '<a target="_blank" href="')
    );
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
                line-height: 2;
            }
            hr {
                border-color: var(--x-primary);
            }
            code {
                font-family: 'Courier New', Courier, monospace;
                background-color: rgba(255, 255, 255, 0.2);
                display: inline-block;
                margin: 0 5px;
                padding: 0 5px;
                border-radius: 5px;
                line-height: 1.3;
            }
            a {
                border-bottom: 2px dashed var(--x-primary);
                padding-bottom: 3px;
                text-decoration: none;
                font-size: 0.8em;
                &::before {
                    content: '>';
                }
                &::after {
                    content: '<';
                }
                &::before,
                &::after {
                    display: inline-block;
                    color: var(--x-primary);
                    padding: 0 3px;
                }
                &:hover {
                    border-bottom-style: solid;
                    &::before,
                    &::after {
                        transform: scale(1.5);
                    }
                }
            }
            ul,
            ol {
                li {
                    + li {
                        margin-top: 20px;
                    }
                }
            }
            input[type='checkbox'] {
                vertical-align: middle;
                width: 1.5em;
                height: 1.5em;
                margin-right: 5px;
                visibility: hidden;
                &::after {
                    content: '';
                    display: block;
                    width: 100%;
                    height: 100%;
                    background-color: #0f03;
                    border: 1px solid var(--x-primary);
                    border-radius: 5px;
                    font-size: 1.2em;
                    font-weight: bolder;
                    line-height: 1.2;
                    font-family: '微软雅黑';
                    text-align: center;
                    visibility: visible;
                }
                &:checked {
                    &::after {
                        content: '√';
                        color: var(--x-primary);
                    }
                }
            }
        }
    }
</style>
