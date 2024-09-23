import { accessHandler } from './access';
import { json, type Application } from 'express';
import { errorHandler } from './error';
import { notFoundHandler } from './notFound';
import { rejectHandler } from './reject';
import { config } from '../utils';
import { security } from './security';
const {
    publish: { base },
} = config;
/**
 * 路由注册前的中间件
 */
export const preSetup = (app: Application) => {
    app.use(json());
    app.use(base, accessHandler);
    app.use(base, security(['/demo', '/sys/user/signin', '/sys/user/signup', '/wechat/']));
    app.use(rejectHandler);
};
/**
 * 路由注册后的中间件
 */
export const postSetup = (app: Application) => {
    app.use(notFoundHandler);
    app.use(errorHandler);
};
