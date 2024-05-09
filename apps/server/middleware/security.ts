import type { Request, RequestHandler } from 'express';
import { Res } from '@pkgs/model';
import { useSession, verify } from '../utils';
import { exprised } from '@pkgs/jwt';

export const security = (whiteList: string[]): RequestHandler[] => {
    const allowGuest = (req: Request) => whiteList.some((item) => req.url.startsWith(item));
    return [
        // 过滤未授权请求，放行白名单
        (req, res, next) => {
            const { getToken } = useSession(req);
            if (allowGuest(req) || getToken()) {
                next();
            } else {
                res.send(Res.forbidden());
            }
        },
        // 校验token
        async (req, res, next) => {
            const { getToken } = useSession(req);
            const token = getToken();
            if (allowGuest(req) || !token || (await verify(token))) {
                if (token && exprised(token)) {
                    res.send(Res.forbidden('登录信息已过期，请重新登录'));
                } else {
                    next();
                }
            } else {
                res.send(Res.forbidden('身份校验失败'));
            }
        },
    ];
};
