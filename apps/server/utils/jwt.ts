import jwt from 'jsonwebtoken';
import { config } from './config';
const {
    jwt: { secret, expires },
} = config;
export const encode = (content: Record<string, unknown>) => {
    return jwt.sign(content, secret, {
        expiresIn: expires,
    });
};
export const decode = (token: string) => {
    return jwt.decode(token, { json: true });
};
export const verify = (token: string) => {
    let res = true;
    try {
        jwt.verify(token, secret);
    } catch (e) {
        res = false;
    }
    return res;
};
