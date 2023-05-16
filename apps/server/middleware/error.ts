import { ErrorRequestHandler } from 'express';
import { createErrorHandler } from '../utils';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    createErrorHandler(res, 'global')(err);
    // 必须要接收4个参数才算是异常处理器
    next;
};
