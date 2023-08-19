import { fileURLToPath, URL } from 'node:url';

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { loadEnv, type ConfigEnv, UserConfig } from 'vite';

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
        build: {
            outDir: '../../dist/client',
            emptyOutDir: true,
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        plugins: [
            vue(),
            AutoImport({
                include: [/\.[jt]sx?$/, /\.vue\??/],
                imports: [
                    'vue',
                    'vue-router',
                    'pinia',
                    {
                        // import { default as axios } from 'axios',
                        axios: [['default', 'axios']],
                        // import { default as qs } from 'qs',
                        qs: [['default', 'qs']],
                    },
                ],
                eslintrc: {
                    enabled: true,
                    filepath: './src/.eslintrc',
                    globalsPropValue: true,
                },
                dts: 'src/auto-imports.d.ts',
            }),
            Components({
                dirs: ['src/components'],
                extensions: ['vue', 'jsx', 'tsx', 'js', 'ts'],
                deep: true,
                dts: 'src/components.d.ts',
                include: [/\.tsx$/, /\.jsx$/, /\.ts$/, /\.js$/, /\.vue$/, /\.vue\?vue/],
                exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/],
            }),
            legacy({
                targets: ['defaults', 'not IE 11', 'chrome 52'],
            }),
        ],
    } as UserConfig;
};
