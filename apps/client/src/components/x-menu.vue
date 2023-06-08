<template>
    <ul class="x-menu flex row-center col-center" :class="{ row: !props.vertical, col: props.vertical }">
        <li
            v-for="(item, index) in props.menus"
            :key="index"
            :class="{ active: props.active === item.code }"
            :title="item.title"
        >
            <x-button class="flex row-center" text :title="item.name" @click="handleClick(item)">
                <x-icon v-if="item.icon" :height="item.height" :name="item.icon" />
                <span v-if="item.name">
                    {{ item.name }}
                </span>
            </x-button>
        </li>
    </ul>
</template>

<script setup lang="ts">
    import { Menu } from '@/types';
    defineOptions({
        name: 'XMenu',
    });
    const props = defineProps<{
        menus: Menu[];
        active?: string;
        vertical?: boolean;
    }>();
    const router = useRouter();
    const emits = defineEmits<{
        'update:active': [value: string];
    }>();
    const handleClick = (menu: Menu): void => {
        if (menu.route) {
            if (menu.link) {
                window.open(menu.route, '_blank');
            } else {
                router.push({
                    name: menu.route,
                });
            }
        }
        emits('update:active', menu.code);
    };
</script>

<style lang="less">
    .x-menu {
        &.row {
            li {
                + li {
                    margin-left: 10px;
                }
            }
        }
        &.col {
            li {
                + li {
                    margin-top: 10px;
                }
            }
        }
        li {
            .x-button {
                font-size: 1rem;
                color: inherit;
            }
            &.active {
                color: var(--primary);
                transform: scale(1.2);
                transform-origin: center bottom;
            }
        }
    }
</style>
