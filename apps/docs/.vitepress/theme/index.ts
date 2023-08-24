import DefaultTheme from 'vitepress/theme';
import { Theme } from 'vitepress';
import { WinkUI } from '@pkgs/ui';
import './index.less';
export default {
    ...DefaultTheme,
    enhanceApp: async ({ app, router, siteData }) => {
        app.use(WinkUI);
    },
} as Theme;
