<template>
    <Suspense>
        <router-view />
    </Suspense>
</template>

<script setup lang="ts"></script>

<style lang="less">
    :root {
        --primary: #283079;
        --info: #409eff;
        --error: #f56c6c;
    }
    html,
    body {
        width: 100%;
        height: 100%;
        color: white;
        background-color: black;
    }

    #app {
        width: 100%;
        height: 100%;
    }

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        user-select: none;

        #app & {
            transition: all 0.3s;
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
