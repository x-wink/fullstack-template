export type Color = typeof Game.white | typeof Game.black;
export type Point = [number, number];
export type Line = Point[];
export class Game {
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
    /** 根据坐标获取值 */
    at(xOrPosition: number | Point, y?: number) {
        return this.data[this.position2index(xOrPosition, y)];
    }
    /** 落子 */
    set(index: number, color: Color) {
        if (!this.over && this.data[index] === Game.empty) {
            this.current = Game.otherColor(this.current);
            this.last = index;
            this.data[index] = color;
            const lines = this.getAllLines(index);
            this.result = lines
                .find((line) => this.getMaxLine(line).length === 5)
                ?.map((item) => this.data[this.position2index(item)]);
        }
    }
    /** 坐标转下标 */
    position2index(xOrPosition: number | Point, y?: number) {
        let x = xOrPosition as number;
        if (Array.isArray(xOrPosition)) {
            x = xOrPosition[0];
            y = xOrPosition[1];
        }
        return y! * this.col + x;
    }
    /** 下标转坐标 */
    index2position(index: number) {
        return [index % this.col, Math.floor(index / this.col)] as Point;
    }
    /** 获取棋盘中某个坐标横向所有点 */
    getHorizontalLine(index: number) {
        const { col } = this;
        const y = Math.floor(index / col);
        return Array.from({ length: col }, (_, index) => [index, y]) as Line;
    }
    /** 获取棋盘中某个坐标纵向所有点 */
    getVerticalLine(index: number) {
        const { row, col } = this;
        const x = index % col;
        return Array.from({ length: row }, (_, index) => [x, index]) as Line;
    }
    /** 获取棋盘中某个坐标左上到右下斜向所有点 */
    getLeftDiagonalLine(index: number) {
        const result: Line = [];
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
    /** 获取棋盘中某个坐标右上到左下斜向所有点 */
    getRightDiagonalLine(index: number) {
        const result: Line = [];
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
    /** 获取棋盘中某个坐标各方向所有线 */
    getAllLines(index: number) {
        return [
            this.getHorizontalLine(index),
            this.getVerticalLine(index),
            this.getLeftDiagonalLine(index),
            this.getRightDiagonalLine(index),
        ];
    }
    /** 拆分为多个连续值的子数组 */
    splitLine(line: Line) {
        const values = line.map((item) => this.at(item));
        const result: number[][] = [];
        let current: number[] = [];
        const len = values.length;
        for (let i = 0; i < len; i++) {
            if (i === 0 || values[i] !== values[i - 1]) {
                current = [i];
                if (values[current[0]] !== Game.empty) {
                    result.push(current);
                }
            } else {
                current.push(i);
            }
        }
        return result.map((item) => item.map((index) => line[index]) as Line);
    }
    /** 获取最大长度的连续值子数组 */
    getMaxLine(line: Line, color?: Color) {
        return this.splitLine(line)
            .filter((line) => !color || this.at(line[0]) === color)
            .sort((a, b) => b.length - a.length)[0];
    }
}
export class Player {
    name: string;
    color: Color;
    constructor(name: string, color: Color) {
        this.name = name;
        this.color = color;
    }
}
export class Robot extends Player {
    game: Game;
    constructor(color: Color, game: Game) {
        super('WINK', color);
        this.game = game;
    }
    invoke() {
        // 先手
        if (this.game.last === -1) {
            this.game.set((this.game.col * this.game.row - 1) / 2, this.color);
            return;
        }
        // 自己的四连加一颗
        const lines = this.game.getAllLines(this.game.last);
        const four = lines.find((line) => this.game.getMaxLine(line, this.color).length === 4);
        if (four) {
            return;
        }
        // 堵死别人的四连
        // 自己的三连加一颗
        // 堵死别人的双三连
        // 自己的假三连加一颗
        // 堵死别人的三连
        // 凑齐自己的双三连
        // 布局
    }
}
