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
    import { XIcon, icons } from '@pkgs/ui';
</script>

<style scoped lang="less">
    .container {
        ul {
            width: 100%;
            padding: 0;
            overflow: hidden auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
            grid-auto-rows: auto;
            grid-gap: var(--x-space-mini);

            li {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                padding: var(--x-space) 0;
                margin: 0;
                color: var(--x-white);
                background: var(--x-fade-white);
                border-radius: var(--x-border-radius);
                cursor: pointer;
                transition: all 0.3s;

                &:hover {
                    background: none;

                    .x-icon {
                        transform: scale(1.2);
                    }
                }

                .x-icon {
                    font-size: 32px;
                    margin: var(--x-space) 0;
                }

                p {
                    margin: 0;
                }
            }
        }
    }
</style>
