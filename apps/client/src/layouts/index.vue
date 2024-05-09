<template>
    <div class="x-layout x-flex col">
        <header v-if="showHeader" class="x-header x-flex col-end">
            <div class="x-flex row-fill row-between col-center">
                <CommonIcon height="19px" name="back" width="12px" @click="handleBack" />
                <span>{{ layoutStore.title }}</span>
                <span></span>
            </div>
        </header>
        <main class="x-main">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </main>
        <footer v-if="showFooter" class="x-footer">
            <ul class="x-flex row-around col-center">
                <li
                    v-for="(item, index) in tabs"
                    :key="index"
                    class="x-flex col col-center"
                    :class="{ active: route.name === item.route }"
                    @click="handleRoute(item.route)"
                >
                    <CommonIcon :name="route.name === item.route ? `${item.icon}-active` : item.icon" />
                    <p>{{ item.label }}</p>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script setup lang="ts">
    defineOptions({
        name: 'XLayout',
    });
    const layoutStore = useLayoutStore();
    const route = useRoute();
    const showHeader = computed(() => route.meta.header !== false);
    const showFooter = computed(() => route.meta.footer);

    const userStore = useUserStore();
    const tabs = computed(() =>
        userStore.isEmployee
            ? [
                  {
                      label: '首页',
                      icon: 'home',
                      route: 'Home',
                  },
              ]
            : [
                  {
                      label: '首页',
                      icon: 'home',
                      route: 'Home',
                  },
                  {
                      label: '我的',
                      icon: 'profile',
                      route: 'Profile',
                  },
              ]
    );
    const router = useRouter();
    const handleRoute = (name: string) => {
        router.push({ name });
    };
    const handleBack = () => {
        window.history.length > 1 ? router.back() : router.push({ name: 'Home' });
    };
</script>

<style lang="less">
    .x-layout {
        width: 100%;
        height: 100%;
        max-width: 450px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        background: var(--bgc);
        .x-header {
            // height: 100px;
            padding: 15px;
            background: var(--dark-blue);
            font-size: 21px;
            font-weight: bold;
            color: #fff;
        }
        .x-main {
            flex: 1;
            overflow: hidden;
            > .container,
            > [class*='-container'] {
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        }
        .x-footer {
            padding: var(--gap-large);
            ul {
                li {
                    gap: var(--gap-mini);
                    padding: 0 var(--gap-super);
                    .common-icon {
                        font-size: 36px;
                    }
                    p {
                        font-size: 12px;
                        color: #989898;
                    }
                    &.active {
                        p {
                            color: #26398b;
                        }
                    }
                }
            }
        }
    }
</style>
