import Player from './player';
/**
 * 真人玩家
 */
export class Person extends Player {
    stop: Function;
    /**
     * @param control 控制器
     * @param stop 游戏暂停函数
     */
    constructor(name: string, stop: Function) {
        super(name);
        this.stop = stop;
    }
}
