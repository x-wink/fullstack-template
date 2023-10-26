import { Shape } from './core';
import Player from './player';

import Author from './mod/wink.ts?worker';
const workers: Record<string, typeof Author> = {};
workers['wink'] = Author;

const loadWorker = (name: string): Worker => {
    return new workers[name]();
};

const sleep = (time: number = 50) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};
/**
 * AI玩家
 */
export default class Robot extends Player {
    next: Shape[] = [];
    ai: string;
    constructor(name: string, ai: string) {
        super(name);
        this.ai = ai;
    }
    onFetch(): void {
        super.onFetch();
        const worker = loadWorker(this.ai);
        let running = false;
        const start = Date.now();
        worker.postMessage(
            JSON.stringify({
                block: this.current,
                next: this.next,
                container: this.boxes,
            })
        );
        const clearId = setTimeout(() => {
            worker.terminate();
            if (!running) {
                console.info('计算超时');
                this.current!.done(this.boxes);
            }
        }, 2000);
        worker.onmessage = async (e) => {
            console.info(Date.now() - start, e.data);
            running = true;
            for (const i in e.data) {
                const action = e.data[i];
                switch (action) {
                    case 'transform':
                        this.current!.transform();
                        await sleep();
                        break;
                    case 'left':
                        this.current!.left();
                        await sleep();
                        break;
                    case 'right':
                        this.current!.right();
                        await sleep();
                        break;
                }
            }
            this.current!.done(this.boxes);
            clearTimeout(clearId);
            worker.terminate();
        };
    }
    onNext(next: Shape[]): void {
        this.next = next;
        super.onNext(next);
    }
}
