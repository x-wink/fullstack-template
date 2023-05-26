<template>
    <section class="content">
        <Suspense>
            <router-view />
        </Suspense>
    </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        > .container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
</style>
