import type { Request } from 'express';
export type UnknownRequest = Request<unknown, unknown, unknown, Record<string, unknown>>;
export type Condition<T> = {
    [K in keyof T]?: T[K] | T[K][];
};
