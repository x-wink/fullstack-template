import { roomController } from './room';
import { timeController } from './time';
import { bookingController } from './booking';
import type { Router } from 'express';
export default (router: Router) => {
    router.use('/reserve/room', roomController);
    router.use('/reserve/time', timeController);
    router.use('/reserve/booking', bookingController);
};
