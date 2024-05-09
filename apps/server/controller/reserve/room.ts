import { Router } from 'express';
import type { PStatusRoom, RoomData } from '@pkgs/model';
import { Page } from '@pkgs/model';
import { Room, Res } from '@pkgs/model';
import { createRoom, getRoom, pageRoom, removeRoom, updateRoom } from '../../service';
export const roomController: Router = Router();

roomController.get<string, { id: number }, Res<Room>>('/:id', async (req, res) => {
    res.send(Res.success(await getRoom(req.params.id)));
});

roomController.get<string, { pageIndex: number; pageSize: number }, Res<Page<Room>>, never, RoomData>(
    '/:pageIndex/:pageSize',
    async (req, res) => {
        res.send(
            Res.success(
                new Page(
                    await pageRoom({
                        where: new Room(req.query),
                        page: [+req.params.pageIndex, +req.params.pageSize],
                    })
                )
            )
        );
    }
);

roomController.post<string, never, Res<number>, RoomData>('/', async (req, res) => {
    res.send(Res.success(await createRoom(new Room(req.body))));
});

roomController.put<string, never, Res<boolean>, RoomData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await getRoom(id);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateRoom(new Room(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

roomController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeRoom(req.params.ids.split(',').map(Number))));
});

roomController.put<string, unknown, Res<boolean>, PStatusRoom>('/status', async (req, res) => {
    const { id, enabled } = req.body;
    const entity = await getRoom(id);
    if (entity) {
        entity.enabled = enabled;
        const count = await updateRoom(new Room(entity));
        if (count) {
            res.send(Res.success(count));
        } else {
            res.send(Res.error('修改状态失败'));
        }
    } else {
        res.send(Res.forbidden());
    }
});
