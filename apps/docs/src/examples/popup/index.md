---
title: 浮层
---

# 浮层 Popup

## 功能介绍

拥有独立层级的组件

## 使用方式

### 普通浮层

<br />
<PopupUse1 />

::: details 查看代码

<<< @/examples/popup/use1.vue

:::

### 浮层位置

<br />
<PopupUse2 />

::: details 查看代码

<<< @/examples/popup/use2.vue

:::

### 点击外面隐藏

<br />
<PopupUse3 />

::: details 查看代码

<<< @/examples/popup/use3.vue

:::

## API 参考

### 属性

|    名称    |            说明             |                  类型                  | 默认值  |
| :--------: | :-------------------------: | :------------------------------------: | :-----: |
| modalValue |            显示             |                boolean                 | `true`  |
|   static   |          静态展示           |                boolean                 | `false` |
|   modal    |         是否有蒙版          |                boolean                 | `false` |
|   arrow    |         是否有箭头          |                boolean                 | `false` |
| placement  |          箭头位置           | [PopupPlacement](#popupplacement-type) | bottom  |
|  position  |          浮层位置           |            [number, number]            | [0, 0]  |
|   offset   |         浮层偏移量          |            [number, number]            | [0, 0]  |
|   target   | 定位目标，会覆盖 `position` |              HTMLElement               |    -    |

### 事件

|     名称     |       说明       |   触发时机   |          回调类型          |
| :----------: | :--------------: | :----------: | :------------------------: |
| clickOutside | 方便手动控制显隐 | 点击浮层外面 |         () => void         |
|     open     |        -         |   浮层显示   |         () => void         |
|    close     |        -         |   浮层隐藏   |         () => void         |
|    change    |        -         | 浮层显隐切换 | (visible: boolean) => void |

### 插槽

|  名称   |     说明     | 类型定义 |
| :-----: | :----------: | :------: |
| default | 浮层主体内容 |    -     |

### 实例

|  成员  | 说明 |   类型定义    |
| :----: | :--: | :-----------: |
|  open  | 显示 |  () => void   |
| close  | 隐藏 |  () => void   |
| toggle | 切换 | () => boolean |

## 附加内容

### PopupPlacement `type`

浮层箭头位置联合类型，可选值：

<ul>
    <li v-for="(item, index) in popupPlacements" :key="index">{{ item }}</li>
</ul>

### popupPlacements `const`

浮层箭头位置枚举数组，类型为 `PopupPlacement[]`

<script setup>
import PopupUse1 from './use1.vue';
import PopupUse2 from './use2.vue';
import PopupUse3 from './use3.vue';
import { popupPlacements } from '@pkgs/ui';
</script>
