<template>
    <XInput v-model="value1" clearable placeholder="domain" prefix="https://" suffix="/README.md" />
    <br />
    <XInput v-model="value2" placeholder="请输入金额">
        <template #prefix>￥</template>
    </XInput>
    <br />
    <XInput v-model="value3" clearable placeholder="请输入搜索条件">
        <template #suffix><XButton icon="Search" theme="primary" /></template>
    </XInput>
</template>
<script setup lang="ts">
    import { XInput, XButton } from '@pkgs/ui';
    import { ref } from 'vue';
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('');
</script>
