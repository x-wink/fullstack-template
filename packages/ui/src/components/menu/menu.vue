<template>
    <div class="x-menu x-flex col-center" :class="{ row: !props.vertical, col: props.vertical }">
        <div
            v-for="(item, index) in props.menus"
            :key="index"
            class="x-menu-item"
            :class="{ active: props.active === index }"
            :title="item.title"
        >
            <x-button class="x-flex row-center" text :title="item.title" @click="handleClick(item, index)">
                <x-icon v-if="item.icon" :name="item.icon" />
                <span v-if="!item.link && item.title">
                    {{ item.title }}
                </span>
            </x-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { getCurrentInstance } from 'vue';
    import { XIcon, XButton } from '../';
    import type { Router } from 'vue-router';
    import type { IconName } from '@pkgs/icons';
    interface Menu {
        name?: string;
        title?: string;
        icon?: IconName;
        route?: string;
        link?: boolean;
    }
    defineOptions({
        name: 'XMenu',
    });
    const props = defineProps<{
        menus: Menu[];
        active?: number;
        vertical?: boolean;
    }>();
    const instance = getCurrentInstance()!;
    const router = instance.appContext.config.globalProperties.$router as Router;
    const emits = defineEmits<{
        'update:active': [value: number];
    }>();
    const handleClick = (menu: Menu, index: number): void => {
        if (menu.route) {
            if (menu.link) {
                window.open(menu.route, '_blank');
            } else {
                router?.push(menu.route);
            }
        }
        emits('update:active', index);
    };
</script>

<style lang="less">
    .x-menu {
        &.row {
            .x-menu-item {
                margin: 0 var(--x-space-mini);
            }
        }
        &.col {
            .x-menu-item {
                + .x-menu-item {
                    margin-top: 10px;
                }
                transform-origin: left center;
            }
            padding: 0 10px;
        }
        .x-menu-item {
            .x-button {
                color: inherit;
            }
            &.active {
                color: var(--x-primary);
                transform: scale(1.2);
            }
        }
    }
</style>
