<template>
    <header class="header flex row-between">
        <div class="left flex col-end">
            <h2>X-WINK</h2>
            <x-menu :active="currentMenu" class="menus" :menus="menus" />
        </div>
        <div class="right">
            <x-menu class="links" :menus="links" />
        </div>
    </header>
</template>

<script setup lang="ts">
    const route = useRoute();
    const currentMenu = computed(() => route.name);
    const menus = reactive([
        {
            code: 'Home',
            name: '首页',
            route: 'Home',
        },
        {
            code: 'Blogs',
            name: '博客',
            route: 'Blogs',
        },
    ]);
    const links = reactive([
        {
            title: '个人主页',
            code: 'Website',
            icon: 'logo',
            height: 24,
            route: '/',
            link: true,
        },
        {
            title: 'Github',
            code: 'Github',
            icon: 'github',
            height: 28,
            route: 'https://github.com/x-wink',
            link: true,
        },
        {
            title: 'NPM',
            code: 'NPM',
            icon: 'npm',
            height: 28,
            route: 'https://www.npmjs.com/~xwink',
            link: true,
        },
    ]);
</script>

<style scoped lang="less">
    .header {
        padding: 10px;
        align-items: center;
        .menus {
            margin-left: 30px;
        }
    }
</style>
