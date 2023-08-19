<template>
    <header class="header flex row-between">
        <div class="left flex col-center">
            <h2 class="title">X-WINK</h2>
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
        padding: var(--x-space-small);
        align-items: center;
        .title {
            min-width: fit-content;
        }
        .modules {
            margin-left: var(--x-space);
            flex-wrap: wrap;
        }
        .links {
            font-size: var(--x-size-large);
        }
    }
</style>
