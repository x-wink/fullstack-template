import svgLoader from 'vite-svg-loader';
import { UserConfig } from 'vite';

// https://vitejs.dev/config/
export default () => {
    return {
        build: {
            outDir: 'dist',
            lib: {
                entry: './src/main.ts',
                name: 'icons',
                formats: ['es'],
            },
        },
        plugins: [svgLoader()],
    } as UserConfig;
};
