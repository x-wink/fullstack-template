import { testController } from './test';
import { userController } from './user';
import { fileController } from './file';
import { chatController } from './chat';
import { Application, Router, json } from 'express';
import { config } from '../utils';
export const setup = (app: Application) => {
    const router = Router();
    router.use(json());
    router.use('/test', testController);
    router.use('/user', userController);
    router.use('/file', fileController);
    app.use(config.publish.base, router);
    app.use('/chat', chatController);
};
