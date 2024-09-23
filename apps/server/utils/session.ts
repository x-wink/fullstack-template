import type { User } from '@pkgs/model';
import { decode } from './jwt';
import type { UnknownRequest } from './type';
export const useSession = (req: UnknownRequest) => {
    const getToken = () =>
        (req.query.authorization ?? req.headers.authorization ?? req.cookies?.authorization) as string | undefined;
    const getUser = (token = getToken()) => {
        if (token) {
            return decode<User>(token) as User;
        }
    };
    return {
        getToken,
        getUser,
    };
};
