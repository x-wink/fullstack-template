---
title: 图标
---

# 图标 Icon

## 功能介绍

::: tip
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

<<< @/examples/icon/use1.vue

:::

### 使用 XIcon 组件 并通过 name 传值图标名称

<br />
<IconUse2 />

::: details 查看代码

<<< @/examples/icon/use2.vue

:::

## API 参考

### 属性

| 名称 |   说明   |  类型  | 默认值 |
| :--: | :------: | :----: | :----: |
| name | 图标名称 | string |  必填  |

### 事件

| 名称 | 说明 | 触发时机 | 回调类型 |
| :--: | :--: | :------: | :------: |
|  -   |  -   |    -     |    -     |

### 插槽

| 名称 | 说明 | 类型定义 |
| :--: | :--: | :------: |
|  -   |  -   |    -     |

### 实例

| 成员 | 说明 | 类型定义 |
| :--: | :--: | :------: |
|  -   |  -   |    -     |

## 图标列表

<IconList />

## 附加内容

### IconName `type`

图标名称联合类型，可选值[点击这里](#图标列表)

<script setup>
import IconUse1 from './use1.vue';
import IconUse2 from './use2.vue';
import IconList from './list.vue';
</script>
