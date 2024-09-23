/* eslint-disable no-console */
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import type { UserConfig } from 'vite';
import { loadEnv, type ConfigEnv } from 'vite';

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv) => {
    const env = loadEnv(configEnv.mode, process.cwd());
    console.info(configEnv);
    console.table(env);
    return {
        base: env.VITE_BASE_URL,
        server: {
            host: '0.0.0.0',
            port: 9999,
            open: false,
            proxy: {
                [env.VITE_API_BASE_URL]: {
                    target: env.VITE_API_PROXY_TARGET,
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(new RegExp('^' + env.VITE_API_BASE_URL), ''),
                },
            },
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
        plugins: [
            {
                name: 'vite-plugin-build-time',
                transformIndexHtml(html: string) {
                    return html.replaceAll('@{build-time}', new Date().toLocaleString());
                },
            },
            vue({
                script: {
                    defineModel: true,
                },
            }),
            AutoImport({
                include: [/\.tsx?$/, /\.vue\??/],
                imports: [
                    'vue',
                    'vue-router',
                    {
                        from: '@pkgs/stores',
                        imports: ['useUserStore'],
                    },
                    {
                        from: '@pkgs/apis',
                        imports: [
                            {
                                name: '*',
                                as: 'api',
                            },
                        ],
                    },
                ],
                eslintrc: {
                    enabled: true,
                    filepath: './src/.eslintrc',
                    globalsPropValue: true,
                },
                dts: './src/auto-imports.d.ts',
            }),
            Components({
                dirs: [],
                resolvers: [
                    (name: string) => {
                        if (name.startsWith('Common')) {
                            return {
                                name,
                                from: '@/components',
                            };
                        }
                    },
                ],
                dts: './src/auto-components.d.ts',
            }),
        ],
    } as UserConfig;
};
