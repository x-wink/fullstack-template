import { fileURLToPath, URL } from 'node:url';

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
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
            port: 5173,
            open: false,
            proxy: {
                [env.VITE_API_BASE_URL]: {
                    target: env.VITE_PROXY_TARGET,
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(new RegExp('^' + env.VITE_API_BASE_URL), ''),
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
            legacy({
                targets: ['defaults', 'not IE 11', 'chrome 52'],
            }),
        ],
    } as UserConfig;
};
