<template>
    <div class="home x-flex">
        <div class="left">
            <el-carousel>
                <el-carousel-item v-for="(item, index) in banners" :key="index">
                    <div class="banner">
                        <img :src="item" />
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script setup lang="ts">
    import banner1 from '@/assets/banner1.jpg';
    import banner2 from '@/assets/banner2.jpg';
    const banners = [banner1, banner2];
</script>

<style scoped lang="less">
    .home {
        width: 100%;
        height: 100%;
        gap: var(--gap-super);
        overflow: hidden;
        .left {
            width: 50%;
            height: fit-content;
            margin: auto 0;
            .banner {
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }
        .right {
            width: 50%;
            height: 50vh;
            margin: auto 0;
            a {
                color: #fff !important;
            }
        }
    }
</style>
