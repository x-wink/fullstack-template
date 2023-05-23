import { accessHandler } from './access';
import { Application } from 'express';
import { errorHandler } from './error';
import { notFoundHandler } from './notFound';
import { rejectHandler } from './reject';
import { resourceHandler } from './resource';
import history from 'connect-history-api-fallback';
/**
 * 路由注册前的中间件
 */
export const preSetup = (app: Application) => {
    app.use(accessHandler);
    app.use(rejectHandler);
};
/**
 * 路由注册后的中间件
 */
export const postSetup = (app: Application) => {
    app.use(history());
    app.use(resourceHandler);
    app.use(notFoundHandler);
    app.use(errorHandler);
};
