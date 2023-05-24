import { RequestHandler } from 'express';
import { useAccessLogger } from '../utils';

const logger = useAccessLogger();
export const accessHandler: RequestHandler = (req, res, next) => {
    const log = (res.statusCode === 200 ? logger.info : logger.warn).bind(logger);
    log(`${new Date().toLocaleString()} ${res.statusCode} [${req.method}] ${req.url}`);
    next();
};
