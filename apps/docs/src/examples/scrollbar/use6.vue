<template>
    <XInputNumber v-model="top" min="0" show-controls step="10" />
    <br />
    <XScrollbar ref="refsScroll" always height="200px">
        <div class="content">
            <div v-for="(item, index) in 100" :key="index">这是很长的内容{{ index + 1 }}</div>
        </div>
    </XScrollbar>
</template>
<script setup lang="ts">
    import { XInputNumber, XScrollbar } from '@pkgs/ui';
    import { ref, watch } from 'vue';
    const refsScroll = ref();
    const top = ref(0);
    watch(top, (y) => {
        refsScroll.value!.scrollY(y);
    });
</script>
<style scoped lang="less">
    .content {
        background-color: #0003;
    }
</style>
