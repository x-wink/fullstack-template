import { Router } from 'express';
import type { MessageData } from '@pkgs/model';
import { Page } from '@pkgs/model';
import { Message, Res } from '@pkgs/model';
import { createMessage, getMessage, pageMessage, removeMessage, updateMessage } from '../../service';
export const messageController: Router = Router();

messageController.get<string, { id: number }, Res<Message>>('/:id', async (req, res) => {
    res.send(Res.success(await getMessage(req.params.id)));
});

messageController.get<string, { pageIndex: number; pageSize: number }, Res<Page<Message>>, never, MessageData>(
    '/:pageIndex/:pageSize',
    async (req, res) => {
        res.send(
            Res.success(
                new Page(
                    await pageMessage({
                        where: new Message(req.query),
                        page: [+req.params.pageIndex, +req.params.pageSize],
                    })
                )
            )
        );
    }
);

messageController.post<string, never, Res<number>, MessageData>('/', async (req, res) => {
    res.send(Res.success(await createMessage(new Message(req.body))));
});

messageController.put<string, never, Res<boolean>, MessageData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await getMessage(id);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateMessage(new Message(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

messageController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeMessage(req.params.ids.split(',').map(Number))));
});

export default (router: Router) => {
    router.use('/message', messageController);
};
