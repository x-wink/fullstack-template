import { Router } from 'express';
import type { PStatusTime, TimeData } from '@pkgs/model';
import { Page } from '@pkgs/model';
import { Time, Res } from '@pkgs/model';
import { createTime, getTime, pageTime, removeTime, updateTime } from '../../service';
export const timeController: Router = Router();

timeController.get<string, { id: number }, Res<Time>>('/:id', async (req, res) => {
    res.send(Res.success(await getTime(req.params.id)));
});

timeController.get<string, { pageIndex: number; pageSize: number }, Res<Page<Time>>, never, TimeData>(
    '/:pageIndex/:pageSize',
    async (req, res) => {
        res.send(
            Res.success(
                new Page(
                    await pageTime({
                        where: new Time(req.query),
                        page: [+req.params.pageIndex, +req.params.pageSize],
                    })
                )
            )
        );
    }
);

timeController.post<string, never, Res<number>, TimeData>('/', async (req, res) => {
    res.send(Res.success(await createTime([new Time(req.body)])));
});

timeController.put<string, never, Res<boolean>, TimeData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await getTime(id);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateTime(new Time(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

timeController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeTime(req.params.ids.split(',').map(Number))));
});

timeController.put<string, unknown, Res<boolean>, PStatusTime>('/status', async (req, res) => {
    const { id, enabled } = req.body;
    const entity = await getTime(id);
    if (entity) {
        entity.enabled = enabled;
        const count = await updateTime(new Time(entity));
        if (count) {
            res.send(Res.success(count));
        } else {
            res.send(Res.error('修改状态失败'));
        }
    } else {
        res.send(Res.forbidden());
    }
});
