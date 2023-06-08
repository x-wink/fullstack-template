<template>
    <div class="container">
        <p>告诉你一个秘密你想不想听？</p>
        <x-button @click="handleModal">想听</x-button>
    </div>
</template>

<script setup lang="ts">
    import { showAlert } from '@/utils';
    const handleModal = async () => {
        showAlert('V我五十就告诉你');
    };
</script>

<style scoped lang="less">
    .container {
        font-size: 1.2em;
        p {
            margin-bottom: 20px;
        }
    }
</style>
