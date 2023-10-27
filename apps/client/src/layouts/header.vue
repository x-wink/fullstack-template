<template>
    <header class="header flex row-between">
        <div class="left flex col-center">
            <h2 class="title">X-WINK</h2>
            <p v-if="isPortrait" @click="goHome">游戏大厅</p>
            <x-menu v-else :active="currentMenu" class="modules" :menus="menus" />
        </div>
        <div class="center"></div>
        <div class="right">
            <x-menu v-if="!isPortrait" class="links" :menus="links" />
        </div>
    </header>
</template>

<script setup lang="ts">
    import { useContext } from '@/context';
    const { isPortrait } = useContext();

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
            title: 'UI',
            icon: 'Logo',
            route: '/wink-ui',
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

    const goHome = () => {
        router.push({ name: 'Home' });
    };
</script>

<style scoped lang="less">
    .header {
        padding: var(--x-space-small);
        align-items: center;
        .title {
            min-width: fit-content;
            margin-right: var(--x-space);
        }
        .modules {
            flex-wrap: wrap;
        }
        .links {
            font-size: var(--x-size-large);
        }
    }
</style>
