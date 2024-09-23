<template>
    <div class="x-header x-flex row-between col-center">
        <div class="logo x-flex row-center col-center">
            <img src="../assets/logo.png" />
        </div>
        <div class="right x-flex col-center">
            <p class="username">{{ userStore.profile?.username }}</p>
            <el-button :icon="SwitchButton" text type="danger" @click="handleSignout" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { SwitchButton } from '@element-plus/icons-vue';
    const userStore = useUserStore();
    const handleSignout = () => {
        userStore.signout();
    };
</script>

<style scoped lang="less">
    .x-header {
        height: 60px;
        background: var(--bgc);
        padding: var(--gap);
        .logo {
            padding: var(--gap-small);
            border-radius: 999px;
            height: 100%;
            aspect-ratio: 1;
            background: #fff;
            img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
        }
        .right {
            gap: var(--gap);
        }
    }
</style>
