<template>
    <header class="header flex row-between">
        <div class="left flex col-end">
            <h2>X-WINK</h2>
            <x-menu :active="currentMenu" class="modules" :menus="menus" />
        </div>
        <div class="center"></div>
        <div class="right">
            <x-menu class="links" :menus="links" />
        </div>
    </header>
</template>

<script setup lang="ts">
    const route = useRoute();
    const router = useRouter();
    const menus = router
        .getRoutes()
        .filter((item) => item.meta.module)
        .map((item) => {
            return {
                name: item.name,
                title: item.meta.module,
                route: item.path,
            };
        });
    const currentMenu = computed(() => menus.findIndex((item) => item.name === route.name));
    const links = reactive([
        {
            title: '个人主页',
            icon: 'Logo',
            route: '/',
            link: true,
        },
        {
            title: 'Github',
            icon: 'Github',
            route: 'https://github.com/x-wink',
            link: true,
        },
        {
            title: 'NPM',
            icon: 'Npm',
            route: 'https://www.npmjs.com/~xwink',
            link: true,
        },
    ]);
</script>

<style scoped lang="less">
    .header {
        padding: 10px;
        align-items: center;
        .modules {
            margin-left: 30px;
        }
        .links {
            font-size: 24px;
        }
    }
</style>
