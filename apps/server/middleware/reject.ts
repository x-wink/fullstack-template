import { RequestHandler } from 'express';
import { createErrorHandler } from '../utils';

export const rejectHandler: RequestHandler = (req, res, next) => {
    process.once('unhandledRejection', createErrorHandler(res, 'reject'));
    process.once('uncaughtException', createErrorHandler(res, 'exception'));
    next();
};
