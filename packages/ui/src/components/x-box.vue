<template>
    <div class="x-box">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
    defineOptions({
        name: 'XBox',
    });
</script>

<style lang="less">
    @keyframes breathe {
        from {
            box-shadow: inset 0 0 15px var(--x-primary);
        }
        to {
            box-shadow: inset 0 0 0px #0000;
        }
    }
    .x-box {
        border: 2px solid var(--x-primary);
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(0.2rem);
        overflow: hidden;
        box-shadow: inset 0 0 15px var(--x-primary);
        animation: breathe 1s ease-in-out 0s infinite alternate-reverse;
    }
</style>
