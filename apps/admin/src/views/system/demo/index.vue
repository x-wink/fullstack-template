<template>
    <div>
        <div class="x-flex">
            <el-input v-model="data" :autosize="{ minRows: 10, maxRows: 20 }" resize="none" type="textarea" />
            <el-input :autosize="{ minRows: 10, maxRows: 20 }" :model-value="output" resize="none" type="textarea" />
        </div>
        <el-button type="primary" @click="handleEncrypt">加密</el-button>
    </div>
</template>

<script setup lang="ts">
    import { encryptData } from '@pkgs/rsa/browser';

    const data = ref(JSON.stringify({ a: 1, b: 2, c: '3'.repeat(10000) }, undefined, 4));
    const output = ref('');
    const handleEncrypt = async () => {
        output.value = JSON.stringify(await encryptData(data.value), undefined, 4);
    };
</script>

<style scoped lang="less"></style>
