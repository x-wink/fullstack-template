import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: 'WINK-UI',
    description: 'A vue3 components libary',
    base: '/wink-ui/',
    srcDir: 'src',
    rewrites: {
        'examples/:pkg/index.md': 'examples/:pkg.md',
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: {
            dark: '/logo-dark.svg',
            light: '/logo.svg',
        },
        nav: [
            { text: '首页', link: '/' },
            { text: '示例', link: '/examples/icon' },
            { text: '入门', link: '/guide/install' },
        ],
        sidebar: {
            '/examples/': [
                {
                    text: '基础组件',
                    items: [
                        { text: '图标', link: '/examples/icon' },
                        { text: '文本', link: '/examples/text' },
                        { text: '按钮', link: '/examples/button' },
                        { text: '盒子', link: '/examples/box' },
                        { text: '滚动条', link: '/examples/scrollbar' },
                    ],
                },
                {
                    text: '表单组件',
                    items: [
                        { text: '输入框', link: '/examples/input' },
                        { text: '数字输入框', link: '/examples/input-number' },
                        { text: '颜色选择器', link: '/examples/color-picker' },
                    ],
                },
                {
                    text: '进阶组件',
                    items: [
                        { text: '浮层', link: '/examples/popup' },
                        { text: '弹出气泡', link: '/examples/popover' },
                        { text: '弹窗', link: '/examples/modal' },
                        { text: '菜单', link: '/examples/menu' },
                    ],
                },
                {
                    text: '花里胡哨',
                    items: [
                        { text: '代码雨', link: '/examples/rain' },
                        { text: '照片墙', link: '/examples/photo-wall' },
                        { text: '富文本', link: '/examples/markdown' },
                    ],
                },
            ],
            '/guide/': [
                {
                    text: '快速入门',
                    items: [
                        { text: '安装依赖', link: '/guide/install' },
                        { text: '引入依赖', link: '/guide/import' },
                        { text: 'TypeScript', link: '/guide/typescript' },
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
            message: '欢迎大家交流学习，拥抱开源',
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
    vue: {
        script: {
            defineModel: true,
        },
    },
});
