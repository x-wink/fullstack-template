<template>
    <div class="x-aside">
        <el-menu
            :collapse="isCollapse"
            :default-active="route.name"
            :default-openeds="defaultOpeneds"
            router
            unique-opened
        >
            <template v-for="(item, index) in menus">
                <DeepMenu v-if="item.data.visible" :key="index" :data="item" />
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
    import { deepTree } from '@xwink/utils';
    import DeepMenu from './menu.vue';
    const isCollapse = ref(false);

    const userStore = useUserStore();
    const menus = computed(() => userStore.menus);

    const route = useRoute();
    const defaultOpeneds = computed(() =>
        deepTree(menus.value, (node) => node.data.permission === route.name).map((item) => item.data.permission)
    );
</script>

<style scoped lang="less">
    .x-aside {
        background: var(--bgc);
        --el-menu-bg-color: var(--bgc);
        --el-menu-border-color: var(--bc);
        --el-menu-text-color: var(--fc);
        --el-menu-hover-bg-color: var(--bgc-hover);
    }
</style>
