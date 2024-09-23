<template>
    <el-sub-menu v-if="hasVisibleChildren" :index="props.data.data.permission">
        <template #title>
            <span>{{ props.data.data.label }}</span>
        </template>
        <DeepMenu v-for="(item, index) in props.data.children" :key="index" :data="item" />
    </el-sub-menu>
    <el-menu-item v-else :index="props.data.data.permission" :route="{ name: props.data.data.permission }">
        {{ props.data.data.label }}
    </el-menu-item>
</template>

<script setup lang="ts">
    import type { TreeNode, Menu } from '@pkgs/model';
    import DeepMenu from './menu.vue';

    const props = defineProps<{
        data: TreeNode<Menu>;
    }>();

    const hasVisibleChildren = computed(() => props.data.children?.filter((item) => item.data.visible).length > 0);
</script>
