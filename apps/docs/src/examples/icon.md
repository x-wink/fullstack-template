---
title: 图标
---

# 图标

`WINK UI` 从 `ElementPlus` 扒了所有图标过来使用

## 直接使用图标名称作为组件名

<Logo style="font-size: 36px" />
::: details 查看代码
```vue
<Logo style="font-size: 36px" />
```
<br />

```ts
import { Logo } from 'wink-ui';
```

:::

## 使用 XIcon 组件 并通过 name 传值图标名称

<XIcon name="Logo" size="36px" />
::: details 查看代码
```vue
<XIcon name="Logo" size="36px" />
```

<br />

```ts
import { XIcon } from 'wink-ui';
```

:::

## 图标列表

<IconList />

<script setup>
import IconList from './icon.vue';
import { Logo } from '@pkgs/ui';
</script>
