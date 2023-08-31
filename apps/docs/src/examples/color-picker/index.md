---
title: 颜色选择器
---

# 颜色选择器 ColorPicker

## 功能介绍

根据饱和度、色相、透明度选取颜色

## 使用方式

<br />
<ColorPickerUse1 />

::: details 查看代码

<<< @/examples/color-picker/use1.vue

:::

## API 参考

### 属性

|    名称    |   说明   |                     类型                     | 默认值 |
| :--------: | :------: | :------------------------------------------: | :----: |
| modelValue |   色值   |                    string                    |  必填  |
|   format   | 色值格式 | [ColorPickerFormat](#colorpickerformat-type) |  hex   |

### 事件

|  名称  | 说明 |   触发时机   |              回调类型               |
| :----: | :--: | :----------: | :---------------------------------: |
| change |  -   | 选中颜色改变 | (color: [RGBA](#rgba-type)) => void |

### 插槽

|  名称   |     说明     | 类型定义 |
| :-----: | :----------: | :------: |
| default | 颜色展示区域 |    -     |

### 实例

| 成员 | 说明 | 类型定义 |
| :--: | :--: | :------: |
|  -   |  -   |    -     |

## 附加内容

### ColorPickerFormat `type`

-   hex
-   rgba
-   (color: [RGBA](#rgba-type)) => string

### RGB `type`

`RGB`颜色格式

```ts
interface RGB {
    r: number;
    g: number;
    b: number;
}
```

### RGBA `type`

带 `alpha` 通道的 `RGBA` 颜色格式，继承自 [RGB](#rgb-type)

```ts
interface RGBA extends RGB {
    a: number;
}
```

<script setup>
import ColorPickerUse1 from './use1.vue';
</script>
