<template>
    <XPhotoWall :data="photos" :skew="-20" :speed="20" />
</template>
<script setup lang="ts">
    import { XPhotoWall } from '@pkgs/ui';
    import { reactive } from 'vue';
    import {} from 'vitepress';
    const getPhotoUrl = async (name: number) => {
        return new URL(
            `./${
                (typeof window !== 'undefined' && location.search.match(/[?&]p=([^&]*)/)?.[1]) ?? 'photo'
            }/${name}.png`,
            import.meta.url
        ).href;
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
