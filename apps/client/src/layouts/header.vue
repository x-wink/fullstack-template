<template>
    <header class="header flex row-between">
        <div class="left flex col-end">
            <h2>X-WINK</h2>
            <ul class="menus flex col-center">
                <li v-for="(item, index) in menus" :key="index" :class="{ active: $route.name === item.route }">
                    <a class="flex row-center" :title="item.name" @click="$router.push({ name: item.route })">
                        {{ item.name }}
                    </a>
                </li>
            </ul>
        </div>
        <div class="right">
            <ul class="links flex col-center">
                <li v-for="(item, index) in links" :key="index">
                    <a class="flex row-center" :href="item.href" target="_blank" :title="item.name">
                        <svg-icon :height="item.height" :name="item.icon" />
                    </a>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup lang="ts">
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
    const links = reactive([
        {
            name: 'Website',
            icon: 'logo',
            height: 24,
            href: '/',
        },
        {
            name: 'Github',
            icon: 'github',
            height: 28,
            href: 'https://github.com/x-wink',
        },
        {
            name: 'NPM',
            icon: 'npm',
            height: 28,
            href: 'https://www.npmjs.com/~xwink',
        },
    ]);
</script>

<style scoped lang="less">
    .header {
        padding: 10px;
        align-items: center;
        .menus {
            margin-left: 30px;
            li {
                + li {
                    margin-left: 20px;
                }
                cursor: pointer;
                &:active {
                    transform: scale(0.8);
                }
                &.active {
                    color: var(--primary);
                    transform: scale(1.2);
                    transform-origin: center bottom;
                }
            }
        }
        .links {
            li {
                + li {
                    margin-left: 10px;
                }
                a {
                    &:active {
                        transform: scale(0.8);
                    }
                }
            }
        }
    }
</style>
