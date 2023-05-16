<template>
    <div v-if="visible" class="welcome flex col row-center col-center">
        <img alt="tips" class="tips" src="@/assets/tips.png" @click.stop />
        <img alt="btn" class="btn" src="@/assets/tips-btn.png" @click="handleClose" />
    </div>
    <Tips v-else />
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import Tips from './tips.vue';
    const visible = ref(JSON.parse(sessionStorage.getItem('welcome') ?? 'true'));
    const handleClose = () => {
        el.style.overflow = 'auto';
        visible.value = false;
        sessionStorage.setItem('welcome', 'false');
    };
    let el: HTMLElement;
    onMounted(() => {
        el = document.scrollingElement as HTMLElement;
        if (visible.value) {
            el.style.overflow = 'hidden';
        }
    });
</script>

<style scoped lang="less">
    .welcome {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        width: 100%;
        max-width: var(--max-width);
        margin: auto;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        .tips {
            width: 90%;
        }
        .btn {
            width: 160px;

            position: relative;
            top: -64px;
        }
    }
</style>
