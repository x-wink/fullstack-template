import { Router } from 'express';
import type { PApprovalUser, PSignin, PStatusUser, Student, UserData } from '@pkgs/model';
import { Page } from '@pkgs/model';
import { User, Res } from '@pkgs/model';
import { approvalSignup, createUser, getUser, pageUser, removeUser, signin, signup, updateUser } from '../../service';
import { logger } from '../../utils';

export const userController = Router();

userController.get<string, { id: number }, Res<User>>('/:id', async (req, res) => {
    res.send(Res.success(await getUser(req.params.id)));
});

userController.get<string, { pageIndex: number; pageSize: number }, Res<Page<User>>, never, UserData>(
    '/:pageIndex/:pageSize',
    async (req, res) => {
        res.send(
            Res.success(new Page(await pageUser(+req.params.pageIndex, +req.params.pageSize, new User(req.query))))
        );
    }
);

userController.post<string, never, Res<number>, UserData>('/', async (req, res) => {
    res.send(Res.success(await createUser(new User(req.body))));
});

userController.put<string, never, Res<boolean>, UserData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await getUser(id);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateUser(new User(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

userController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeUser(req.params.ids.split(',').map(Number))));
});

userController.post<string, unknown, Res<string>, PSignin>('/signin', async (req, res) => {
    const token = await signin(req.body);
    if (token) {
        res.send(Res.success(token));
    } else {
        res.send(Res.error('用户名或密码错误'));
    }
});

userController.post<string, unknown, Res<number>, Student>('/signup', async (req, res) => {
    try {
        const id = await signup(req.body);
        res.send(Res.success(id));
    } catch (e) {
        logger.error(e);
        res.send(Res.error((e as Error).message));
    }
});

userController.put<string, unknown, Res<boolean>, PStatusUser>('/status', async (req, res) => {
    const { id, enabled } = req.body;
    const entity = await getUser(id);
    if (entity) {
        entity.enabled = enabled;
        const count = await updateUser(new User(entity));
        if (count) {
            res.send(Res.success(count));
        } else {
            res.send(Res.error('修改状态失败'));
        }
    } else {
        res.send(Res.forbidden());
    }
});

userController.put<string, unknown, Res<boolean>, PApprovalUser>('/approval', async (req, res) => {
    const { id, status } = req.body;
    const count = await approvalSignup(id, status);
    if (count) {
        res.send(Res.success(count));
    } else {
        res.send(Res.error('审核失败'));
    }
});
