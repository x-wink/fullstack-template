import { testController } from './test';
import { userController } from './user';
import { menuController } from './menu';
import { roleController } from './role';
import { logController } from './log';
import { fileController } from './file';
import type { Router } from 'express';
export default (router: Router) => {
    router.use('/sys/test', testController);
    router.use('/sys/user', userController);
    router.use('/sys/menu', menuController);
    router.use('/sys/role', roleController);
    router.use('/sys/log', logController);
    router.use('/sys/file', fileController);
};
