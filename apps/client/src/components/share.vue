<template>
    <div v-show="props.modelValue" class="share flex col row-center col-center" @click="handleClose">
        <img alt="posters" src="@/assets/posters.png" @click.stop />
        <p class="tips">长按图片保存到手机</p>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        modelValue: boolean;
    }>();
    const emits = defineEmits(['update:modelValue']);
    const handleClose = () => {
        emits('update:modelValue', false);
    };
</script>

<style scoped lang="less">
    .share {
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
        img {
            width: 90%;
        }
        .tips {
            margin-top: 20px;
            opacity: 0.6;
        }
    }
</style>
