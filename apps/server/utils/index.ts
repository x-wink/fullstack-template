import { Response } from 'express';
import { Res } from '../entity';
import { useLogger } from './log';
const logger = useLogger();
export const createErrorHandler = (res: Response) => {
    return (e: Error) => {
        logger.error(e);
        if (!res.writableFinished && !res.destroyed && !res.closed) {
            res.status(200);
            res.send(Res.error((e as Error).message ?? e));
        }
    };
};
export * from './log';
