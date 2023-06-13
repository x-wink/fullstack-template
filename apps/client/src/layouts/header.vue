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
    const menus = reactive([
        {
            name: '首页',
            route: 'Home',
        },
        {
            name: '博客',
            route: 'Blogs',
        },
    ]);
    const currentMenu = computed(() => menus.findIndex((item) => item.route === route.name));
    const links = reactive([
        {
            title: '个人主页',
            icon: 'logo',
            height: 24,
            route: '/',
            link: true,
        },
        {
            title: 'Github',
            icon: 'github',
            height: 28,
            route: 'https://github.com/x-wink',
            link: true,
        },
        {
            title: 'NPM',
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
