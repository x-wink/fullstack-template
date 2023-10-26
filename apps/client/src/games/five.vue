<template>
    <div
        class="five-container"
        :style="{ '--col': config.col + 1, '--size': `${config.size}px`, '--dot': `${(config.size / 3) * 2}px` }"
    >
        <div class="player">
            <p class="name">{{ ai.name }}</p>
            <div class="box" :class="{ white: ai.color === Game.white, black: ai.color === Game.black }"></div>
        </div>
        <div class="grid">
            <div v-for="row in config.row" :key="row" class="row">
                <div
                    v-for="col in config.col"
                    :key="col"
                    class="box"
                    :class="{
                        'ignore row': row === config.row,
                        'ignore col': col === config.col,
                        white: game.data[calcIndex(row, col)] === 1,
                        black: game.data[calcIndex(row, col)] === 2,
                        last: calcIndex(row, col) === game.last,
                    }"
                    @click="handleClick(calcIndex(row, col))"
                ></div>
            </div>
            <div v-if="game.over" class="result">
                <h1>{{ game.current !== player.color ? '牛逼' : '辣鸡' }}</h1>
                <br />
                <button @click="handleStart">重新开始</button>
            </div>
        </div>
        <div class="player self">
            <p class="name">{{ player.name }}</p>
            <div class="box" :class="{ white: player.color === Game.white, black: player.color === Game.black }"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Game, Player, Robot } from './five';
    const config = {
        row: 15,
        col: 15,
        size: 36,
    };

    const playerColor = Game.randomColor(),
        aiColor = Game.otherColor(playerColor);

    const game = reactive(new Game(config.row, config.col));

    const player = new Player('玩家', playerColor);
    const ai = new Robot(aiColor, game);

    const calcIndex = (row: number, col: number) => (row - 1) * config.col + (col - 1);
    const handleClick = (index: number) => {
        if (game.current === player.color) {
            game.set(index, player.color);
            ai.invoke();
        }
    };
    const handleStart = () => {
        game.restart();
        if (ai.color === game.current) {
            ai.invoke();
        }
    };
    onMounted(handleStart);
</script>

<style scoped lang="less">
    .five-container {
        .grid {
            position: relative;
            padding: 20px;
            margin: 10px;
            border: 3px solid #fff;
            background: rgb(180, 155, 72);
            .result {
                width: 100%;
                height: 100%;
                background: #0008;
                position: absolute;
                left: 0;
                top: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: not-allowed;
                button {
                    all: unset;
                    background: #0008;
                    padding: 10px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                }
            }
            .row {
                display: flex;
            }
        }
        .box {
            width: var(--size);
            height: var(--size);
            position: relative;
            border: 0.5px solid #fff4;
            &::before {
                content: '';
                display: block;
                width: var(--dot);
                height: var(--dot);
                position: absolute;
                cursor: pointer;
                transform: translate(-50%, -50%);
                border-radius: 50%;
            }
            &::after {
                pointer-events: none;
            }
            &.last {
                &::after {
                    content: '×';
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    transform: translate(-50%, -50%);
                    position: absolute;
                    z-index: 10;
                    font-family: '楷体';
                    font-size: 12px;
                    font-weight: bolder;
                }
            }
            &.ignore {
                border: none;
                background: none;
                &.row {
                    height: 0px;
                }
                &.col {
                    width: 0px;
                }
            }
            &.white {
                &::before {
                    cursor: not-allowed;
                    background: #000;
                    box-shadow: inset 2px 2px 10px 5px #fff, 0px 0px 3px 1px #fff;
                }
                &::after {
                    color: #000;
                }
            }
            &.black {
                &::before {
                    cursor: not-allowed;
                    background: #fff;
                    box-shadow: inset 2px 2px 10px 5px #000, 0px 0px 3px 1px #fff8;
                }
            }
        }
        .player {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &.self {
                flex-direction: column-reverse;
            }
            .box {
                border: none;
                &::before {
                    transform: translate(25%, 25%);
                }
            }
        }
    }
</style>
