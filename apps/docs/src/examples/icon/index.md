---
title: 图标
---

# 图标 Icon

## 功能介绍

::: info
`WINK UI` 从 `ElementPlus` 扒了所有图标过来使用
:::

用于显示 `SVG` 图标，相较于传统的图片和字体图标：

-   **灵活**：可以通过 `CSS样式` 自由控制颜色和尺寸
-   **方便**：随时增减或修改图标
-   **矢量**：不会因为放大而模糊失真
-   **易用**：前端自己就可以编辑 `SVG` 源码

## 使用方式

### 直接使用图标名称作为组件名

<br />
<IconUse1 />

::: details 查看代码

<<< ./use1.vue

:::

### 使用 XIcon 组件 并通过 name 传值图标名称

<br />
<IconUse2 />

::: details 查看代码

<<< ./use2.vue

:::

## API 参考

### 组件属性

| 属性 |  类型  | 默认值 |
| :--: | :----: | :----: |
| name | string |  必填  |

### 组件事件

| 事件 | 触发时机 | 回调类型 |
| :--: | :------: | :------: |
|  -   |    -     |    -     |

### 组件实例

| 实例方法 | 使用说明 | 类型定义 |
| :------: | :------: | :------: |
|    -     |    -     |    -     |

## 图标列表

<IconList />

<script setup>
import IconUse1 from './use1.vue';
import IconUse2 from './use2.vue';
import IconList from './list.vue';
</script>
