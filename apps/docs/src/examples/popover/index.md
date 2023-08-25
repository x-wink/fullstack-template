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

### 箭头位置

<br />
<PopoverUse2 />

::: details 查看代码

<<< @/examples/popover/use2.vue

:::

### 弹出位置

<br />
<PopoverUse3 />

::: details 查看代码

<<< @/examples/popover/use3.vue

:::

## API 参考

### 属性

|      名称      |    说明    |                         类型                         | 默认值  |
| :------------: | :--------: | :--------------------------------------------------: | :-----: |
|   modalValue   |    显示    |                       boolean                        | `true`  |
|     static     |  静态展示  |                       boolean                        | `false` |
|     modal      | 是否有蒙版 |                       boolean                        | `false` |
|     arrow      | 是否有箭头 |                       boolean                        | `false` |
| arrowPlacement |  箭头位置  | [PopoverArrowPlacement](#popoverarrowplacement-type) | center  |
|   placement    |  弹出位置  |      [PopoverPlacement](#popoverplacement-type)      | bottom  |

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

## 附加内容

### PopoverArrowPlacement `type`

string 联合类型，可选值：

-   center
-   left
-   bottom
-   right
-   top

::: info

`left` 和 `bottom` 等效，`right` 和 `top` 等效，为了弹出位置不同时语义更好

:::

### PopoverPlacement `type`

string 联合类型，可选值：

-   top-left
-   top
-   top-right
-   left-top
-   left
-   left-bottom
-   bottom-left
-   bottom
-   bottom-right
-   right-top
-   right
-   right-bottom

::: warning

`placement` 值为拼接词时，后半部分会覆盖 `arrowPlacement` 的默认值 `center` 以实现弹出位置不同箭头位置自动变化  
如果想要定箭头位置可以显示传入 `arrowPlacement`  
箭头位置优先级：`arrowPlacement` > `placement后半部分` > 默认值`center`

:::

<script setup>
import PopoverUse1 from './use1.vue';
import PopoverUse2 from './use2.vue';
import PopoverUse3 from './use3.vue';
</script>
