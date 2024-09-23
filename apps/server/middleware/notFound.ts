import type { RequestHandler } from 'express';
import { Res } from '@pkgs/model';

export const notFoundHandler: RequestHandler = (req, res) => {
    res.send(Res.notFound());
};
