<template>
    <router-view />
</template>

<script setup lang="ts"></script>

<style lang="less">
    #app {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: var(--fc);
        overflow: hidden;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --bgc: #fafafa;
        --bc: #1e1e1e33;
        --fc: #1e1e1e;
        --blue: #2a3b96;
        --dark-blue: #1b2854;
        --red: #bc2b28;

        --gap-mini: 10px;
        --gap-small: 14px;
        --gap: 17px;
        --gap-large: 20px;
        --gap-super: 30px;
        --border-radius: 5px;

        --van-primary-color: var(--blue) !important;
        --van-cell-background: #fafafa !important;
    }
</style>
