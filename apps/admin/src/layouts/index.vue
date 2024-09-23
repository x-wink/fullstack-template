<template>
    <div class="x-layout x-flex col">
        <XHeader />
        <div class="x-body x-flex fill">
            <XAside />
            <div class="x-main fill">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </div>
        </div>
        <div class="x-footer">
            <a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2024041408号-1</a>
        </div>
    </div>
</template>

<script setup lang="ts">
    import XHeader from './header.vue';
    import XAside from './aside.vue';

    defineOptions({
        name: 'XLayout',
    });
</script>

<style scoped lang="less">
    .x-layout {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .x-body {
            overflow: hidden;
            .x-main {
                padding: var(--gap);
                overflow: auto;
            }
        }

        .x-footer {
            height: 30px;
            background: var(--bgc);
            text-align: center;
            a {
                color: var(--fc);
                font-size: 12px;
            }
        }
    }
</style>
