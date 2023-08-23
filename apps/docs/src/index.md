---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: 首页

hero:
    name: 'WINK UI'
    text: '一个Vue3组件库'
    tagline: 仅用于学习参考，请勿随意用于生产环境
    actions:
        - theme: brand
          text: 快速开始
          link: /examples/icon
        - theme: alt
          text: Github
          link: https://github.com/x-wink/fullstack-template/tree/demo

features:
    - title: 常用组件
      details: 参考借鉴了 element-plus 和 ant-design-vue 的基础组件和图标
    - title: 工具函数
      details: 内置了前端开发常用的工具函数
    - title: TS友好
      details: 源码全部使用 TypeScript 进行开发
---

<Index />

<script setup>
import Index from "./index.vue";
</script>
