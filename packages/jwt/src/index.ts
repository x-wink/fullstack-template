import type { JWTPayload } from 'jose';
import { SignJWT, decodeJwt, jwtVerify } from 'jose';
export const decode = <T = unknown>(token: string) => {
    return decodeJwt(token) as (T & JWTPayload) | null;
};
export const exprised = (token: string) => {
    let res = true;
    const payload = decode(token);
    if (payload?.exp && payload.exp > Date.now()) {
        res = false;
    }
    return res;
};
export const useJWT = (secret: string, payload?: JWTPayload) => {
    const key = new TextEncoder().encode(secret);
    const encode = async (content: unknown) => {
        return await new SignJWT(
            Object.assign({}, { ...payload, exp: payload?.exp ? payload.exp + Date.now() : void 0 }, content)
        )
            .setProtectedHeader({ alg: 'HS256' })
            .sign(key);
    };
    const verify = async (token: string) => {
        let res = true;
        try {
            await jwtVerify(token, key);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
            res = false;
        }
        return res;
    };
    return {
        encode,
        decode,
        verify,
        exprised,
    };
};
