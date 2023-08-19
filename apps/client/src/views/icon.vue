<template>
    <div class="container">
        <ul>
            <li v-for="(item, index) in icons" :key="index">
                <XIcon :name="item" />
                <p>{{ item }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { icons } from '@pkgs/ui';
</script>

<style scoped lang="less">
    .container {
        ul {
            overflow: auto;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: var(--x-space-mini);
            li {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                padding: var(--x-space) 0;
                color: var(--x-white);
                background: var(--x-fade-white);
                border-radius: var(--x-border-radius);
                cursor: pointer;

                &:hover {
                    background: none;
                    .x-icon {
                        transform: scale(1.2);
                    }
                }
                .x-icon {
                    font-size: 32px;
                    margin-bottom: var(--x-space);
                }
            }
        }
    }
</style>
