<template>
    <!-- <XRain background /> -->
    <XBox class="layout mobile x-flex col">
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
    </XBox>
</template>

<script setup lang="ts">
    import Header from './header.vue';
    import Aside from './aside.vue';
    import Footer from './footer.vue';
    import Content from './content.vue';
    document.title = '汗流浃背了吧老弟';
</script>

<style scoped lang="less">
    .layout.mobile {
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
    }
</style>
