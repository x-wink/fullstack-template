<template>
    <div class="common-card">
        <div v-if="slots['header-left'] || slots['header-right']" class="header x-flex row-between col-center">
            <div><slot name="header-left"></slot></div>
            <div><slot name="header-right"></slot></div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    const slots = useSlots();
</script>

<style lang="less">
    .common-card {
        background: #fff;
        border-radius: 18px;
        font-size: 16px;
        color: #000;
        box-shadow: 0 0 5px #0003;
        .header {
            padding: 0 var(--gap);
            height: 45px;
            border-bottom: 1px solid #dfdfdf;
        }
        .content {
            padding: var(--gap);
        }
    }
</style>
