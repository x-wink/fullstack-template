<template>
    <XModal
        v-model="visible"
        content="输入付款金额"
        :defaultValue="123456"
        :inputAttrs="{ showControls: true }"
        inputType="number"
        :modal="false"
        show-cancel
        show-input
        static
        title="要求输入"
    />
</template>
<script setup lang="ts">
    import { XModal } from '@pkgs/ui';
    import { ref } from 'vue';
    const visible = ref(true);
</script>
