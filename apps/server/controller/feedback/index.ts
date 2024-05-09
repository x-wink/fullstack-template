import { Router } from 'express';
import type { FeedbackData } from '@pkgs/model';
import { Page } from '@pkgs/model';
import { Feedback, Res } from '@pkgs/model';
import { createFeedback, getFeedback, pageFeedback, removeFeedback, updateFeedback } from '../../service';
export const feedbackController: Router = Router();

feedbackController.get<string, { id: number }, Res<Feedback>>('/:id', async (req, res) => {
    res.send(Res.success(await getFeedback(req.params.id)));
});

feedbackController.get<string, { pageIndex: number; pageSize: number }, Res<Page<Feedback>>, never, FeedbackData>(
    '/:pageIndex/:pageSize',
    async (req, res) => {
        res.send(
            Res.success(
                new Page(
                    await pageFeedback({
                        where: new Feedback(req.query),
                        page: [+req.params.pageIndex, +req.params.pageSize],
                    })
                )
            )
        );
    }
);

feedbackController.post<string, never, Res<number>, FeedbackData>('/', async (req, res) => {
    res.send(Res.success(await createFeedback([new Feedback(req.body)])));
});

feedbackController.put<string, never, Res<boolean>, FeedbackData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await getFeedback(id);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateFeedback(new Feedback(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

feedbackController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeFeedback(req.params.ids.split(',').map(Number))));
});

export default (router: Router) => {
    router.use('/feedback', feedbackController);
};
