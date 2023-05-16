import { RequestHandler } from 'express';
import { Res } from '../entity';

export const notFoundHandler: RequestHandler = (req, res) => {
    res.send(Res.notFound());
};
