<template>
    <div class="profile-container x-flex col col-center">
        <div class="mask"></div>
        <p class="title">我的</p>
        <div class="card x-flex col row-center col-center">
            <div class="avatar">
                <img :src="userStore.profile?.avatar ?? avatar" />
            </div>
            <p class="username">{{ userStore.profile?.nickname ?? userStore.profile?.username }}</p>
            <div class="history x-flex col-center">
                <div class="x-flex col col-center">
                    <p class="value">{{ handleFormat(sum.today) }}</p>
                    <p class="label">当日学习</p>
                </div>
                <div class="split"></div>
                <div class="x-flex col col-center">
                    <p class="value">{{ handleFormat(sum.week) }}</p>
                    <p class="label">最近一周</p>
                </div>
                <div class="split"></div>
                <div class="x-flex col col-center">
                    <p class="value">{{ handleFormat(sum.month) }}</p>
                    <p class="label">最近一月</p>
                </div>
            </div>
        </div>
        <van-cell-group inset>
            <van-cell
                v-for="(item, index) in menus"
                :key="index"
                :icon="item.icon"
                is-link
                :title="item.label"
                @click="handleClick(item)"
            />
        </van-cell-group>
    </div>
</template>

<script setup lang="ts">
    import avatar from '@/assets/avatar.png';
    import IconRule from '@/assets/icons/rule.png';
    import IconFeedback from '@/assets/icons/feedback.png';
    import IconHelp from '@/assets/icons/help.png';
    import IconSignout from '@/assets/icons/signout.png';
    import type { RSumStudyTimes } from '@pkgs/model';
    import { showConfirmDialog } from 'vant';

    const userStore = useUserStore();
    const sum = ref<RSumStudyTimes>({ today: 0, week: 0, month: 0 });
    const handleFormat = (minus: number) => {
        if (minus < 60) return `${Math.round(minus)}分钟`;
        const hour = Math.round(minus / 60);
        return `${hour.toFixed(2)}小时`;
    };
    const loadData = async () => {
        const res = await api.sumStudyTimes(userStore.profile!.id!);
        if (res) {
            sum.value = res;
        }
    };
    loadData();

    const menus = [
        {
            label: '使用规则',
            icon: IconRule,
            route: 'Rule',
        },
        {
            label: '我要留言',
            icon: IconFeedback,
            route: 'Feedback',
        },
        {
            label: '使用帮助',
            icon: IconHelp,
            route: 'Help',
        },
        {
            label: '退出登录',
            icon: IconSignout,
            handler: async () => {
                await showConfirmDialog({
                    title: '提示',
                    message: '确定要退出登录吗？',
                });
                userStore.signout();
            },
        },
    ];
    const router = useRouter();
    const handleClick = (item: (typeof menus)[number]) => {
        if (item.route) {
            router.push({ name: item.route });
        } else {
            item.handler?.();
        }
    };
</script>

<style scoped lang="less">
    .profile-container {
        position: relative;
        > * {
            z-index: 10;
        }
        .mask {
            width: 150%;
            height: 248px;
            background: #1b2854;
            position: absolute;
            z-index: 0;
            border-bottom-left-radius: 50%;
            border-bottom-right-radius: 50%;
        }
        .title {
            margin-top: 60px;
            text-align: center;
            font-size: 21px;
            font-weight: bold;
            color: #fff;
        }
        .card {
            width: 80%;
            padding: var(--gap);
            margin-top: 80px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px #0003;
            position: relative;
            font-size: 18px;
            color: #333;
            .avatar {
                width: 80px;
                height: 80px;
                background: #f4f4f6;
                border-radius: 50%;
                margin-top: -60px;
                box-shadow: inset 0 0 5px #0003;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .username {
                font-size: 21px;
                margin-top: var(--gap);
            }
            .history {
                margin-top: var(--gap);
                gap: var(--gap-small);
                .split {
                    width: 1px;
                    height: 22px;
                    background: #cacaca;
                }
                .label {
                    font-size: 16px;
                    color: #cacaca;
                }
                .value {
                    white-space: nowrap;
                }
            }
        }
        .van-cell-group {
            width: 80%;
            margin: var(--gap) auto 0;
            gap: var(--gap);
            :deep(.van-cell__left-icon) {
                display: flex;
                flex-direction: column;
                justify-content: center;
                img {
                    font-size: 22px;
                    margin-right: var(--gap-mini);
                }
            }
            :deep(.van-cell__title) {
                font-size: 18px;
                color: #333;
            }
        }
    }
</style>
