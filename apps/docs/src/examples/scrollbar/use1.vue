<template>
    <XScrollbar max-height="200px">
        <div style="background: #fff3">
            <div v-for="(item, index) in 20" :key="index">这是很长的内容{{ index + 1 }}</div>
        </div>
    </XScrollbar>
    <br />
    <XScrollbar max-width="200px">
        <div style="background: #fff3; padding: 10px 0; white-space: nowrap; width: fit-content">
            <span v-for="(item, index) in 20" :key="index" :style="index ? 'margin-left:10px' : ''">
                这是很长的内容{{ index + 1 }}
            </span>
        </div>
    </XScrollbar>
</template>
<script setup lang="ts">
    import { XScrollbar } from '@pkgs/ui';
</script>
<style scoped lang="less"></style>
