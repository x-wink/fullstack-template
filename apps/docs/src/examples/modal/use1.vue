<template>
    <div class="container x-flex wrap col-center">
        <XModal v-model="visible" content="静态展示弹窗" :modal="false" static />
        <XModal v-model="visible" content="有取消按钮" :modal="false" show-cancel static />
        <XModal v-model="visible" content="有标题栏" :modal="false" show-cancel static title="操作提示" />
        <XModal
            v-model="visible"
            content="输入提示"
            defaultValue="123456"
            inputType="password"
            :modal="false"
            placeholder="请输入密码"
            show-cancel
            show-input
            static
            title="要求输入"
        />
    </div>
</template>
<script setup lang="ts">
    import { XModal } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(true);
</script>
<style lang="less">
    .container {
        .x-modal {
            margin: var(--x-space);
        }
    }
</style>
