import { Router } from 'express';
import { Res } from '@pkgs/model';
export const demoController: Router = Router();

demoController.get<string, { id: number }, Res<string>>('/:id', (req, res) => {
    res.send(Res.success(`你的ID：${req.params.id}`));
});

demoController.get<string, never, Res<string>, never, { nickname: string }>('/', (req, res) => {
    res.send(Res.success(`你的姓名：${req.query.nickname}`));
});

demoController.post<string, never, Res<string>, { username: string }>('/', (req, res) => {
    res.send(Res.success(`你的账号：${req.body.username}`));
});

export default (router: Router) => {
    router.use('/demo', demoController);
};
