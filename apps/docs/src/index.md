---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: 首页

hero:
    name: 'WINK UI'
    text: '一个Vue3组件库'
    tagline: 仅供学习参考，请勿用于生产环境（暂未发布）
    actions:
        - theme: brand
          text: 狠狠地点我
          link: /examples/icon
        - theme: alt
          text: Github
          link: https://github.com/x-wink/fullstack-template/tree/demo

features:
    - title: 组件全面
      details: 参考借鉴了 element-plus 和 ant-design-vue 的组件和图标
    - title: 实用工具
      details: 内置了前端开发常用的工具函数
    - title: TS友好
      details: 源码全部使用 TypeScript 进行开发
---

<Index />

<script setup>
import Index from "./index.vue";
</script>
