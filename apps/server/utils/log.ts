import { configure, getLogger, levels } from 'log4js';
import { isDev, config } from './config';
import path from 'path';
import type { Response } from 'express';
import { Res } from '@pkgs/model';
const {
    dir: { log },
} = config;
configure({
    appenders: {
        file: { type: 'file', filename: path.resolve(log, 'out.log') },
        console: { type: 'console' },
        date: {
            type: 'dateFile',
            filename: path.resolve(log, 'access.log'),
            pattern: 'yyyyMMdd',
            alwaysIncludePattern: true,
            keepFileExt: true,
            compress: true,
        },
    },
    categories: {
        default: { appenders: isDev ? ['file', 'console'] : ['file'], level: isDev ? 'debug' : 'info' },
        access: { appenders: ['date'], level: isDev ? 'debug' : 'info' },
    },
});
export const useLogger = (category = 'global', level = levels.DEBUG) => {
    const logger = getLogger(category);
    logger.level = level;
    return logger;
};
export const useAccessLogger = () => useLogger('access');

export const logger = useLogger();
export const createErrorHandler = (res: Response) => {
    return (e: Error) => {
        logger.error(e);
        if (!res.writableFinished && !res.destroyed && !res.closed) {
            res.status(200);
            res.send(Res.error(e.message ?? e));
        }
    };
};
