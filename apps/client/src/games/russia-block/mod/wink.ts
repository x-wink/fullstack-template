import { Shape, Container } from '../core';
declare type AnalysisResult = {
    /**
     * 权重
     */
    weight: number;
    /**
     * 空洞个数
     */
    gap: number;
    /**
     * 障碍个数
     */
    obstacle: number;
    /**
     * 水平位置
     */
    horizontal: number;
    /**
     * 垂直位置
     */
    vertical: number;
    /**
     * 消除行数
     */
    clear: number;
    /**
     * 执行步骤
     */
    task: string[];
    /**
     * 操作后的方块
     */
    block: Shape;
    /**
     * 操作后的容器
     */
    container: Container;
    /**
     * 下一个方块的解决方案
     */
    next: AnalysisResult | null;
};

/**
 * 获取矩阵中的某一列
 * @param boxes 矩阵
 * @param x 列索引
 * @returns 列数据
 */
const getCol = (boxes: number[][], x: number): number[] => boxes.map((row) => row[x]);
/**
 * 获取格子周围所有空白格子
 * @param point 格子定位
 * @param boxes 格子所在容器
 * @returns 周围所有空白格子
 */
const getRound = (point: number[], boxes: number[][]): number[][] => {
    const x = point[0],
        y = point[1];
    return [
        [x, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
    ].filter((item) => boxes[item[1]]?.[item[0]] === 0);
};
class AI {
    static calculateCount: number = 0;
    static calculate(block: Shape, container: Container, res: AnalysisResult[]): Promise<AnalysisResult> {
        this.calculateCount++;
        return new Promise((resolve) => {
            setTimeout(() => {
                container = container.clone();
                const col = container[0].length;
                let gap = 0,
                    obstacle = 0,
                    vertical = 0,
                    horizontal = col;
                const clear = container.clear();
                const position = block.worldPosition();
                position.forEach((point) => {
                    horizontal += Math.abs(point[0] - col / 2);
                    vertical += point[1];
                });
                horizontal /= position.length;
                vertical /= position.length;
                const liveCache: number[][] = [];
                let deadCache: number[][] = [];
                container.forEach((row, y) => {
                    row.forEach((box, x) => {
                        if (box === 0) {
                            const gapCache: number[][] = [];
                            let livePoint: number[] | null = null;
                            const live = (point: number[]): boolean => {
                                livePoint = null;
                                const no = point[0] + ',' + point[1];
                                gapCache.push(point);
                                let isLive = liveCache.findIndex((item) => item[0] + ',' + item[1] === no) !== -1;
                                const isDead = deadCache.findIndex((item) => item[0] + ',' + item[1] === no) !== -1;
                                if (isLive) {
                                    livePoint = point;
                                } else if (!isDead) {
                                    isLive = container[point[1]].every((temp) => temp === 0);
                                    if (isLive) {
                                        liveCache.push(point);
                                        livePoint = point;
                                    } else {
                                        deadCache.push(point);
                                        isLive = getRound(point, container).some(live);
                                    }
                                }
                                return isLive;
                            };
                            if (live([x, y]) && Math.abs(livePoint![0] - x) < 2 && Math.abs(livePoint![1] - y) < 5) {
                                deadCache = deadCache.filter((no) => gapCache.indexOf(no) === -1);
                                liveCache.push(...gapCache);
                            } else {
                                gap++;
                            }
                            obstacle += getCol(container, x).filter((box, index) => index < y && box !== 0).length;
                        }
                    });
                });
                let weight = [0, 50, 200, 9999][clear];
                weight += horizontal * 1;
                weight += vertical * 5;
                weight += gap * -5;
                weight += obstacle * -3;
                const resolution = {
                    weight,
                    gap,
                    obstacle,
                    horizontal,
                    vertical,
                    clear,
                    task: [],
                    block: block.clone(),
                    container: container.clone(),
                    next: null,
                };
                res.push(resolution);
                resolve(resolution);
            }, 0);
        });
    }
    static valite(block: Shape, container: Container, resolution: AnalysisResult): boolean {
        let task: string[] = [];
        const invokeTransform = (block: Shape, resolution: AnalysisResult): boolean => {
            while (resolution.block.direction > block.direction) {
                if (block.transform().collision(container)) {
                    block.direction--;
                    return false;
                }
                task.push('transform');
            }
            return true;
        };
        const invokeLeft = (block: Shape, resolution: AnalysisResult): boolean => {
            while (resolution.block.x < block.x) {
                if (block.left().collision(container)) {
                    block.right();
                    return false;
                }
                task.push('left');
            }
            return true;
        };
        const invokeRight = (block: Shape, resolution: AnalysisResult): boolean => {
            while (resolution.block.x > block.x) {
                if (block.right().collision(container)) {
                    block.left();
                    return false;
                }
                task.push('right');
            }
            return true;
        };
        const invoke = (block: Shape, resolution: AnalysisResult): boolean => {
            task = [];
            let faild: boolean = invokeTransform(block, resolution);
            faild = faild && invokeLeft(block, resolution);
            faild = faild && invokeRight(block, resolution);
            resolution.task = [...task];
            return faild;
        };
        return invoke(block.clone(), resolution);
    }
    static async analysis(block: Shape, container: Container): Promise<AnalysisResult[]> {
        const res: AnalysisResult[] = [];
        const queue: Promise<AnalysisResult>[] = [];
        // 备份数据
        block = block.clone();
        container = container.clone();
        // 直接落下
        for (let i = 0; i < 4; i++) {
            const tempBlock = block.clone().done(container);
            const tempContainer = container.clone(tempBlock);
            queue.push(this.calculate(tempBlock, tempContainer, res));
            // 变形
            if (block.transform().collision(container)) {
                block.direction = 0;
                break;
            }
        }
        // 左移
        for (let i = 0; i < 4; i++) {
            const tempBlock = block.clone();
            while (!tempBlock.left().collision(container)) {
                const temp = tempBlock.clone().done(container);
                const tempContainer = container.clone(temp);
                queue.push(this.calculate(temp, tempContainer, res));
            }
            // 变形
            if (block.transform().collision(container)) {
                block.direction = 0;
                break;
            }
        }
        // 右移
        for (let i = 0; i < 4; i++) {
            const tempBlock = block.clone();
            while (!tempBlock.right().collision(container)) {
                const temp = tempBlock.clone().done(container);
                const tempContainer = container.clone(temp);
                queue.push(this.calculate(temp, tempContainer, res));
            }
            // 变形
            if (block.transform().collision(container)) {
                block.direction = 0;
                break;
            }
        }
        await Promise.all(queue);
        return res;
    }
    static async policy(
        blocks: Shape[],
        container: Container,
        want: number = 1,
        index: number = 0
    ): Promise<AnalysisResult[]> {
        const res = [];
        const block = blocks[index];
        const resolutions = await this.analysis(block, container);
        resolutions.sort((prev, next) => next.weight - prev.weight);
        let count = 0;
        while (res.length < want && count < resolutions.length) {
            const resolution = resolutions[count++];
            if (this.valite(block, container, resolution)) {
                res.push(resolution);
                if (index < blocks.length - 1) {
                    resolution.next = (await this.policy(blocks, resolution.container, want, index + 1))[0];
                }
            }
        }
        const weight = (resulotion: AnalysisResult | null): number =>
            resulotion ? 0 : resulotion!.weight + weight(resulotion!.next);
        res.sort((prev, next) => weight(next) - weight(prev));
        return res;
    }
    static async action(block: Shape, next: Shape[], container: Container): Promise<string[]> {
        this.calculateCount = 0;
        const resolutions = await this.policy([block, ...next], container, 3);
        console.info('计算次数', this.calculateCount);
        return resolutions[0]?.task || [];
    }
}

self.onmessage = async (e) => {
    if (typeof e.data === 'string') {
        const data = JSON.parse(e.data);
        self.postMessage(
            await AI.action(Shape.parse(data.block), data.next.map(Shape.parse), Container.parse(data.container))
        );
    }
};
