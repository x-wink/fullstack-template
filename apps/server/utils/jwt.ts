import { config } from './config';
import { useJWT } from '@pkgs/jwt';
const {
    jwt: { secret, expires },
} = config;
const jwt = useJWT(secret, { exp: expires });
export const encode = jwt.encode;
export const decode = jwt.decode;
export const verify = jwt.verify;
