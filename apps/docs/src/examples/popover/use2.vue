<template>
    <div class="container x-flex col">
        <div class="top x-flex row-center">
            <XPopover
                v-for="(item, index) in popoverPlacements.slice(0, 3)"
                :key="index"
                v-model="visible"
                arrow
                :placement="item"
                :target="refsTarget"
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
                    :target="refsTarget"
                >
                    {{ item }}
                </XPopover>
            </div>
            <div class="center x-flex row-center col-center">
                <div ref="refsTarget" class="target x-flex row-center col-center">目标元素</div>
            </div>
            <div class="right x-flex col row-center col-start">
                <XPopover
                    v-for="(item, index) in popoverPlacements.slice(3, 6)"
                    :key="index"
                    v-model="visible"
                    arrow
                    :placement="item"
                    :target="refsTarget"
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
                :target="refsTarget"
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

    const refsTarget = ref<HTMLDivElement>();
</script>
<style scoped lang="less">
    .container {
        margin: 60px 0;
        .center {
            width: var(--x-width-super);
            .target {
                width: 80%;
                height: var(--x-width);
                text-align: center;
                background: var(--x-white);
                color: var(--x-primary);
            }
        }
    }
</style>
