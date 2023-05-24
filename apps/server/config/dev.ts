import { resolve } from 'path';
import type { Config } from '.';
export const config: Config = {
    base: '/api',
    port: 3000,
    sslPort: 0,
    staticDir: resolve(__dirname, '../../../dist/client'),
    uploadDir: resolve(__dirname, '../uploads'),
    sslDir: resolve(__dirname, '../ssl'),
    domain: 'localhost',
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
