import { ComponentPublicInstance } from 'vue';
import Player from './player';

/**
 * 游戏配置
 */
export class Config {
    /**
     * 游戏容器总行数
     */
    row: number;
    /**
     * 游戏容器总列数
     */
    col: number;
    /**
     * 格子尺寸
     */
    size: number;
    constructor(row: number, col: number, size: number) {
        this.row = row;
        this.col = col;
        this.size = size;
    }
}

/**
 * 坐标点
 */
export class Point extends Array<number> {
    get x(): number {
        return this[0];
    }
    get y(): number {
        return this[1];
    }
    constructor(x: number, y: number) {
        super();
        this.push(x);
        this.push(y);
    }
    /**
     * 判断是否为相同坐标点
     * @param point 判断目标
     * @returns 是否为相同坐标点
     */
    same(point: Point): boolean {
        return this.x === point.x && this.y === point.y;
    }
    /**
     * 克隆坐标点
     * @returns 克隆点
     */
    clone(): Point {
        return new Point(this.x, this.y);
    }
}

/**
 * 方块容器
 */
export class Container extends Array<number[]> {
    get row(): number {
        return this.length;
    }
    get col(): number {
        return this[0]?.length || 0;
    }
    get data(): number[][] {
        return [...this].map((row) => [...row]);
    }
    constructor(boxes: number[][]) {
        // 虽然TS有类型检查，但是实际运行过程中，调用Array对象的一些原生方法时，会触发构造器并且构造参数不一定是这里指定的类型
        if (boxes instanceof Array) {
            super();
            this.push(...boxes.map((row) => [...row]));
        } else if (typeof boxes === 'number') {
            super(boxes);
        } else {
            console.info('Container constructor error', boxes);
        }
    }
    /**
     * 克隆
     * @param block 要放入克隆容器的方块
     * @returns 克隆容器
     */
    clone(block?: Shape): Container {
        const clone = new Container(this.data);
        if (block) {
            clone.add(block);
        }
        return clone;
    }
    /**
     * 往容器内添加方块
     * @param block 方块
     * @returns 容器本身
     */
    add(block: Shape): Container {
        block.worldPosition().forEach((point) => {
            if (this.row > point.y && this.col > point.x) {
                this[point.y][point.x] = block.boxValue;
            } else {
                console.info('Container add error', block.worldPosition());
            }
        });
        return this;
    }
    /**
     * 消除容器内满行
     * @returns 消除行数
     */
    clear(): number {
        const clear: number[] = [];
        this.forEach((row, y) => {
            if (row.every((box) => box !== 0)) {
                clear.push(y);
            }
        });
        clear.forEach((y) => {
            const row = this.splice(y, 1);
            this.unshift(row[0].map(() => 0));
        });
        return clear.length;
    }
    /**
     * 复制数据
     * @param boxes 容器数据
     */
    copy(container: Container) {
        container.forEach((row, y) => {
            this[y] = [...row];
        });
    }
    /**
     * 碰撞检测
     * @param block 方块
     * @returns 方块在容器中是否产生碰撞
     */
    collision(block: Shape): boolean {
        return block.worldPosition().some((point) => this[point[1]]?.[point[0]] !== 0);
    }
    /**
     * 容器内数据矩阵顺时针旋转90度
     */
    transform(): void {
        this.copy(
            new Container(
                this.map((row, i) => {
                    return [...this].reverse().map((row) => row[i]);
                })
            )
        );
    }
    /**
     * 初始化容器
     * @param row 行数
     * @param col 列数
     * @returns 容器
     */
    static init(row: number, col: number): number[][] {
        return new Array(row).fill(0).map(() => new Array(col).fill(0));
    }
    /**
     * 从JSON Object解析数据
     * @param boxes 数据
     * @returns 容器
     */
    static parse(boxes: number[][]): Container {
        return new Container(boxes);
    }
}

const _direction = Symbol('direction');
/**
 * 方块
 */
export class Shape {
    [_direction]: number;
    /**
     * 方块类型
     */
    type: string;
    /**
     * 方块模型
     */
    boxes: Container;
    /**
     * 坐标点
     */
    position: Point;
    /**
     * 旋转方向
     */
    get direction(): number {
        return this[_direction];
    }
    /**
     * 设置旋转方向并且更新数据
     */
    set direction(num: number) {
        while (this[_direction] !== num) {
            this.transform();
        }
    }
    /**
     * X轴坐标点（水平方向）
     */
    get x(): number {
        return this.position.x;
    }
    /**
     * 设置X轴坐标点（水平方向）
     */
    set x(x: number) {
        this.position[0] = x;
    }
    /**
     * Y轴坐标点（垂直方向）
     */
    get y(): number {
        return this.position.y;
    }
    /**
     * 设置Y轴坐标点（垂直方向）
     */
    set y(y: number) {
        this.position[1] = y;
    }
    /**
     * 方块格子的数字值
     */
    get boxValue(): number {
        return Shape.list.indexOf(this.type) + 1;
    }
    constructor(type: string) {
        this.type = type;
        this.boxes = new Container(Shape.model[Shape.list.indexOf(type)]);
        this.position = new Point(0, 0);
        this[_direction] = 0;
    }
    /**
     * 碰撞检测
     * @param container 容器
     * @returns 方块是否与容器碰撞
     */
    collision(container: Container): boolean {
        return container.collision(this);
    }
    /**
     * 顺时针变形
     */
    transform(): Shape {
        this.boxes.transform();
        this[_direction] = ++this[_direction] % 4;
        return this;
    }
    /**
     * 左移
     */
    left(): Shape {
        this.x--;
        return this;
    }
    /**
     * 右移
     */
    right(): Shape {
        this.x++;
        return this;
    }
    /**
     * 下移
     */
    down(): Shape {
        this.y++;
        return this;
    }
    /**
     * 直接下落到最底部
     * @param {Arrya} container 玩家的方块容器，用于碰撞检测
     */
    done(container: Container): Shape {
        while (!container.collision(this)) {
            this.y++;
        }
        this.y--;
        return this;
    }
    /**
     * 获取方块格子对应容器的坐标点集合
     * @returns 坐标集合
     */
    worldPosition(): Point[] {
        return this.boxes.flatMap(
            (row, y) =>
                row
                    .map((box, x) => (box !== 0 ? new Point(x + this.x, y + this.y) : null))
                    .filter((item) => item !== null) as Point[]
        );
    }
    /**
     * 检测方块是否包含指定坐标点
     * @param {Array} point [x,y]
     * @returns 是否包含
     */
    contain(point: Point): number {
        let res = 0;
        if (this.worldPosition().some((worldPoint) => worldPoint.same(point))) {
            res = this.boxValue;
        }
        return res;
    }
    /**
     * 克隆方块
     * @returns 克隆体
     */
    clone(): Shape {
        const clone = new Shape(this.type);
        clone.position = this.position.clone();
        clone.direction = this.direction;
        return clone;
    }

    /**
     * 方块类型列表
     */
    static list = ['O', 'I', 'L', 'J', 'T', 'Z', 'S'];
    /**
     * 方块格子数值对应颜色列表
     */
    static color = ['transparent', 'brown', 'red', 'blue', 'green', 'chocolate', 'purple', 'gold'];
    /**
     * 方块数据模型列表
     */
    static model = [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 3, 0, 0],
            [0, 3, 0, 0],
            [0, 3, 3, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 4, 0],
            [0, 0, 4, 0],
            [0, 4, 4, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 5, 0, 0],
            [5, 5, 5, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 6, 6, 0],
            [0, 0, 6, 6],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 7, 7, 0],
            [7, 7, 0, 0],
            [0, 0, 0, 0],
        ],
    ];
    /**
     * 根据概率规则随机产生方块
     * @param {String} rule 概率规则
     * @returns 随机方块
     */
    static random(rule = 'OILJTZSI'): Shape {
        const arr = rule.split('');
        const index = Math.round(Math.random() * (arr.length - 1));
        return new Shape(arr[index]);
    }
    /**
     * 从JSON Object解析数据
     * @param block JSON Object
     * @returns 方块
     */
    static parse(block: Shape): Shape {
        const clone = new Shape(block.type);
        clone.boxes = new Container(block.boxes);
        clone.position = new Point(block.position[0], block.position[1]);
        return clone;
    }
}

/**
 * 游戏状态
 */
export enum GameStatus {
    /**
     * 暂停
     */
    stop = 0,
    /**
     * 运行
     */
    run = 1,
}

/**
 * 游戏引擎
 */
export class Game {
    /**
     * 游戏配置
     */
    config: Config;
    /**
     * VUE实例
     */
    proxy: ComponentPublicInstance | null;
    /**
     * 玩家列表
     */
    player: Player[] = [];
    /**
     * 备选方块列表
     */
    next: Shape[] = [];
    /**
     * 游戏状态
     */
    status: GameStatus = GameStatus.stop;
    /**
     * 游戏速度列表（下落间隔毫秒数）
     */
    speed: number[] = [1000, 950, 900, 850, 800, 700, 600, 500, 400, 300, 200, 100];
    /**
     * 游戏等级列表（达到指定抵消行数升级）
     */
    level: number[] = [0, 10, 20, 30, 50, 75, 100, 120, 150, 200, 250, 300];

    constructor(config: Config, proxy: ComponentPublicInstance | null) {
        this.config = config;
        this.proxy = proxy;
    }

    /**
     * 添加玩家
     * @param {Player}} player
     */
    add(player: Player): void {
        this.player.push(player);
        console.info(`玩家【${player.name}】就加入游戏`);
    }

    /**
     * 指定玩家重启游戏
     */
    reset(player: Player): void {
        player.status = 1;
        player.timestamp = 0;
        player.boxes = new Container(Container.init(this.config.row, this.config.col));
    }

    /**
     * 全部玩家重启游戏
     */
    resetAll(): void {
        this.player.forEach(this.reset.bind(this));
        this.start();
        this.update(0);
    }

    /**
     * 继续游戏
     */
    start(): void {
        this.status = GameStatus.run;
    }

    /**
     * 暂停游戏
     */
    stop(): void {
        this.status = GameStatus.stop;
    }

    /**
     * 逻辑循环
     * @param {float} clock 游戏时间刻度（requestAnimation自动累加）
     */
    update(clock: number): void {
        requestAnimationFrame(this.update.bind(this));
        if (this.status) {
            // 补充预备列表
            const oldNextSize = this.next.length;
            while (this.next.length < Math.max(3, this.player.length)) {
                const shape = Shape.random();
                shape.x = Math.floor(this.config.col / 2);
                this.next.push(shape);
            }
            // 更新玩家状态
            this.player.forEach(async (player) => {
                if (player.status) {
                    if (oldNextSize !== this.next.length) {
                        player.onNext(this.next.map((item) => item.clone()));
                    }
                    if (!player.current) {
                        // 从预备列表提取操作方块
                        player.current = this.next.shift();
                        player.onNext(this.next.map((item) => item.clone()));
                        await player.onFetch();
                    }
                    // 根据消除行数更新游戏等级
                    const level = [...this.level].reverse().find((lines) => player.line >= lines);
                    if (level !== undefined) {
                        player.level = this.level.indexOf(level) + 1;
                    } else {
                        player.level = this.level.length;
                    }
                    // 容器范围检测
                    if (player.boxes.collision(player.current!)) {
                        // 游戏结束
                        player.status = 0;
                    }
                    // 更新操作方块位置
                    if (clock - player.timestamp >= this.speed[player.level - 1]) {
                        player.timestamp = clock;
                        const clone = player.current!.clone();
                        clone.down();
                        if (player.boxes.collision(clone)) {
                            // 操作方块触底
                            player.boxes.add(player.current!);
                            player.current = undefined;
                        } else {
                            // 操作方块自然下落
                            player.current!.y++;
                        }
                    }
                    // 消除
                    const lines = player.boxes.clear();
                    player.line += lines;
                    player.score += lines * [0, 1, 3, 6, 10][lines] * 10;
                }
            });
        }
        this.proxy!.$forceUpdate();
    }
}
