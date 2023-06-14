<template>
    <ul class="x-menu flex row-center col-center" :class="{ row: !props.vertical, col: props.vertical }">
        <li
            v-for="(item, index) in props.menus"
            :key="index"
            :class="{ active: props.active === index }"
            :title="item.title"
        >
            <x-button class="flex row-center" text :title="item.title" @click="handleClick(item, index)">
                <x-icon v-if="item.icon" :name="item.icon" />
                <span v-if="!item.link && item.title">
                    {{ item.title }}
                </span>
            </x-button>
        </li>
    </ul>
</template>

<script setup lang="ts">
    interface Menu {
        name?: string;
        title?: string;
        icon?: string;
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
    const router = useRouter();
    const emits = defineEmits<{
        'update:active': [value: number];
    }>();
    const handleClick = (menu: Menu, index: number): void => {
        if (menu.route) {
            if (menu.link) {
                window.open(menu.route, '_blank');
            } else {
                router.push(menu.route);
            }
        }
        emits('update:active', index);
    };
</script>

<style lang="less">
    .x-menu {
        &.row {
            li {
                + li {
                    margin-left: 10px;
                }
                transform-origin: center bottom;
            }
        }
        &.col {
            li {
                + li {
                    margin-top: 10px;
                }
                transform-origin: left center;
            }
            padding: 0 10px;
        }
        li {
            .x-button {
                color: inherit;
            }
            &.active {
                color: var(--primary);
                transform: scale(1.2);
            }
        }
    }
</style>
