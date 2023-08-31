---
title: 弹出气泡
---

# 弹出气泡 Popover

## 功能介绍

基于 [浮层 Popup](/examples/popup) 封装的气泡弹出层，继承了其属性用法

## 使用方式

<br />
<PopoverUse1 />

::: details 查看代码

<<< @/examples/popover/use1.vue

:::

## API 参考

::: info

基础 API 参考前往 [浮层 Popup](/examples/popup) 查看

:::

### 属性

|  名称   |   说明   |        类型        | 默认值 |
| :-----: | :------: | :----------------: | :----: |
| trigger | 触发方式 | [PopoverTrigger]() | hover  |
|  dalay  | 关闭延时 |       number       |  100   |

### 事件

| 名称 | 说明 | 触发时机 | 回调类型 |
| :--: | :--: | :------: | :------: |
|  -   |  -   |    -     |    -     |

### 插槽

|  名称  |   说明   | 类型定义 |
| :----: | :------: | :------: |
| target | 触发元素 |    -     |

### 实例

| 成员 | 说明 | 类型定义 |
| :--: | :--: | :------: |
|  -   |  -   |    -     |

<script setup>
import PopoverUse1 from './use1.vue';
</script>
