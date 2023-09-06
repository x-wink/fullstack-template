<template>
    <XText ellipsis style="width: 200px">这段文字的最大宽度为200px</XText>
    <div class="container">
        <XText ellipsis>这段文字的最大宽度为容器宽度</XText>
    </div>
</template>
<script setup lang="ts">
    import { XText } from '@pkgs/ui';
</script>
<style scoped lang="less">
    .container {
        width: 200px;
    }
</style>
