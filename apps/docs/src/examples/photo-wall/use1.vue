<template>
    <XPhotoWall :data="photos" :height="300" :skew="-10" :speed="20" />
</template>
<script setup lang="ts">
    import { XPhotoWall } from '@pkgs/ui';
    import { reactive } from 'vue';
    const getPhotoUrl = async (name: number) => {
        return new URL(`./photo/${name}.jpg`, import.meta.url).href;
    };
    const photos = reactive([] as string[]);
    Promise.all(
        Array.from({ length: 5 }, (_, index) => {
            return getPhotoUrl(index + 1);
        })
    ).then((res) => {
        photos.push(...res);
    });
</script>
<style scoped lang="less"></style>
