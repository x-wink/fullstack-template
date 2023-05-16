export interface Config {
    port: number;
    sslPort: number;
    staticDir: string;
    uploadDir: string;
    sslDir: string;
    domain: string;
    mysql: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    };
}
export const env = process.env.NODE_ENV || 'production';
export const isDev = env === 'development';
import { config as devConfig } from './dev';
import { config as prodConfig } from './prod';
export const config = isDev ? devConfig : prodConfig;
