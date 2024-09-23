import { Router } from 'express';
import type { MenuData, PStatusMenu } from '@pkgs/model';
import { Menu, Res } from '@pkgs/model';
import type { TreeNode } from '@xwink/utils';
import { buildTree } from '@xwink/utils';
import { createMenu, getMenu, searchMenu, removeMenu, updateMenu } from '../../service';
import type { UnknownRequest } from '../../utils';

export const menuController = Router();

menuController.get<string, { id: number }, Res<Menu>>('/:id', async (req, res) => {
    res.send(Res.success(await getMenu(req.params.id, req as UnknownRequest)));
});

menuController.get<string, never, Res<TreeNode[]>, never, MenuData>('/', async (req, res) => {
    res.send(
        Res.success(
            buildTree(
                (await searchMenu(req as UnknownRequest, { where: new Menu(req.query) })).map((item) => new Menu(item))
            )
        )
    );
});

menuController.post<string, never, Res<number>, MenuData>('/', async (req, res) => {
    res.send(Res.success(await createMenu([new Menu(req.body)])));
});

menuController.put<string, never, Res<boolean>, MenuData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await getMenu(id, req as UnknownRequest);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateMenu(new Menu(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

menuController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeMenu(req.params.ids.split(',').map(Number))));
});

menuController.put<string, unknown, Res<boolean>, PStatusMenu>('/status', async (req, res) => {
    const { id, visible } = req.body;
    const entity = await getMenu(id, req as UnknownRequest);
    if (entity) {
        entity.visible = visible;
        const count = await updateMenu(new Menu(entity));
        if (count) {
            res.send(Res.success(count));
        } else {
            res.send(Res.error('修改可见性失败'));
        }
    } else {
        res.send(Res.forbidden());
    }
});
