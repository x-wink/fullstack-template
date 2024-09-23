import { Router } from 'express';
import type { LogData } from '@pkgs/model';
import { Log, Res, Page } from '@pkgs/model';
import { createLog, detailLog, pageLog, removeLog, updateLog } from '../../service';

export const logController = Router();

logController.get<string, { id: number }, Res<Log>>('/:id', async (req, res) => {
    res.send(Res.success(await detailLog(req.params.id)));
});

logController.get<string, { pageIndex: number; pageSize: number }, Res<Page<Log>>, never, LogData>(
    '/:pageIndex/:pageSize',
    async (req, res) => {
        res.send(
            Res.success(
                new Page(
                    await pageLog({ where: new Log(req.query), page: [+req.params.pageIndex, +req.params.pageSize] })
                )
            )
        );
    }
);

logController.post<string, never, Res<number>, LogData>('/', async (req, res) => {
    res.send(Res.success(await createLog([new Log(req.body)])));
});

logController.put<string, never, Res<boolean>, LogData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await detailLog(id);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateLog(new Log(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

logController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeLog(req.params.ids.split(',').map(Number))));
});
