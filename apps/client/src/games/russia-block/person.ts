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
        const up = () => {
            if (player.current?.transform().collision(player.boxes)) {
                player.current.direction--;
            }
        };
        const right = () => {
            if (player.current?.right().collision(player.boxes)) {
                player.current.left();
            }
        };
        const left = () => {
            if (player.current?.left().collision(player.boxes)) {
                player.current.right();
            }
        };
        const down = (done = true) => {
            if (done) {
                player.current?.done(player.boxes);
            } else if (player.current?.down().collision(player.boxes)) {
                player.current.y--;
            }
        };

        let startX = 0,
            startY = 0;
        document.body.addEventListener('click', () => {
            up();
        });
        document.body.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startX = e.changedTouches[0].pageX;
            startY = e.changedTouches[0].pageY;
            let needUp = false,
                needDown = false,
                needLeft = false,
                needRight = false;
            const move = (e: TouchEvent) => {
                e.preventDefault();
                const moveEndX = e.changedTouches[0].pageX;
                const moveEndY = e.changedTouches[0].pageY;
                const X = moveEndX - startX,
                    Y = moveEndY - startY;
                if (Math.abs(X) > Math.abs(Y) && X > 0) {
                    needRight = true;
                } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                    needLeft = true;
                } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
                    needDown = true;
                } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
                    needUp = true;
                } else {
                    console.info('滑了个寂寞');
                }
            };
            const end = () => {
                if (needUp) {
                    up();
                } else if (needRight) {
                    right();
                } else if (needLeft) {
                    left();
                } else if (needDown) {
                    down(false);
                }
                document.body.removeEventListener('touchmove', move);
                document.body.removeEventListener('touchend', end);
            };
            document.body.addEventListener('touchmove', move);
            document.body.addEventListener('touchend', end);
        });

        document.body.addEventListener('keydown', (e) => {
            if (player.current) {
                switch (e.key) {
                    case this.up:
                        up();
                        break;
                    case this.right:
                        right();
                        break;
                    case this.down:
                        down();
                        break;
                    case this.left:
                        left();
                        break;
                    case this.stop:
                        player.stop();
                        break;
                }
            }
        });
    }
}
