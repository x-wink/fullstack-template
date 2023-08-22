<template>
    <div class="container">
        <p>告诉你一个秘密你想不想听？</p>
        <x-button icon="Logo" theme="primary" @click="handleModal">想听</x-button>
    </div>
</template>

<script setup lang="ts">
    import { showAlert } from '@pkgs/ui';
    const handleModal = async () => {
        if (new Date().toDateString() === 'Tue Aug 22 2023') {
            showAlert('七夕快乐哟~', '', '你也是');
        } else {
            showAlert('V我五十就告诉你');
        }
    };
</script>

<style scoped lang="less">
    .container {
        p {
            margin-bottom: 20px;
        }
    }
</style>
