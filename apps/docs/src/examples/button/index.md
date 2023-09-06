---
title: 按钮
---

# 按钮 Button

## 功能介绍

dddd，没啥好说的 🤐

## 使用方式

### 主题风格

<br />
<ButtonTheme />

::: details 查看代码

<<< @/examples/button/theme.vue

:::

### 简约风格

<br />
<ButtonSimple />

::: details 查看代码

<<< @/examples/button/simple.vue

:::

### 禁用状态

<br />
<ButtonDisabled />

::: details 查看代码

<<< @/examples/button/disabled.vue

:::

### 加载状态

<br />
<ButtonLoading />

::: details 查看代码

<<< @/examples/button/loading.vue

:::

### 图标按钮

<br />
<ButtonIcon />

::: details 查看代码

<<< @/examples/button/icon.vue

:::

### 文字按钮

<br />
<ButtonText />

::: details 查看代码

<<< @/examples/button/text.vue

:::

### 链接按钮

<br />
<ButtonLink />

::: details 查看代码

<<< @/examples/button/link.vue

:::

### 圆形按钮

<br />
<ButtonCircle />

::: details 查看代码

<<< @/examples/button/circle.vue

:::

### 圆角按钮

<br />
<ButtonRound />

::: details 查看代码

<<< @/examples/button/round.vue

:::

## API 参考

### 属性

|   名称   |   说明   |                         类型                          |   默认值    |
| :------: | :------: | :---------------------------------------------------: | :---------: |
|  theme   | 主题风格 | [ThemeColor](/examples/text/index.md#themecolor-type) |   default   |
|   icon   |   图标   |     [IconName](/examples/icon/index.md#图标列表)      | `undefined` |
|  simple  | 简约风格 |                        boolean                        |   `false`   |
| disabled | 禁用状态 |                        boolean                        |   `false`   |
| loading  | 加载状态 |                        boolean                        |   `false`   |
|   text   | 文本按钮 |                        boolean                        |   `false`   |
|   link   | 链接按钮 |                        boolean                        |   `false`   |
|  circle  | 圆形按钮 |                        boolean                        |   `false`   |
|  round   | 圆角按钮 |                        boolean                        |   `false`   |

### 事件

| 名称 | 说明 | 触发时机 | 回调类型 |
| :--: | :--: | :------: | :------: |
|  -   |  -   |    -     |    -     |

### 插槽

|  名称   |     说明     | 类型定义 |
| :-----: | :----------: | :------: |
| default | 按钮主体内容 |    -     |

### 实例

| 成员 | 说明 | 类型定义 |
| :--: | :--: | :------: |
|  -   |  -   |    -     |

<script setup>
    import ButtonTheme from "./theme.vue";
    import ButtonSimple from "./simple.vue";
    import ButtonDisabled from "./disabled.vue";
    import ButtonLoading from "./loading.vue";
    import ButtonIcon from "./icon.vue";
    import ButtonText from "./text.vue";
    import ButtonLink from "./link.vue";
    import ButtonCircle from "./circle.vue";
    import ButtonRound from "./round.vue";
</script>
