import { resolve } from 'path';
import type { Config } from '.';

export const config: Config = {
    base: '/api',
    port: 80,
    sslPort: 0,
    staticDir: resolve(__dirname, '../client'),
    uploadDir: '/uploads',
    sslDir: resolve(__dirname, './ssl'),
    domain: 'xxxx.com',
    JWTSecretKey: 'wink',
    JWTExpiress: 60 * 60 * 24 * 1,
    mysql: {
        host: '',
        port: 3306,
        user: '',
        password: '',
        database: '',
    },
};
