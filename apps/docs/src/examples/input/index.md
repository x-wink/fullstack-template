---
title: 输入框
---

# 输入框 Input

## 功能介绍

输入框组件，用于接收用户内容输入

## 使用方式

### 文本输入框

<br />
<InputUse1 />

::: details 查看代码

<<< @/examples/input/use1.vue

:::

### 占位符

<br />
<InputUse2 />

::: details 查看代码

<<< @/examples/input/use2.vue

:::

### 长度限制

<br />
<InputUse3 />

::: details 查看代码

<<< @/examples/input/use3.vue

:::

### 清空内容

<br />
<InputUse4 />

::: details 查看代码

<<< @/examples/input/use4.vue

:::

### 前缀后缀

<br />
<InputUse5 />

::: details 查看代码

<<< @/examples/input/use5.vue

:::

### `v-model` 修饰符

::: info

element-plus 居然不支持，差评 😅  
当存在 `number` 修饰符的时候会自动转换为[数字输入框](#数字输入框)

:::
<br />
<InputUse6 />

::: details 查看代码

<<< @/examples/input/use6.vue

:::

### 密码输入框

<br />
<InputUse7 />

::: details 查看代码

<<< @/examples/input/use7.vue

:::

### 数字输入框

基于输入框进行的单独封装，[前往查看](/examples/input-number/index.md)

## API 参考

::: info

支持所有 `input` 元素原生属性、事件  
`id`、`class`、`style`会传递到根元素上  
其他的属性和事件监听全部传递到内部 `input` 元素上

:::

::: warning

目前针对 `type` 属性只特殊处理了 `text`、`password`、`number` 三种  
其他类型保持浏览器默认行为，推荐使用其他组件代替

:::

### 属性

|     名称     |                     说明                     |             类型             | 默认值  |
| :----------: | :------------------------------------------: | :--------------------------: | :-----: |
|  modalValue  |                     内容                     |            string            |  必填   |
|  clearable   | 清空内容按钮，有内容在聚焦或鼠标进入时才显示 |           boolean            | `false` |
|    prefix    |                     前缀                     |            string            |    -    |
|    suffix    |                     后缀                     |            string            |    -    |
| showPassword |            显示密码输入框切换按钮            |           boolean            | `false` |
|     type     |                   原生类型                   | [InputType](#inputtype-type) |  text   |
| placeholder  |                  原生占位符                  |              -               |    -    |
|  maxlength   |            原生最大长度，超出截取            |              -               |    -    |
|  minlength   |           原生最小长度，不足补空格           |              -               |    -    |

### 事件

|  名称  | 说明 |      触发时机      |  回调类型  |
| :----: | :--: | :----------------: | :--------: |
| clear  |  -   | 点击清空内容按钮后 | () => void |
| input  | 原生 |         -          |     -      |
| change | 原生 |         -          |     -      |
| focus  | 原生 |         -          |     -      |
|  blur  | 原生 |         -          |     -      |

### 插槽

|  名称  | 说明 | 类型定义 |
| :----: | :--: | :------: |
| prefix | 前缀 |    -     |
| suffix | 后缀 |    -     |

### 实例

| 成员  |     说明     |  类型定义  |
| :---: | :----------: | :--------: |
| focus | 使输入框聚焦 | () => void |
| blur  | 使输入框失焦 | () => void |

## 附加内容

### InputType `type`

输入框类型联合类型，可选值：

<ul>
    <li v-for="(item, index) in inputTypes" :key="index">{{ item }}</li>
</ul>

### inputTypes `const`

输入框类型枚举列表，类型为 [`InputType[]`](#inputtype-type)

<script setup>
import { inputTypes } from '@pkgs/ui';
import InputUse1 from './use1.vue';
import InputUse2 from './use2.vue';
import InputUse3 from './use3.vue';
import InputUse4 from './use4.vue';
import InputUse5 from './use5.vue';
import InputUse6 from './use6.vue';
import InputUse7 from './use7.vue';
</script>
