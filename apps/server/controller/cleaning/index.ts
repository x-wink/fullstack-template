import { Router } from 'express';
import type { CleanTaskData } from '@pkgs/model';
import { Page } from '@pkgs/model';
import { CleanTask, Res } from '@pkgs/model';
import { createCleanTask, getCleanTask, pageCleanTask, removeCleanTask, updateCleanTask } from '../../service';
export const cleaningController: Router = Router();

cleaningController.get<string, { id: number }, Res<CleanTask>>('/:id', async (req, res) => {
    res.send(Res.success(await getCleanTask(req.params.id)));
});

cleaningController.get<string, { pageIndex: number; pageSize: number }, Res<Page<CleanTask>>, never, CleanTaskData>(
    '/:pageIndex/:pageSize',
    async (req, res) => {
        res.send(
            Res.success(
                new Page(
                    await pageCleanTask({
                        where: new CleanTask(req.query),
                        page: [+req.params.pageIndex, +req.params.pageSize],
                    })
                )
            )
        );
    }
);

cleaningController.post<string, never, Res<number>, CleanTaskData>('/', async (req, res) => {
    res.send(Res.success(await createCleanTask([new CleanTask(req.body)])));
});

cleaningController.put<string, never, Res<boolean>, CleanTaskData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await getCleanTask(id);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateCleanTask(new CleanTask(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

cleaningController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeCleanTask(req.params.ids.split(',').map(Number))));
});

export default (router: Router) => {
    router.use('/cleaning', cleaningController);
};
