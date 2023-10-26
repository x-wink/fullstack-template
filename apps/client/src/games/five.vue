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
    const config = {
        row: 15,
        col: 15,
        size: 36,
    };
    class Game {
        static empty = 0 as const;
        static white = 1 as const;
        static black = 2 as const;
        static randomColor() {
            return (Math.round(Math.random()) + 1) as Color;
        }
        static otherColor(color: Color) {
            return (Game.white + Game.black - color) as Color;
        }

        row: number;
        col: number;
        data: (typeof Game.empty | Color)[] = [];
        last: number = -1;
        current: Color = Game.black;
        result: number[] | undefined;
        get over() {
            return !!this.result;
        }
        constructor(row: number, col: number) {
            this.row = row;
            this.col = col;
        }
        /** 重置游戏 */
        restart() {
            this.data = new Array(this.row * this.col).fill(Game.empty);
            this.current = Game.black;
            this.last = -1;
            this.result = void 0;
        }
        /** 落子 */
        set(index: number, color: Color) {
            if (!this.over && this.data[index] === Game.empty) {
                this.current = Game.otherColor(this.current);
                this.last = index;
                this.data[index] = color;
                if (color === player.color) {
                    const rows = [this.getHorizontal(index)];
                    this.result = rows
                        .find(
                            (row) =>
                                this.getMaxLine(row.map((item) => this.data[this.position2index(item)])).length === 5
                        )
                        ?.map((item) => this.data[this.position2index(item)]);
                }
            }
        }
        /** 坐标转下标 */
        position2index(xOrPosition: number | number[], y?: number) {
            let x = xOrPosition as number;
            if (Array.isArray(xOrPosition)) {
                x = xOrPosition[0];
                y = xOrPosition[1];
            }
            return y! * this.col + x;
        }
        /** 获取棋盘中某个坐标横向所有点 */
        getHorizontal(index: number) {
            const { col } = this;
            const y = Math.floor(index / col);
            return Array.from({ length: col }, (_, index) => [index, y]);
        }
        /** 获取棋盘中某个坐标纵向所有点 */
        getVertical(index: number) {
            const { row, col } = this;
            const x = index % col;
            return Array.from({ length: row }, (_, index) => [x, index]);
        }
        /** 获取棋盘中某个坐标左上到右下斜向所有点 */
        getDiagonal(index: number) {
            const result = [];
            const { col, row } = this;
            const x = index % col;
            const y = Math.floor(index / col);
            let i = 0,
                j = 0;
            if (x < y) {
                j = y - x;
            } else {
                i = x - y;
            }
            for (; i < col && y < row; i++, j++) {
                result.push([i, j]);
            }
            return result;
        }
        /** 获取棋盘中某个坐标右上到左下斜向所有连接的点 */
        getDiagonal2(index: number) {
            const result = [];
            const { col, row } = this;
            const x = index % col,
                x2 = col - x - 1;
            const y = Math.floor(index / col);
            let i = col - 1,
                j = 0;
            if (x2 < y) {
                j = y - x2;
            } else {
                i = x + y;
            }
            for (; i >= 0 && y < row; i--, j++) {
                result.push([i, j]);
            }
            return result;
        }
        /** 拆分为多个连续值的子数组 */
        splitLine(arr: number[]) {
            let result: number[][] = [];
            let current: number[] = [];
            const len = arr.length;
            for (let i = 0; i < len; i++) {
                if (i === 0 || arr[i] !== arr[i - 1]) {
                    current = [i];
                    if (arr[current[0]] !== Game.empty) {
                        result.push(current);
                    }
                } else {
                    current.push(i);
                }
            }
            return result;
        }
        /** 获取最大长度的连续值子数组 */
        getMaxLine(arr: number[]) {
            return this.splitLine(arr).sort((a, b) => b.length - a.length)[0];
        }
    }
    type Color = typeof Game.white | typeof Game.black;
    class Player {
        name: string;
        color: Color;
        constructor(name: string, color: Color) {
            this.name = name;
            this.color = color;
        }
    }
    class Robot extends Player {
        constructor(color: Color) {
            super('WINK', color);
        }
        invoke() {
            game.set(game.last + config.col, this.color);
        }
    }

    const playerColor = Game.randomColor(),
        aiColor = Game.otherColor(playerColor);

    const game = reactive(new Game(config.row, config.col));

    const player = new Player('玩家', playerColor);
    const ai = new Robot(aiColor);

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
                    background: #000;
                    box-shadow: inset 2px 2px 10px 5px #fff, 0px 0px 3px 1px #fff;
                }
                &::after {
                    color: #000;
                }
            }
            &.black {
                &::before {
                    background: #fff;
                    // 使用阴影实现凸起效果
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
