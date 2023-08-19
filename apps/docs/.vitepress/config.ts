import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'WINK-UI',
    description: 'A vue3 components libary',
    base: '/wink-ui/',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '示例', link: '/examples/icon' },
            { text: '入门', link: '/starter/install' },
        ],

        sidebar: {
            '/examples/': [
                {
                    text: '基础组件',
                    items: [
                        { text: '图标', link: '/examples/icon' },
                        { text: '按钮', link: '/examples/button' },
                    ],
                },
            ],
            '/starter/': [
                {
                    text: '快速使用',
                    items: [
                        { text: '安装依赖', link: '/starter/install' },
                        { text: '引入依赖', link: '/starter/import' },
                    ],
                },
            ],
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/x-wink' }],
    },
});
