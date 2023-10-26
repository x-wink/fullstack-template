import { Container, Shape } from './core';

export enum PlayerStatus {
    gameover = 0,
    running = 1,
}
/**
 * 玩家
 */
export default class Player {
    /**
     * 昵称
     */
    name: string;
    /**
     * 分数
     */
    score: number = 0;
    /**
     * 消除行数
     */
    line: number = 0;
    /**
     * 速度等级
     */
    level: number = 0;
    /**
     * 方块容器
     */
    boxes: Container = new Container([]);
    /**
     * 游戏状态
     */
    status: PlayerStatus = PlayerStatus.running;
    /**
     * 操作方块
     */
    current?: Shape;
    /**
     * 最后渲染时间
     */
    timestamp: number = 0;
    constructor(name: string) {
        this.name = name;
        console.info(`我是${name}`);
    }
    /**
     * 获取到新的操作方块
     *
     * 当前操作方块 this.current
     * 方块容器 this.boxes
     * 变形 transform(this.boxes)
     * 左移 left(this.boxes)
     * 右移 right(this.boxes)
     * 直接到底 down(this.boxes) 到底后不能移动去填补空缺
     */
    onFetch(): void {
        console.info(`${this.name}操作方块：${this.current!.type}`);
    }
    /**
     * 检测到备选列表方块变化
     *
     * @param {Array} next 备选方块列表（多玩家公用，上限游戏人数，最少3个）
     */
    onNext(next: Shape[]): void {
        console.info(`${this.name}发现更新：${next.map((item) => item.type).join(' ')}`);
    }
}
