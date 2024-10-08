/* eslint-disable no-console */
export interface Config {
    env: 'test' | 'prod';
    publish: {
        base: string;
        domain: string;
        port: number;
        sslPort: number;
    };
    dir: {
        static: string;
        upload: string;
        ssl: string;
        log: string;
    };
    jwt: {
        secret: string;
        expires: number;
    };
    mysql: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
        pool: {
            min: number;
            max: number;
            acquire: number;
            idle: number;
        };
    };
    wechat: {
        token: string;
        appid: string;
        secret: string;
    };
}
export const env = process.env.NODE_ENV ?? 'production';
export const isDev = env === 'development';
import dotenv from 'dotenv';
import { resolve } from 'path';
const { error, parsed: envConfig } = dotenv.config({
    path: resolve(__dirname, isDev ? '../.env' : 'config.env'),
});
if (error) {
    console.error(error);
    throw new Error('获取配置文件失败：' + error.message);
}
import { merge } from 'lodash';
const resolveConfig = (json: Record<string, unknown> = {}) => {
    const res = { env: (process.env.MODE ?? 'prod').trim() } as Record<string, unknown>;
    for (const p in json) {
        if (p.startsWith('dir.')) {
            // 处理路径
            json[p] = resolve(__dirname, isDev ? '../' : './', json[p] as string);
        } else if (!isNaN(Number(json[p]).valueOf())) {
            // 处理数字
            json[p] = Number(json[p]);
        }
        const v = p
            .split('.')
            .reverse()
            .reduce((obj, item) => {
                return {
                    [item]: obj,
                };
            }, json[p]) as Record<string, unknown>;
        merge(res, v);
    }
    return res as unknown as Config;
};
export const config = resolveConfig(envConfig);
