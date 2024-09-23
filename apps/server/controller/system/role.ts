import { Router } from 'express';
import type { PStatusRole, RoleData } from '@pkgs/model';
import { Role, Res } from '@pkgs/model';
import { createRole, getRole, searchRole, removeRole, updateRole } from '../../service';
import type { UnknownRequest } from '../../utils';

export const roleController = Router();

roleController.get<string, { id: number }, Res<Role>>('/:id', async (req, res) => {
    res.send(Res.success(await getRole(req.params.id, req as UnknownRequest)));
});

roleController.get<string, never, Res<Role[]>, never, RoleData>('/', async (req, res) => {
    res.send(
        Res.success(
            await searchRole(req as UnknownRequest, {
                where: new Role(req.query),
            })
        )
    );
});

roleController.post<string, never, Res<number>, RoleData>('/', async (req, res) => {
    res.send(Res.success(await createRole(new Role(req.body))));
});

roleController.put<string, never, Res<boolean>, RoleData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await getRole(id, req as UnknownRequest);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateRole(new Role(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

roleController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeRole(req.params.ids.split(',').map(Number))));
});

roleController.put<string, unknown, Res<boolean>, PStatusRole>('/status', async (req, res) => {
    const { id, enabled } = req.body;
    const entity = await getRole(id, req as UnknownRequest);
    if (entity) {
        entity.enabled = enabled;
        const count = await updateRole(new Role(entity));
        if (count) {
            res.send(Res.success(count));
        } else {
            res.send(Res.error('修改状态失败'));
        }
    } else {
        res.send(Res.forbidden());
    }
});
