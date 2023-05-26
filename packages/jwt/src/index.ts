import jwt from 'jsonwebtoken';
export const decode = <T = Record<string, unknown>>(token: string) => {
    return jwt.decode(token, { json: true }) as (T & jwt.JwtPayload) | null;
};
export const useJWT = (secret: string, options?: jwt.SignOptions) => {
    const encode = (content: Record<string, unknown>) => {
        return jwt.sign(content, secret, options);
    };
    const verify = (token: string) => {
        let res = true;
        try {
            jwt.verify(token, secret);
        } catch (e) {
            res = false;
        }
        return res;
    };
    return {
        encode,
        decode,
        verify,
    };
};
