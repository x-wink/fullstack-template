import { RequestHandler } from 'express';
import { useAccessLogger } from '../utils';

const logger = useAccessLogger();
const RES_REG = /\..+$/;
export const accessHandler: RequestHandler = (req, res, next) => {
    // 过滤静态资源请求
    if (!RES_REG.test(req.url)) {
        const log = (res.statusCode === 200 ? logger.info : logger.warn).bind(logger);
        log(`${new Date().toLocaleString()} ${res.statusCode} [${req.method}] ${req.url}`);
    }
    next();
};
