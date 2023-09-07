# TypeScript 使用帮助

## 开发环境

### 使用 vscode 进行开发

[官方下载](https://code.visualstudio.com/)

### 安装 `Vue Language Features(Volar)`插件

插件 id：Vue.volar

### 安装 `TypeScript Vue Plugin(Volar)`插件

插件 id：Vue.vscode-typescript-vue-plugin

### 工作区禁用 内置 TypeScript 服务

详情见 [vue 官方文档](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode) 说明

::: tip

volar 的 takeover 模式，对 SFC 和 TS 更加友好  
当组件使用 defineExpose 暴露成员时  
外部组件通过 ref 访问需要使用组件实例对象提供类型支持  
使用内置 TS 服务时以下示例代码会类型报错

:::

::: code-group

```vue [App.vue]
<template>
    <MyComponent ref="refsComponent" />
</template>
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import MyComponent from './my-comonpent.vue';
    type MyComponentInstance = InstanceType<typeof MyComponent>;
    const refsComponent = ref<MyComponentInstance>();
    onMounted(() => {
        // sum有ts类型支持
        const res = refsComponent.value!.sum(1, 2);
        console.info(res); // 3
    });
</script>
```

```vue [my-comonpent.vue]
<template>
    <div>
        <!-- 组件内容 -->
    </div>
</template>
<script setup lang="ts">
    // ...
    const sum = (a: number, b: number) => {
        return a + b;
    };
    defineExpose({
        sum,
    });
    // ...
</script>
```

:::
