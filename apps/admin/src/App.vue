<template>
    <router-view />
</template>

<script setup lang="ts"></script>

<style lang="less">
    html,
    body,
    #app {
        width: 100vw;
        height: 100vh;
        min-width: 1200px;
        background: #1a2956;
        color: #e1e1e1;
        font-size: 16px;
        word-break: break-all;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --bgc: #e1e1e108;
        --bgc-hover: #1e1e1e66;
        --bc: #e1e1e133;
        --fc: #e1e1e1;

        --gap-mini: 3px;
        --gap-small: 5px;
        --gap: 10px;
        --gap-large: 20px;
        --gap-super: 30px;
        --border-radius: 5px;
    }
</style>
