<template>
    <XMenu :menus="links" />
</template>
<script setup lang="ts">
    import { XMenu } from '@pkgs/ui';
    import { reactive } from 'vue';
    const links = reactive([
        {
            title: 'UI',
            icon: 'Logo' as const,
            route: '/wink-ui',
            link: true,
        },
        {
            title: 'Github',
            icon: 'Github' as const,
            route: 'https://github.com/x-wink',
            link: true,
        },
        {
            title: 'NPM',
            icon: 'Npm' as const,
            route: 'https://www.npmjs.com/~xwink',
            link: true,
        },
    ]);
</script>
<style scoped lang="less"></style>
