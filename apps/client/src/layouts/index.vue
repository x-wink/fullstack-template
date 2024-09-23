<template>
    <div class="x-layout x-flex col">
        <main class="x-main">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </main>
    </div>
</template>

<script setup lang="ts">
    defineOptions({
        name: 'XLayout',
    });
</script>

<style lang="less">
    .x-layout {
        width: 100%;
        height: 100%;
        max-width: 450px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        background: var(--bgc);
        .x-main {
            flex: 1;
            overflow: hidden;
            > .container,
            > [class*='-container'] {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        }
    }
</style>
