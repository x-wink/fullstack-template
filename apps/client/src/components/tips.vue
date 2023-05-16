<template>
    <div v-if="visible" class="first-tips" @click="handleClose">
        <img alt="header" class="header" src="@/assets/header.gif" />
        <div class="main">
            <div class="bg">
                <img alt="bg1" src="@/assets/bg1.png" />
                <img alt="bg2" src="@/assets/bg2.png" />
            </div>
            <div class="content">
                <Point :point="points[0]" />
                <div class="tips-point">
                    <img alt="tips-point" src="@/assets/tips-pointer1.png" />
                    <p>第①步：点击查看位置信息，前往展点</p>
                    <p style="margin-right: 10%">（打卡顺序不限）</p>
                </div>
            </div>
            <div class="operation flex col">
                <div class="btn">
                    <img alt="bag" src="@/assets/btn-bag.png" />
                    <div class="edge">{{ cardsCount }}</div>
                </div>
                <div class="btn">
                    <img alt="flow" src="@/assets/btn-flow.png" />
                </div>
                <div class="btn">
                    <img alt="share" src="@/assets/btn-share.png" />
                </div>
                <img alt="tips-operation" class="tips-operation" src="@/assets/tips-operation.png" />
            </div>
        </div>
        <Find disabled />
        <div class="tips-find">
            <p>第②步：展点前AI识图，收集宝藏卡</p>
            <img alt="tips-find" src="@/assets/tips-pointer2.png" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { points, cardsCount } from '@/utils';
    import Find from '@/components/find.vue';
    import Point from '@/components/point.vue';
    import { onMounted } from 'vue';
    const visible = ref(JSON.parse(sessionStorage.getItem('tips') ?? 'true'));
    const handleClose = () => {
        el.style.overflow = 'auto';
        visible.value = false;
        sessionStorage.setItem('tips', 'false');
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
    .first-tips {
        --error: #f56c6c;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        width: 100%;
        margin: auto;
        max-width: var(--max-width);
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        align-items: center;
        .header {
            width: 100%;
            margin-bottom: -1px;
            opacity: 0;
        }

        .main {
            width: 100%;
            position: relative;

            .bg {
                opacity: 0;
                display: flex;
                flex-direction: column;

                img {
                    width: 100%;
                }
            }

            .content {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                .point {
                    &::before {
                        content: '';
                        display: block;
                        width: 170%;
                        aspect-ratio: 1;
                        position: absolute;
                        border-radius: 50%;
                        top: -65%;
                        left: -30%;
                    }
                }
                .tips-point {
                    width: 100%;
                    position: absolute;
                    z-index: 100;
                    top: 10%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 18px;
                    font-weight: bolder;
                    img {
                        width: 15%;
                        margin-right: 30%;
                        margin-bottom: 5px;
                    }
                }
            }

            .operation {
                position: fixed;
                right: 10px;
                z-index: 100;

                @media (min-width: 500px) {
                    right: calc((100vw - 500px) / 2);
                }

                top: 27%;
                .btn {
                    width: 50px;
                    height: 50px;
                    position: relative;

                    img {
                        width: 100%;
                    }
                    .edge {
                        background: var(--error);
                        position: absolute;
                        width: 1.5em;
                        height: 1.5em;
                        text-align: center;
                        line-height: 1.5em;
                        border-radius: 50%;
                        top: -0.5em;
                        right: -0.5em;
                        box-shadow: 0 0 5px white;
                    }
                    + .btn {
                        margin-top: 10px;
                    }
                }
                .tips-operation {
                    height: 170%;
                    position: absolute;
                    z-index: 100;
                    transform: translate(-100%, -60%);
                }
            }
        }
        .tips-find {
            width: 100%;
            position: absolute;
            z-index: 100;
            top: 70%;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 18px;
            font-weight: bolder;
            img {
                width: 12%;
                margin-right: 30%;
                margin-top: 5px;
            }
        }
    }
</style>
