<template>
    <div class="container x-flex row-center">
        <div ref="refsTarget" class="target x-flex row-center col-center" @click="visible = !visible">
            点击目标元素{{ visible ? '隐藏' : '显示' }}
        </div>
        <XPopup
            v-for="(item, index) in popupPlacements"
            :key="index"
            v-model="visible"
            arrow
            :placement="item"
            :target="refsTarget"
        >
            {{ item }}
        </XPopup>
    </div>
</template>
<script setup lang="ts">
    import { XPopup, popupPlacements } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(true);

    const refsTarget = ref<HTMLDivElement>();
</script>
<style scoped lang="less">
    .container {
        margin: 60px 0;
        .target {
            border-radius: var(--x-border-radius);
            width: var(--x-width-super);
            height: var(--x-width);
            text-align: center;
            background: var(--x-white);
            color: var(--x-primary);
        }
    }
</style>
