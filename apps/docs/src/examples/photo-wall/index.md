---
title: 照片墙
---

# 照片墙 PhotoWall

## 功能介绍

3D 旋转相册

## 使用方式

<br />
<PhotoWallUse1 />

::: details 查看代码

<<< @/examples/photo-wall/use1.vue

:::

## API 参考

### 属性

|  名称  |           说明           |      类型      |  默认值  |
| :----: | :----------------------: | :------------: | :------: |
|  data  |      照片`url`列表       |    string[]    |   必填   |
| active |       激活旋转动画       |    boolean     | `active` |
| height |         照片高度         |     number     |   200    |
|  skew  |      `X轴`倾斜角度       |     number     |    0     |
| speed  | 旋转速度，有效范围`0~30` | number [0, 30] |   `0`    |

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
import PhotoWallUse1 from './use1.vue';
</script>
