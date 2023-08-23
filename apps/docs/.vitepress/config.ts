import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'WINK-UI',
    description: 'A vue3 components libary',
    base: '/wink-ui/',
    srcDir: 'src',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: {
            dark: '/logo-dark.svg',
            light: '/logo.svg',
        },
        nav: [
            { text: '首页', link: '/' },
            { text: '示例', link: '/examples/icon/index' },
            { text: '入门', link: '/starter/install' },
        ],
        sidebar: {
            '/examples/': [
                {
                    text: '基础组件',
                    items: [
                        { text: '图标', link: '/examples/icon/index' },
                        { text: '按钮', link: '/examples/button/index' },
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
        aside: true,
        socialLinks: [
            { icon: { svg: 'Site' }, link: 'https://xiangwenke.love/' },
            { icon: 'github', link: 'https://github.com/x-wink' },
        ],
        outline: 'deep',
        outlineTitle: '本页大纲',
        footer: {
            message: '寻找小伙伴一起开源',
            copyright:
                '<a data-v-3a6926c8="" href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2021019875号</a>',
        },
        editLink: {
            pattern: 'https://github.com/x-wink/fullstack-template/tree/demo/apps/docs/src/:path',
            text: '编辑此页',
        },
        lastUpdated: {
            text: '最后更新时间',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium',
            },
        },
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索',
                    },
                    modal: {
                        displayDetails: '显示详情',
                        resetButtonTitle: '重置搜索',
                        backButtonTitle: '返回',
                        noResultsText: '没有相关内容',
                        footer: {
                            selectText: '跳转',
                            navigateText: '选择',
                            closeText: '关闭',
                        },
                    },
                },
            },
        },
        docFooter: {
            prev: '上一章节',
            next: '下一章节',
        },
        darkModeSwitchLabel: '主题',
        sidebarMenuLabel: '目录',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '选择语言',
        externalLinkIcon: true,
    },
    vite: {
        server: {
            port: 9527,
            host: '0.0.0.0',
        },
    },
});
