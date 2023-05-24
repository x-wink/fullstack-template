import { configure, getLogger, levels } from 'log4js';
import { isDev } from '../config';
configure({
    appenders: {
        file: { type: 'file', filename: 'logs/out.log' },
        console: { type: 'console' },
        date: {
            type: 'dateFile',
            filename: 'logs/access.log',
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
