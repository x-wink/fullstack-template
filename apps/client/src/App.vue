<template>
    <Layout />
</template>

<script setup lang="ts">
    import Layout from '@/layouts/index.vue';
    // const ws = new WebSocket('/ws/chat/all?name=test');
    // ws.onopen = () => {
    //     console.info('连接成功');
    // };
    // ws.onclose = () => {
    //     console.info('断开连接');
    // };
    // ws.onerror = (e) => {
    //     console.info('连接异常');
    // };
    // ws.onmessage = (e) => {
    //     console.info('收到消息', e);
    // };
</script>

<style lang="less">
    html,
    body {
        width: 100%;
        height: 100%;
        color: white;
        background-color: black;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    ol,
    ul {
        list-style: none;
    }

    a {
        color: inherit;
    }

    #app {
        width: 100%;
        height: 100%;
    }

    * {
        padding: 0;
        margin: 0;
        user-select: none;
        box-sizing: border-box;
        &::before,
        &::after {
            box-sizing: border-box;
        }

        &::-webkit-scrollbar {
            background: transparent;
            width: 7px;
            height: 7px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: var(--x-fade-purple);
            border: 1px solid var(--x-primary);
        }

        &::-webkit-scrollbar-corner {
            background: transparent;
        }
    }

    .flex {
        display: flex;

        .fill {
            flex-grow: 1;
        }

        .half {
            flex-grow: 0.5;
        }

        &.fill {
            width: 100%;
            height: 100%;
        }

        &.wrap {
            flex-wrap: wrap;
        }

        &.row-fill {
            width: 100%;
        }

        &.col-fill {
            height: 100%;
        }

        &.row {
            flex-direction: row;
        }

        &.col {
            flex-direction: column;
        }

        &.row-center {
            justify-content: center;
        }

        &.row-start {
            justify-content: flex-start;
        }

        &.row-end {
            justify-content: flex-end;
        }

        &.row-base {
            justify-content: baseline;
        }

        &.row-around {
            justify-content: space-around;
        }

        &.row-evenly {
            justify-content: space-evenly;
        }

        &.row-between {
            justify-content: space-between;
        }

        &.col-center {
            align-items: center;
        }

        &.col-start {
            align-items: flex-start;
        }

        &.col-end {
            align-items: flex-end;
        }

        &.col-base {
            align-items: baseline;
        }
    }
</style>
