import { testController } from './test';
import { userController } from './user';
import { fileController } from './file';
import { Application } from 'express';
import { config } from '../config';
const { base } = config;
export const setup = (app: Application) => {
    app.use(base + '/test', testController);
    app.use(base + '/user', userController);
    app.use(base + '/file', fileController);
};
