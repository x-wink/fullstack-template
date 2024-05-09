import { Router } from 'express';
import type { PStatusBooking, BookingData, RSumRoomBooking, RSumStudyTimes, BookingSummary } from '@pkgs/model';
import { BookingCondition } from '@pkgs/model';
import { Page } from '@pkgs/model';
import { Booking, Res } from '@pkgs/model';
import {
    createBooking,
    exportBooking,
    getBooking,
    pageBooking,
    removeBooking,
    statusBooking,
    sumRoomBooking,
    sumStudyTimes,
    updateBooking,
} from '../../service';
export const bookingController: Router = Router();

bookingController.get<string, { roomId: number }, Res<RSumRoomBooking>, never, { date: string }>(
    '/sumRoomBooking/:roomId',
    async (req, res) => {
        res.send(Res.success(await sumRoomBooking(req.params.roomId, new Date(req.query.date))));
    }
);
bookingController.get<string, { userId: number }, Res<RSumStudyTimes>, never, { date: string }>(
    '/sumStudyTimes/:userId',
    async (req, res) => {
        res.send(Res.success(await sumStudyTimes(req.params.userId)));
    }
);
bookingController.get<string, never, Res<BookingSummary[]>, never, BookingCondition>('/export', async (req, res) => {
    res.send(Res.success(await exportBooking(new BookingCondition(req.params))));
});

bookingController.get<string, { id: number }, Res<Booking>>('/:id', async (req, res) => {
    res.send(Res.success(await getBooking(req.params.id)));
});

bookingController.get<string, { pageIndex: number; pageSize: number }, Res<Page<Booking>>, never, BookingCondition>(
    '/:pageIndex/:pageSize',
    async (req, res) => {
        res.send(
            Res.success(
                new Page(
                    await pageBooking(+req.params.pageIndex, +req.params.pageSize, new BookingCondition(req.query))
                )
            )
        );
    }
);

bookingController.post<string, never, Res<number>, BookingData>('/', async (req, res) => {
    res.send(Res.success(await createBooking(new Booking(req.body))));
});

bookingController.put<string, never, Res<boolean>, BookingData>('/', async (req, res) => {
    const id = req.body.id!;
    const entity = await getBooking(id);
    if (entity) {
        Object.assign(entity, req.body);
        res.send(Res.success(await updateBooking(new Booking(entity))));
    } else {
        res.send(Res.forbidden());
    }
});

bookingController.delete<string, { ids: string }, Res<boolean>>('/:ids', async (req, res) => {
    res.send(Res.success(await removeBooking(req.params.ids.split(',').map(Number))));
});

bookingController.put<string, unknown, Res<boolean>, PStatusBooking>('/status', async (req, res) => {
    const { id, status } = req.body;
    const count = await statusBooking(id, status);
    if (count) {
        res.send(Res.success(count));
    } else {
        res.send(Res.error('修改状态失败'));
    }
});
