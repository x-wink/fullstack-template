<template>
    <div class="russia-block flex col">
        <div v-if="game.status === 0" class="stop">
            游戏暂停
            <button @click="game.start()" @touchstart="game.start()">继续游戏</button>
        </div>
        <div class="next flex row-center">
            <Container v-for="(next, index) in game.next" :key="index" :boxes="next.boxes" />
        </div>
        <div
            v-for="(player, p) in game.player"
            :key="p"
            class="player flex col col-center"
            :class="{ target: p === 0 && game.player.length > 1 }"
        >
            <div v-if="player.status === 0" class="gameover">
                <p>游戏结束</p>
                <button @click="game.reset(player)" @touchstart="game.reset(player)">重新开始</button>
            </div>
            <div class="info">
                <p class="name">昵称: {{ player.name }}</p>
                <p class="name">消除: {{ player.line }}</p>
                <p class="name">速度: {{ player.level }}</p>
                <h1 class="score">成绩: {{ player.score }}</h1>
            </div>
            <Container :boxes="player.boxes" :col="config.col" :current="player.current" :row="config.row" />
        </div>
        <Controls @press="handlePress" />
    </div>
</template>

<script setup lang="ts">
    import Container from './container.vue';
    import Controls from '../controls/index.vue';
    import { Config, Game } from './core';
    import Robot from './robot';
    import { Person } from './person';
    import { Control, Keys } from '../controls/core';

    const proxy = getCurrentInstance()!.proxy;
    const config = reactive(new Config(20, 10, 40));
    const game = reactive(new Game(config, proxy));

    // Robot是AI玩家，自定义AI需要早mod下面编写AI类并继承Player，通过实现Player的onFetch函数进行逻辑操作
    const robot = reactive(new Robot('WINK', 'wink'));
    // Person为真人玩家
    const person = reactive(new Person('玩家', game.stop.bind(game)));
    game.add(robot);
    game.add(person);

    //
    const control = new Control(
        { up: 'ArrowUp', right: 'ArrowRight', down: 'ArrowDown', left: 'ArrowLeft', stop: ' ' },
        {
            stop: () => {
                game.stop();
            },
            ok: () => {
                if (person.current?.transform().collision(person.boxes)) {
                    person.current.direction--;
                }
            },
            up: () => {
                if (person.current?.transform().collision(person.boxes)) {
                    person.current.direction--;
                }
            },
            right: () => {
                if (person.current?.right().collision(person.boxes)) {
                    person.current.left();
                }
            },
            left: () => {
                if (person.current?.left().collision(person.boxes)) {
                    person.current.right();
                }
            },
            down: () => {
                person.current?.done(person.boxes);
            },
        }
    );
    const handlePress = (key: Keys) => {
        control.emit(key);
    };

    onMounted(() => {
        game.resetAll();
    });
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
    }
</style>
