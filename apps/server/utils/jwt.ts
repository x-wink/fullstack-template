import jwt from 'jsonwebtoken';
import { config } from './config';
const { JWTSecretKey, JWTExpiress } = config;
export const encode = (content: Record<string, unknown>) => {
    return jwt.sign(content, JWTSecretKey, {
        expiresIn: JWTExpiress,
    });
};
export const decode = (token: string) => {
    return jwt.decode(token, { json: true });
};
export const verify = (token: string) => {
    let res = true;
    try {
        jwt.verify(token, JWTSecretKey);
    } catch (e) {
        res = false;
    }
    return res;
};
