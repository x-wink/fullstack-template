/* eslint-disable no-console */
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import legacy from '@vitejs/plugin-legacy';
import type { UserConfig } from 'vite';
import { loadEnv, type ConfigEnv } from 'vite';
import type { ImportInfo } from 'unplugin-vue-components/types';

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv) => {
    const env = loadEnv(configEnv.mode, process.cwd());
    console.info(configEnv);
    console.table(env);
    return {
        base: env.VITE_BASE_URL,
        server: {
            host: '0.0.0.0',
            port: 9527,
            open: false,
            proxy: {
                [env.VITE_API_BASE_URL]: {
                    target: env.VITE_API_PROXY_TARGET,
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(new RegExp('^' + env.VITE_API_BASE_URL), ''),
                },
                [env.VITE_WS_BASE_URL]: {
                    target: env.VITE_WS_PROXY_TARGET,
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(new RegExp('^' + env.VITE_WS_BASE_URL), ''),
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
                    return html.replace(/@\{build-time\}/g, new Date().toLocaleString());
                },
            },
            vue({
                script: {
                    defineModel: true,
                },
            }),
            AutoImport({
                include: [/\.[jt]sx?$/, /\.vue\??/],
                imports: [
                    'vue',
                    'vue-router',
                    'pinia',
                    {
                        // import { default as axios } from 'axios',
                        axios: [['default', 'axios']],
                    },
                    {
                        from: '@pkgs/stores',
                        imports: ['useUserStore', 'useLayoutStore'],
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
                dirs: ['src/components'],
                extensions: ['vue', 'tsx'],
                deep: true,
                dts: 'src/components.d.ts',
                include: [/\.tsx$/, /\.vue$/],
                resolvers: [
                    {
                        type: 'component',
                        resolve: (name: string) => {
                            if (/X[A-Z]/.test(name)) {
                                return {
                                    name,
                                    from: '@pkgs/ui',
                                } as ImportInfo;
                            }
                        },
                    },
                ],
            }),
            legacy({
                targets: [
                    'last 2 versions and not dead',
                    '> 0.3%',
                    'Firefox ESR',
                    'Chrome >= 70',
                    'Android >= 56',
                    'ios_saf >= 11',
                    'safari >= 11',
                    'not IE 11',
                ],
            }),
        ],
    } as UserConfig;
};
