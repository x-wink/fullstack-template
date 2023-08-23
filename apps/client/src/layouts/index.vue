<template>
    <x-rain background />
    <x-box class="layout flex col">
        <Header />
        <main class="main">
            <Aside>
                <Suspense>
                    <router-view name="aside" />
                </Suspense>
            </Aside>
            <Content>
                <Suspense>
                    <router-view />
                </Suspense>
            </Content>
        </main>
        <Footer />
    </x-box>
</template>

<script setup lang="ts">
    import Header from './header.vue';
    import Aside from './aside.vue';
    import Footer from './footer.vue';
    import Content from './content.vue';
</script>

<style scoped lang="less">
    .x-code-rain {
        font-size: 2rem;
        color: var(--x-primary);
    }
    .layout {
        perspective: none;
        width: 90%;
        height: calc(98% - 20px);
        max-width: 1200px;
        background: none;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        > .main {
            flex: 1;
            display: flex;
            overflow: hidden;
        }
    }
</style>
