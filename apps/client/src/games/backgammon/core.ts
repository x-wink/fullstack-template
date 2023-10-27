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
                .find((line) => this.getMaxLine(line)?.length === 5)
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
    getMaxLine(line: Line, color?: Color): Line | undefined {
        return this.splitLine(line)
            .filter((line) => !color || this.at(line[0]) === color)
            .sort((a, b) => b.length - a.length)[0];
    }
    /** 克隆备份 */
    clone() {
        const cloned = new Game(this.row, this.col);
        cloned.data = JSON.parse(JSON.stringify(this.data));
        return cloned;
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
    /** 延长线的一端 */
    extendLine(line: Line, revert = false) {
        let res: Point | undefined;
        if (line.length > 1) {
            const fp = revert ? line[line.length - 1] : line[0];
            const sp = revert ? line[line.length - 2] : line[1];
            const [fx, fy] = fp;
            const [sx, sy] = sp;
            const mx = this.game.col - 1;
            const my = this.game.row - 1;
            if (fx === sx) {
                if (revert && fy < my) {
                    res = [fx, fy + 1];
                } else if (fy > 0) {
                    res = [fx, fy - 1];
                }
            } else if (fy === sy) {
                if (revert && fx < mx) {
                    res = [fx + 1, fy];
                } else if (fx > 0) {
                    res = [fx - 1, fy];
                }
            } else if (fx < sx && fy < sy) {
                if (fx > 0 && fy > 0) {
                    res = [fx - 1, fy - 1];
                }
            } else if (fx > sx && fy > sy) {
                if (fx < mx && fy < my) {
                    res = [fx + 1, fy + 1];
                }
            } else if (fx > sx && fy < sy) {
                if (fx < mx && fy > 0) {
                    res = [fx + 1, fy - 1];
                }
            } else if (fx < sx && fy > sy) {
                if (fx > 0 && fy < my) {
                    res = [fx - 1, fy + 1];
                }
            }
        }
        return res;
    }
    /** 验证某一点颜色 */
    validatePoint(dot?: Point | number, color = Game.empty) {
        const index = Array.isArray(dot) ? this.game.position2index(dot) : dot;
        return dot && this.game.data[index!] === color;
    }
    /** 往延长线增加棋子 */
    appendLine(line: Line) {
        let dot = this.extendLine(line);
        if (this.validatePoint(dot)) {
            dot = this.extendLine(line, true);
            if (!this.validatePoint(dot)) {
                dot = void 0;
            }
        }
        return dot;
    }
    /** 周围 */
    rounds([x, y]: Point) {
        return [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1],
        ].filter(
            ([x, y]) => x >= 0 && y >= 0 && x < this.game.col && y < this.game.row && this.validatePoint([x, y])
        ) as Point[];
    }
    /** 获取棋盘上所有线 */
    allLines() {
        const lines = [];
        for (let y = 0; y < this.game.row; y++) {
            const index = this.game.position2index(0, y);
            lines.push(this.game.getHorizontalLine(index));
            lines.push(this.game.getLeftDiagonalLine(index));
            lines.push(this.game.getRightDiagonalLine(index));
        }
        for (let x = 0; x < this.game.col; x++) {
            lines.push(this.game.getVerticalLine(this.game.position2index(x, 0)));
        }
        return lines;
    }
    invoke() {
        // 天元
        const originDot = (this.game.col * this.game.row - 1) / 2;
        if (this.validatePoint(originDot)) {
            console.info('天元');
            this.game.set(originDot, this.color);
            return;
        }

        // 自己的四连加一颗
        const lines = this.allLines();
        const myFour = lines.find((line) => this.game.getMaxLine(line, this.color)?.length === 4);
        if (myFour) {
            const dot = this.appendLine(myFour);
            if (dot) {
                this.game.set(this.game.position2index(dot), this.color);
                return;
            }
        }
        // 堵死别人的四连
        const oppositeColor = Game.otherColor(this.color);
        const oppositeFour = lines.find((line) => this.game.getMaxLine(line, oppositeColor)?.length === 4);
        if (oppositeFour) {
            const dot = this.appendLine(oppositeFour);
            if (dot) {
                this.game.set(this.game.position2index(dot), this.color);
                return;
            }
        }
        // 自己的三连加一颗
        const myThree = lines.find(
            (line) =>
                this.game.getMaxLine(line, this.color)?.length === 3 &&
                this.extendLine(line) &&
                this.extendLine(line, true)
        );
        if (myThree) {
            const dot = this.appendLine(myThree);
            if (dot) {
                this.game.set(this.game.position2index(dot), this.color);
                return;
            }
        }
        // 堵死别人的双三连、三连+假四连、双假四连
        const dotCount = this.game.row * this.game.col;
        const trySet = (color: Color, condition: (lines: Line[]) => boolean) => {
            for (let i = 0; i < dotCount; i++) {
                if (this.validatePoint(i)) {
                    const game = this.game.clone();
                    game.set(i, color);
                    const lines = game.getAllLines(i);
                    if (condition(lines)) {
                        this.game.set(i, this.color);
                        return true;
                    }
                }
            }
        };
        if (
            trySet(
                oppositeColor,
                (lines) =>
                    lines.filter((line) => {
                        const max = this.game.getMaxLine(line, oppositeColor)?.length ?? 0;
                        return (max >= 3 && this.extendLine(line) && this.extendLine(line, true)) || max === 4;
                    }).length > 1
            )
        ) {
            return;
        }

        // 自己的假三连加一颗
        const myFakeThree = lines.find(
            (line) =>
                this.game.getMaxLine(line, this.color)?.length === 3 &&
                (this.extendLine(line) || this.extendLine(line, true))
        );
        if (myFakeThree) {
            const dot = this.appendLine(myFakeThree);
            if (dot) {
                this.game.set(this.game.position2index(dot), this.color);
                return;
            }
        }
        // 堵死别人的三连
        const oppositeThree = lines.find(
            (line) =>
                this.game.getMaxLine(line, oppositeColor)?.length === 3 &&
                this.extendLine(line) &&
                this.extendLine(line, true)
        );
        if (oppositeThree) {
            const dot = this.appendLine(oppositeThree);
            if (dot) {
                this.game.set(this.game.position2index(dot), this.color);
                return;
            }
        }
        // 凑齐自己的双三连
        if (
            trySet(
                this.color,
                (lines) =>
                    lines.filter((line) => {
                        const max = this.game.getMaxLine(line, this.color)?.length ?? 0;
                        return (max >= 3 && this.extendLine(line) && this.extendLine(line, true)) || max === 4;
                    }).length > 1
            )
        ) {
            return;
        }
        // 凑齐自己的三连
        const myTwo = lines.find(
            (line) =>
                this.game.getMaxLine(line, this.color)?.length === 2 &&
                this.extendLine(line) &&
                this.extendLine(line, true)
        );
        if (myTwo) {
            const dot = this.appendLine(myTwo);
            if (dot) {
                this.game.set(this.game.position2index(dot), this.color);
                return;
            }
        }
        // 凑齐自己的双二连
        if (
            trySet(
                this.color,
                (lines) =>
                    lines.filter((line) => {
                        const max = this.game.getMaxLine(line, this.color)?.length ?? 0;
                        return (max >= 2 && this.extendLine(line) && this.extendLine(line, true)) || max === 3;
                    }).length > 1
            )
        ) {
            return;
        }
        // 堵死别人双二连
        if (
            trySet(
                oppositeColor,
                (lines) =>
                    lines.filter((line) => {
                        const max = this.game.getMaxLine(line, oppositeColor)?.length ?? 0;
                        return (max >= 2 && this.extendLine(line) && this.extendLine(line, true)) || max === 3;
                    }).length > 1
            )
        ) {
            return;
        }
        // 凑齐自己的二连
        if (
            trySet(
                this.color,
                (lines) =>
                    !!lines.find((line) => {
                        const max = this.game.getMaxLine(line, this.color)?.length ?? 0;
                        return (max >= 2 && this.extendLine(line) && this.extendLine(line, true)) || max === 3;
                    })
            )
        ) {
            return;
        }
        // 随便走一步
        const rounds = this.rounds(this.game.index2position(this.game.last));
        const dot = rounds[Math.floor(Math.random() * rounds.length)];
        this.game.set(this.game.position2index(dot), this.color);
    }
}
