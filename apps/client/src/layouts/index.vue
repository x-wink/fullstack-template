<template>
    <CodeRain background style="font-size: 2rem" />
    <section class="layout flex col">
        <Header />
        <main class="main">
            <Aside />
            <Content />
        </main>
        <Footer />
    </section>
</template>

<script setup lang="ts">
    import Header from './header.vue';
    import Aside from './aside.vue';
    import Footer from './footer.vue';
    import Content from './content.vue';
</script>

<style scoped lang="less">
    @keyframes shake {
        form {
            box-shadow: 0 0 30px #00ff00ff;
        }
        to {
            box-shadow: 0 0 0px #00ff0000;
        }
    }
    .layout {
        width: 90%;
        height: calc(98% - 20px);
        max-width: 1200px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border: 2px solid rgba(0, 255, 0, 0.8);
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.8);
        overflow: hidden;
        box-shadow: 0 0 15px #0f0;
        animation: shake 1s ease-in-out 0s infinite alternate-reverse;
        > .main {
            flex: 1;
            display: flex;
            overflow: hidden;
        }
    }
</style>
