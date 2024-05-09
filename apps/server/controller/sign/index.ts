import { Router } from 'express';
import type { SignData, Sort } from '@pkgs/model';
import { Page } from '@pkgs/model';
import { Sign, Res } from '@pkgs/model';
import { createSign, getSign, pageSign, removeSign, updateSign } from '../../service';
export const signController: Router = Router();

signController.get<string, { id: number }, Res<Sign>>('/:id', async (req, res) => {
    res.send(Res.success(await getSign(req.params.id)));
});

signController.get<string, { pageIndex: number; pageSize: number }, Res<Page<Sign>>, never, SignData & { sort: Sort }>(
    '/:pageIndex/:pageSize',
    async (req, res) => {
        res.send(
            Res.success(
                new Page(
                    await pageSign(+req.params.pageIndex, +req.params.pageSize, new Sign(req.query), req.query.sort)
                )
            )
        );
    }
);

signController.post<string, never, Res<number>, SignData>('/', async (req, res) => {
    res.send(Res.success(await createSign([new Sign(req.body)])));
});

signController.put<string, never, Res<boolean>, SignData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await getSign(id);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateSign(new Sign(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

signController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeSign(req.params.ids.split(',').map(Number))));
});

export default (router: Router) => {
    router.use('/sign', signController);
};
