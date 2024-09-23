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
        <div class="right">
            <h3>资料文件</h3>
            <br />
            <ul>
                <li>
                    <a :href="doc" target="_blank">市传研院研究生办公区域管理规定</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import banner1 from '@/assets/banner1.jpg';
    import banner2 from '@/assets/banner2.jpg';
    import doc from '@/assets/市传研院研究生办公区域管理规定.docx?url';
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
