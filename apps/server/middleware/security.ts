import { Request, RequestHandler } from 'express';
import { Res } from '../entity';

export const security = (whiteList: string[]): RequestHandler[] => {
    const getToken = (req: Request) =>
        req.query.authorization ?? req.headers.authorization ?? req.cookies?.authorization;
    return [
        // 过滤未授权请求，放行白名单
        (req, res, next) => {
            const token = getToken(req);
            if (token || whiteList.some((item) => req.url.startsWith(item))) {
                next();
            } else {
                res.send(Res.forbidden());
            }
        },
        // 解析token
        (req, res, next) => {
            // TODO 集成jwt
            next();
        },
    ];
};
