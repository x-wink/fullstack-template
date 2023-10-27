export type Keys = 'up' | 'left' | 'down' | 'right' | 'stop' | 'ok';
export type KeyMap = { [P in Keys]?: string };
export type KeyHooks = { [P in Keys]?: () => void };
export class Control {
    hooks: KeyHooks;
    constructor(keyMap: KeyMap, hooks: KeyHooks) {
        this.hooks = hooks;
        const { up, right, down, left, stop, ok } = keyMap;
        onMounted(() => {
            let startX = 0,
                startY = 0;
            window.addEventListener('click', () => {
                this.emit('ok');
            });
            window.addEventListener('touchstart', (e) => {
                startX = e.changedTouches[0].pageX;
                startY = e.changedTouches[0].pageY;
                let needUp = false,
                    needDown = false,
                    needLeft = false,
                    needRight = false;
                const move = (e: TouchEvent) => {
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
                        this.emit('up');
                    } else if (needRight) {
                        this.emit('right');
                    } else if (needLeft) {
                        this.emit('left');
                    } else if (needDown) {
                        this.emit('down');
                    }
                    window.removeEventListener('touchmove', move);
                    window.removeEventListener('touchend', end);
                };
                window.addEventListener('touchmove', move);
                window.addEventListener('touchend', end);
            });

            window.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case up:
                        this.emit('up');
                        break;
                    case right:
                        this.emit('right');
                        break;
                    case down:
                        this.emit('down');
                        break;
                    case left:
                        this.emit('left');
                        break;
                    case stop:
                        this.emit('stop');
                        break;
                    case ok:
                        this.emit('ok');
                        break;
                }
            });
        });
    }
    emit(key: Keys) {
        console.info(key);
        this.hooks[key]?.();
    }
}
