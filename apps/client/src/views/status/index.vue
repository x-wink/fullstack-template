<template>
    <div class="status-container x-flex col col-center">
        <p class="title">{{ config.title }}</p>
        <CommonIcon class="icon" :name="config.icon" />
        <ul class="tips x-flex col">
            <li v-for="(item, index) in config.tips" :key="index" v-html="item"></li>
        </ul>
        <img v-if="status === 'signup'" alt="公众号二维码" class="qrcode" src="@/assets/qrcode.jpg" />
        <van-button block round type="primary" @click="handleBack">返回首页</van-button>
        <p class="count-down">{{ Math.round(countDown / 1000) }}s后自动返回首页</p>
    </div>
</template>

<script setup lang="ts">
    const configs = {
        approval: {
            header: '审批',
            icon: 'failed',
            title: '后台审批中',
            tips: ['后台审批中，审批通过后会以<span>公众号消息形式</span>通知您。'],
        },
        signup: {
            header: '注册',
            icon: 'success',
            title: '恭喜您，注册成功！',
            tips: [
                '已成功注册，请<span>等待后台审批</span>。',
                '审批通过后会以<span>公众号消息形式</span>通知您。',
                '请关注<span>上海重大传染病和生物安全研究院</span>公众号，以便接受预约。',
            ],
        },
        booking: {
            header: '预约',
            icon: 'success',
            title: '已发送预约请求',
            tips: [
                '已发送预约请求，请<span>等待后台审批</span>。',
                '请关注<span>上海重大传染病和生物安全研究院</span>公众号，查看预约结果。',
            ],
        },
    };

    const route = useRoute();
    const status = ref<'approval' | 'signup' | 'booking'>('approval');
    const config = computed(() => configs[status.value]);

    const layoutStore = useLayoutStore();
    watchEffect(() => {
        layoutStore.title = config.value.header;
    });

    const useCountDown = (
        total: number,
        step = 1000,
        hooks?: { update?: (current: number) => void; done?: () => void }
    ) => {
        let cancel = false;
        let current = total;
        const update = () => {
            if (cancel) return;
            current -= step;
            hooks?.update?.(current);
            if (current <= 0) {
                hooks?.done?.();
            } else {
                setTimeout(update, step);
            }
        };
        setTimeout(update, step);
        return () => (cancel = true);
    };

    const router = useRouter();
    let cancel: (() => void) | undefined;
    const handleBack = () => {
        cancel?.();
        cancel = void 0;
        if (status.value === 'booking') {
            router.replace({ name: 'Home' });
        } else {
            router.replace({ name: 'Signin' });
        }
    };

    const countDown = ref(5000);
    onActivated(() => {
        status.value = route.params.status as 'approval' | 'signup' | 'booking';
        countDown.value = 5000;
        cancel = useCountDown(countDown.value, 1000, {
            update: (val) => (countDown.value = val),
            done: handleBack,
        });
    });
</script>

<style scoped lang="less">
    .status-container {
        width: 100%;
        height: 100%;
        padding: 0 60px;
        .title {
            font-size: 28px;
            text-align: center;
            margin-top: 50px;
        }
        .icon {
            font-size: 60px;
            margin-top: var(--gap);
        }
        .tips {
            margin-top: var(--gap);
            list-style: disc;
            gap: var(--gap);
            :deep(span) {
                color: var(--blue);
            }
        }
        .qrcode {
            width: 120px;
            height: 120px;
            margin-top: var(--gap);
        }
        .van-button {
            margin-top: var(--gap);
        }
        .count-down {
            margin-top: var(--gap);
            font-size: 16px;
            color: #aaa;
        }
    }
</style>
