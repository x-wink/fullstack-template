<template>
    <div class="container x-flex row-center">
        <div ref="refsTarget" class="target x-flex row-center col-center" @click="visible = true">点击目标元素显示</div>
        <XPopup v-model="visible" arrow close-on-click-outside :target="refsTarget">点击气泡外面隐藏</XPopup>
    </div>
</template>
<script setup lang="ts">
    import { XPopup } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(false);

    const refsTarget = ref<HTMLDivElement>();
</script>
<style scoped lang="less">
    .container {
        margin: 60px 0;
        .target {
            border-radius: var(--x-border-radius);
            padding: var(--x-space);
            background: var(--x-white);
            color: var(--x-primary);
        }
    }
</style>
