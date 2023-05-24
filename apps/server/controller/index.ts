import { testController } from './test';
import { userController } from './user';
import { fileController } from './file';
import { Application, Router, json } from 'express';
import { config } from '../config';
const { base } = config;
export const setup = (app: Application) => {
    const router = Router();
    router.use(json());
    router.use('/test', testController);
    router.use('/user', userController);
    router.use('/file', fileController);
    app.use(base, router);
};
