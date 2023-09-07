---
title: 数字输入框
---

# 数字输入框 InputNumber

## 功能介绍

数字输入框组件，基于 [输入框 Input](/examples/input) 独立封装

## 使用方式

::: tip

我尝试使用输入框原生的步进器，结果发现与精度限制发生冲突  
点击步进器会触发 `input` 事件，导致输入框值闪烁一下  
数字输入框的限制逻辑应该在 `change` 事件中处理，否则会影响用户输入  
数字输入框强制使用 [lazy 修饰符](/examples/input/index.md#v-model-修饰符)

:::

### 普通输入框

<br />
<InputNumberUse1 />

::: details 查看代码

<<< @/examples/input-number/use1.vue

:::

### 显示步进器

<br />
<InputNumberUse2 />

::: details 查看代码

<<< @/examples/input-number/use2.vue

:::

### 指定步进值

<br />
<InputNumberUse3 />

::: details 查看代码

<<< @/examples/input-number/use3.vue

:::

### 严格步进

<br />
<InputNumberUse4 />

::: details 查看代码

<<< @/examples/input-number/use4.vue

:::

### 限制最大值、最小值

<br />
<InputNumberUse5 />

::: details 查看代码

<<< @/examples/input-number/use5.vue

:::

### 限制精度

<br />
<InputNumberUse6 />

::: details 查看代码

<<< @/examples/input-number/use6.vue

:::

## API 参考

基础 API 参考前往 [输入框 Input](/examples/input) 查看

### 属性

|     名称     |                 说明                 |       类型       | 默认值  |
| :----------: | :----------------------------------: | :--------------: | :-----: |
| showControls |         显示数字输入框步进器         |     boolean      | `false` |
| stepStrictly | 严格步进，限制数值必须为步进值整倍数 |     boolean      | `false` |
|  precision   |        数值精度，保留小数位数        | number \| string |    0    |
|     min      |              原生最小值              |        -         |    -    |
|     max      |              原生最大值              |        -         |    -    |
|     step     |              原生步进值              |        -         |    -    |

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

<script setup>
import InputNumberUse1 from './use1.vue';
import InputNumberUse2 from './use2.vue';
import InputNumberUse3 from './use3.vue';
import InputNumberUse4 from './use4.vue';
import InputNumberUse5 from './use5.vue';
import InputNumberUse6 from './use6.vue';
</script>
