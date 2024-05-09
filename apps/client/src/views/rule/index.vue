<template>
    <div class="rule-container">
        <CommonRule @confirm="handleBack" />
    </div>
</template>

<script setup lang="ts">
    const layoutStore = useLayoutStore();
    layoutStore.title = '使用规则';

    const router = useRouter();
    const handleBack = () => {
        router.back();
    };
</script>

<style scoped lang="less">
    .rule-container {
        padding: var(--gap);
    }
</style>
