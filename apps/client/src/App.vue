<template>
    <code-rain background style="font-size: 2em" />
    <section class="layout">
        <header class="header">WINK</header>
        <main class="content">
            <aside class="aside"></aside>
            <section class="container">
                <Suspense>
                    <router-view />
                </Suspense>
            </section>
        </main>
        <footer class="footer">xiangwenke.love</footer>
    </section>
</template>

<script setup lang="ts">
    import CodeRain from '@/components/code-rain.vue';
</script>

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
        > .layout {
            width: 100%;
            height: calc(100% - 20px);
            max-width: 1200px;
            margin: auto;
            transform: translateY(10px);
            border: 2px solid rgba(0, 255, 0, 0.8);
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.8);
            overflow: hidden;
            @shadow-color: rgba(0, 255, 0, 0.2);
            @shadow-size: 5px;
            box-shadow: @shadow-size 0 @shadow-size @shadow-color, @shadow-size @shadow-size @shadow-size @shadow-color,
                -@shadow-size 0 @shadow-size @shadow-color, -@shadow-size -@shadow-size @shadow-size @shadow-color,
                0 @shadow-size @shadow-size @shadow-color, -@shadow-size @shadow-size @shadow-size @shadow-color,
                0 -@shadow-size @shadow-size @shadow-color, @shadow-size -@shadow-size @shadow-size @shadow-color;

            display: flex;
            flex-direction: column;
            > .header {
                padding: 10px;
                font-size: 1.5em;
            }
            > .content {
                flex: 1;
                display: flex;
                > aside {
                    max-width: 200px;
                    &:not(:empty) {
                        border-right: 2px dashed #333;
                    }
                }
                > .container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 10px;
                }
            }
            > .footer {
                padding: 5px;
                text-align: center;
                color: #666;
            }
        }
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
