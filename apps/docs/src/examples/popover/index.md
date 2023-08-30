---
title: 弹出层
---

# 弹出层 Popover

## 功能介绍

弹出层组件

## 使用方式

### 普通弹出层

<br />
<PopoverUse1 />

::: details 查看代码

<<< @/examples/popover/use1.vue

:::

### 弹出位置

<br />
<PopoverUse2 />

::: details 查看代码

<<< @/examples/popover/use2.vue

:::

## API 参考

### 属性

|    名称    |            说明             |                    类型                    | 默认值  |
| :--------: | :-------------------------: | :----------------------------------------: | :-----: |
| modalValue |            显示             |                  boolean                   | `true`  |
|   static   |          静态展示           |                  boolean                   | `false` |
|   modal    |         是否有蒙版          |                  boolean                   | `false` |
|   arrow    |         是否有箭头          |                  boolean                   | `false` |
| placement  |          箭头位置           | [PopoverPlacement](#popoverplacement-type) | bottom  |
|  position  |         弹出层位置          |              [number, number]              | [0, 0]  |
|   offset   |        弹出层偏移量         |              [number, number]              | [0, 0]  |
|   target   | 定位目标，会覆盖 `position` |                HTMLElement                 |    -    |

### 事件

| 名称 | 说明 | 触发时机 | 回调类型 |
| :--: | :--: | :------: | :------: |
|  -   |  -   |    -     |    -     |

### 插槽

|  名称   |      说明      | 类型定义 |
| :-----: | :------------: | :------: |
| default | 弹出层主体内容 |    -     |

### 实例

| 成员 | 说明 | 类型定义 |
| :--: | :--: | :------: |
|  -   |  -   |    -     |

## 附加内容

### PopoverPlacement `type`

弹出层箭头位置联合类型，可选值：

<ul>
    <li v-for="(item, index) in popoverPlacements" :key="index">{{ item }}</li>
</ul>

### popoverPlacements `const`

弹出层箭头位置枚举数组，类型为 `PopoverPlacement[]`

<script setup>
import PopoverUse1 from './use1.vue';
import PopoverUse2 from './use2.vue';
import { popoverPlacements } from '@pkgs/ui';
</script>
