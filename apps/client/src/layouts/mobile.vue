<template>
    <!-- <XRain background /> -->
    <XBox class="layout mobile flex col">
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
</script>

<style scoped lang="less"></style>
