import { testController } from './test';
import { userController } from './user';
import { fileController } from './file';
import { Application } from 'express';
export const setup = (app: Application) => {
    app.use('/test', testController);
    app.use('/user', userController);
    app.use('/file', fileController);
};
