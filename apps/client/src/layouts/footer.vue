<template>
    <footer class="footer">
        <a href="https://beian.miit.gov.cn/" target="_blank">{{ icp }}</a>
    </footer>
</template>

<script setup lang="ts">
    const icps = {
        'kk.wizardtech.cn': '粤ICP备15112102号-1',
        'xwink.fun': '湘ICP备2024041408号-1',
    } as Record<string, string>;
    const icp = Object.entries(icps).find(([k]) => location.hostname.includes(k))?.[1] ?? '本地开发环境';
</script>

<style scoped lang="less">
    .footer {
        padding: 5px;
        text-align: center;
        color: #666;
        font-size: 0.6em;
    }
</style>
