<template>
    <div class="container">
        <p>告诉你一个秘密你想不想听？</p>
        <XButton icon="Logo" theme="primary" @click="handleModal">想听</XButton>
    </div>
</template>

<script setup lang="ts">
    import { showAlert } from '@pkgs/ui';
    const handleModal = async () => {
        showAlert('V我五十就告诉你');
    };
</script>

<style scoped lang="less">
    .container {
        p {
            margin-bottom: 20px;
        }
    }
</style>
