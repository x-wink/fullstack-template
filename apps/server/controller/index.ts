import systemSetup from './system';
import wechatSetup from './wechat';
import demoSetup from './demo';
import type { Application } from 'express';
import { Router } from 'express';
import { config } from '../utils';
export default (app: Application) => {
    const router = Router();
    systemSetup(router);
    wechatSetup(router);
    demoSetup(router);
    app.use(config.publish.base, router);
};
