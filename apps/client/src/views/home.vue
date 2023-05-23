<template>
    <div class="container">HOME</div>
</template>

<script setup lang="ts">
    import { detailUser } from '@/api/user';
    detailUser(1).then(console.info);
</script>

<style scoped lang="less">
    .container {
    }
</style>
