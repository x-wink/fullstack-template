<template>
    <XModal
        v-model="visible"
        content="输入用户名"
        defaultValue="xwink"
        :inputAttrs="{ clearable: true }"
        :modal="false"
        placeholder="请输入"
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
