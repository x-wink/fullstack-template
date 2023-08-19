import DefaultTheme from 'vitepress/theme';
import { XIcon } from '@pkgs/ui';
export default {
    ...DefaultTheme,
    enhanceApp: async ({ app, router, siteData }) => {
        app.component('XIcon', XIcon);
    },
};
