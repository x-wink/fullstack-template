<template>
    <div class="russia-block flex col">
        <div v-if="game.status === 0" class="stop">
            游戏暂停
            <button @click="game.start()">继续游戏</button>
        </div>
        <div class="next flex row-center">
            <div v-for="(next, index) in game.next" :key="index" class="scene">
                <div
                    v-for="(row, y) in next.boxes"
                    :key="y"
                    class="row flex"
                    :style="{ height: `${100 / row.length}%` }"
                >
                    <div
                        v-for="(box, x) in row"
                        :key="x"
                        class="box"
                        :class="{ active: box > 0 }"
                        :style="{
                            backgroundColor: color[box],
                        }"
                    ></div>
                </div>
            </div>
        </div>
        <div
            v-for="(player, p) in game.player"
            :key="p"
            class="player flex col col-center"
            :class="{ target: p === 0 && game.player.length > 1 }"
        >
            <div v-if="player.status === 0" class="gameover">
                <p>游戏结束</p>
                <button @click="game.reset(player)">重新开始</button>
            </div>
            <div class="info">
                <p class="name">昵称: {{ player.name }}</p>
                <p class="name">消除: {{ player.line }}</p>
                <p class="name">速度: {{ player.level }}</p>
                <h1 class="score">成绩: {{ player.score }}</h1>
            </div>
            <div class="scene">
                <div v-for="y in config.row" :key="y" class="row flex" :style="{ height: `${100 / config.row}%` }">
                    <div
                        v-for="x in config.col"
                        :key="x"
                        class="box"
                        :class="{ active: calcBoxActive(player, (y - 1) * config.col + x - 1) }"
                        :style="{
                            backgroundColor: calcBoxColor(player, (y - 1) * config.col + x - 1),
                        }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Config, Game, Point, Shape } from './core';
    import Player from './player';
    import Robot from './robot';
    import { Control, Person } from './person';

    const proxy = getCurrentInstance()!.proxy;
    const config = reactive(new Config(20, 10, 40));
    const game = reactive(new Game(config, proxy));

    onMounted(() => {
        // Robot是AI玩家，自定义AI需要早mod下面编写AI类并继承Player，通过实现Player的onFetch函数进行逻辑操作
        const robot = reactive(new Robot('WINK', 'wink'));
        // Person为真人玩家，Control设置键位
        const person = reactive(
            new Person(
                '玩家',
                new Control('ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', ' '),
                game.stop.bind(game)
            )
        );
        game.add(robot);
        game.add(person);
        game.resetAll();
    });

    // 颜色列表
    const color = computed(() => Shape.color);
    // 计算格子颜色
    const calcBoxColor = (player: Player, i: number) => {
        let res = 'transparent';
        let value = player.boxes.flat()[i];
        if (!value && player.current) {
            value = player.current.contain(new Point(i % config.col, Math.floor(i / config.col)));
        }
        res = unref(color)[value];
        return res;
    };
    // 计算格子是否激活
    const calcBoxActive = (player: Player, i: number) => {
        let res = player.boxes.flat()[i] > 0;
        if (!res && player.current) {
            if (player.current.contain(new Point(i % config.col, Math.floor(i / config.col))) !== 0) {
                res = true;
            }
        }
        return res;
    };
</script>

<style scoped lang="less">
    @keyframes scale {
        0% {
            transform: scale(0.8);
        }
        100% {
            transform: scale(1.2);
        }
    }
    .russia-block {
        transition: all 0.3s;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .stop {
            z-index: 999;
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            font-size: 36px;
            color: brown;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            button {
                padding: 10px 20px;
                margin-top: 30px;
                background-color: brown;
                color: white;
                border: none;
                outline: none;
                border-radius: 5px;
                cursor: pointer;
            }
        }
        .next {
            width: 100%;
            height: 50px;
            flex-shrink: 0;
            .scene {
                background-color: rgba(0, 0, 0, 0.3);
                margin-left: 10px;
                aspect-ratio: 1;
            }
        }
        .player {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            flex: 1 1 0;
            &.target {
                flex-grow: 0.6;
            }
            .gameover {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.7);
                color: brown;
                font-size: 36px;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                button {
                    padding: 10px 20px;
                    margin-top: 30px;
                    background-color: brown;
                    color: white;
                    border: none;
                    outline: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
            .info {
                width: 100%;
                height: 30px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                .score {
                    animation: scale 1s linear 0s infinite alternate;
                }
            }
        }
        .scene {
            width: fit-content;
            height: 100%;
            overflow: hidden;
            border: 2px solid gray;
            background-color: rgba(0, 0, 0, 0.3);
            + .scene {
                margin-left: 20px;
            }
            .row {
                width: fit-content;
                .box {
                    height: 100%;
                    aspect-ratio: 1;
                    border: 0.1px solid rgba(255, 255, 255, 0.1);
                    box-sizing: border-box;
                    &.active {
                        border: 2px outset white;
                    }
                }
            }
        }
    }
</style>
