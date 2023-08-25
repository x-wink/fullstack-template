<template>
    <div class="container x-flex col">
        <div class="top x-flex row-center">
            <XPopover
                v-for="(item, index) in popoverPlacements.slice(0, 3)"
                :key="index"
                v-model="visible"
                arrow
                :placement="item"
                static
            >
                {{ item }}
            </XPopover>
        </div>
        <div class="middle x-flex row-center col-center">
            <div class="left x-flex col row-center col-end">
                <XPopover
                    v-for="(item, index) in popoverPlacements.slice(9)"
                    :key="index"
                    v-model="visible"
                    arrow
                    :placement="item"
                    static
                >
                    {{ item }}
                </XPopover>
            </div>
            <div class="center x-flex row-center col-center">
                <XPopover class="x-flex row-center col-center" :modelValue="true" static>弹出位置</XPopover>
            </div>
            <div class="right x-flex col row-center col-start">
                <XPopover
                    v-for="(item, index) in popoverPlacements.slice(3, 6)"
                    :key="index"
                    v-model="visible"
                    arrow
                    :placement="item"
                    static
                >
                    {{ item }}
                </XPopover>
            </div>
        </div>
        <div class="bottom x-flex row-center">
            <XPopover
                v-for="(item, index) in popoverPlacements.slice(6, 9)"
                :key="index"
                v-model="visible"
                arrow
                :placement="item"
                static
            >
                {{ item }}
            </XPopover>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { XPopover, popoverPlacements } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(true);
</script>
<style scoped lang="less">
    .container {
        .center {
            width: var(--x-width-super);
        }
    }
    .x-popover {
        background: var(--x-primary);
        padding: var(--x-space-small);
        margin: var(--x-space-small);
        .center & {
            width: 80%;
            height: var(--x-width);
            text-align: center;
            background: var(--x-white);
            color: var(--x-primary);
        }
    }
</style>
