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
    constructor(name: string, control: Control, stop: Function) {
        super(name);
        this.stop = stop;
        control.init(this);
    }
}
/**
 * 控制器
 */
export class Control {
    /**
     * 方块变形按键
     */
    up: string;
    /**
     * 方块右移按键
     */
    right: string;
    /**
     * 方块下落按键
     */
    down: string;
    /**
     * 方块左移按键
     */
    left: string;
    /**
     * 玩家暂停按键
     */
    stop: string;
    constructor(up: string, right: string, down: string, left: string, stop: string) {
        this.up = up;
        this.right = right;
        this.down = down;
        this.left = left;
        this.stop = stop;
    }
    init(player: Person): void {
        window.addEventListener('keydown', (e) => {
            if (player.current) {
                switch (e.key) {
                    case this.up:
                        if (player.current.transform().collision(player.boxes)) {
                            player.current.direction--;
                        }
                        break;
                    case this.right:
                        if (player.current.right().collision(player.boxes)) {
                            player.current.left();
                        }
                        break;
                    case this.down:
                        player.current.done(player.boxes);
                        break;
                    case this.left:
                        if (player.current.left().collision(player.boxes)) {
                            player.current.right();
                        }
                        break;
                    case this.stop:
                        player.stop();
                        break;
                }
            }
        });
    }
}
