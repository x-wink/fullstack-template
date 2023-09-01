---
title: 文本输入框
---

# 文本输入框 Input

## 功能介绍

文本输入框组件

## 使用方式

### 普通输入框

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

## API 参考

::: info

支持所有 `input` 元素原生属性、事件  
`id`、`class`、`style`会传递到根元素上  
其他的属性和事件监听全部传递到内部 `input` 元素上

:::

### 属性

|     名称     |                     说明                     |  类型   | 默认值  |
| :----------: | :------------------------------------------: | :-----: | :-----: |
|  modalValue  |                     内容                     | string  |  必填   |
|  clearable   | 清空内容按钮，有内容在聚焦或鼠标进入时才显示 | boolean | `false` |
|    prefix    |                     前缀                     | string  |    -    |
|    suffix    |                     后缀                     | string  |    -    |
| showPassword |   切换显示密码按钮，`type=password` 时生效   | boolean |  false  |
|     type     |                   原生类型                   |    -    |    -    |
| placeholder  |                  原生占位符                  |    -    |    -    |
|  maxlength   |            原生最大长度，超出截取            |    -    |    -    |
|  minlength   |           原生最小长度，不足补空格           |    -    |    -    |

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

<script setup>
import InputUse1 from './use1.vue';
import InputUse2 from './use2.vue';
import InputUse3 from './use3.vue';
import InputUse4 from './use4.vue';
import InputUse5 from './use5.vue';
import InputUse6 from './use6.vue';
import InputUse7 from './use7.vue';
</script>
