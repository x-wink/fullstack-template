<template>
    <div class="common-rule">
        <div class="card">
            <p class="title">座位预约使用规则</p>
            <ul class="list x-flex col">
                <li v-for="(item, index) in list" :key="index">
                    <span class="label">{{ item.title }}:</span>
                    <span class="value">{{ item.content }}</span>
                </li>
            </ul>
        </div>
        <van-button block round type="primary" v-bind="attrs" @click="handleClick"><slot>我知道了</slot></van-button>
    </div>
</template>

<script setup lang="ts">
    defineOptions({
        inheritAttrs: false,
    });
    const attrs = useAttrs();

    const layoutStore = useLayoutStore();
    layoutStore.title = '使用规则';

    const list = ref([
        {
            title: '签到',
            content: '预约座位后，须在预约规定的时间内扫描桌上的二维码，打开蓝牙进行签到，方可入座。',
        },
        {
            title: '签离',
            content: '当前座位用户离开不再返回时，需要在预约系统中点击释放座位使用权。',
        },
        {
            title: '暂离',
            content: '用户需要临时离开座位时，可点击“暂离”按钮，但需要在规定时间内返回进行签到。',
        },
    ]);

    const emits = defineEmits<{
        confirm: [];
    }>();
    const handleClick = () => {
        emits('confirm');
    };
</script>

<style lang="less">
    .common-rule {
        .card {
            padding: var(--gap) 0;
            background: #fff;
            border-radius: 18px;
            .title {
                font-size: 20px;
                font-weight: bold;
                color: #000;
                text-align: center;
            }
            .list {
                width: 100%;
                margin-top: var(--gap);
                gap: var(--gap);
                li {
                    width: 100%;
                    padding: 0 var(--gap);
                    border-radius: 8px;
                    font-size: 16px;
                    color: #666e7d;
                    line-height: 26px;
                    .label {
                        font-weight: bold;
                        color: #323333;
                    }
                }
            }
        }
        .van-button {
            margin: var(--gap) auto 0;
            width: 80%;
        }
    }
</style>
