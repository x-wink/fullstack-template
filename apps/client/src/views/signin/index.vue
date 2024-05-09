<template>
    <div class="login-container x-flex col col-center">
        <div class="title">自习室预约系统</div>
        <img alt="LOGO" class="logo" src="@/assets/logo.png" />
        <van-form class="box x-flex col" @submit="handleSignin">
            <h3>欢迎登录</h3>
            <van-field v-model="form.username" :left-icon="IconUsername" placeholder="请输入学号" />
            <van-field v-model="form.password" :left-icon="IconPassword" placeholder="请输入密码" type="password" />
            <div class="signup" @click="handleSignup">注册</div>
            <van-button block class="signin" :loading="loading" native-type="submit" type="primary">登录</van-button>
        </van-form>
        <footer><a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2024041408号-1</a></footer>
    </div>
</template>

<script setup lang="ts">
    import { showToast } from 'vant';
    import IconUsername from '@/assets/icons/username.png';
    import IconPassword from '@/assets/icons/password.png';
    import { UserStatus } from '@pkgs/model';
    const userStore = useUserStore();
    const router = useRouter();

    const form = ref({
        username: '',
        password: '',
    });
    const loading = ref(false);
    const handleSignin = async () => {
        loading.value = true;
        if (await userStore.signin(form.value)) {
            const status = userStore.profile?.status;
            if (status === UserStatus.ACCEPT) {
                showToast('登录成功');
                const url = userStore.returnUrl;
                if (url) {
                    location.replace(url);
                    userStore.returnUrl = '';
                } else {
                    router.push({ name: 'Home' });
                }
            } else if (status === UserStatus.APPROVAL) {
                router.push({ name: 'Status', params: { status: 'approval' } });
            } else if (status === UserStatus.REJECT) {
                showToast('注册审核未通过');
            }
        } else {
            showToast('登录失败');
        }
        loading.value = false;
    };
    const handleSignup = () => {
        router.push({ name: 'Signup' });
    };
</script>

<style scoped lang="less">
    .login-container {
        width: 100%;
        height: 100%;
        position: relative;
        background:
            linear-gradient(180deg, var(--dark-blue) 0%, rgba(27, 40, 84, 0) 45%),
            url('../../assets/bgp.png') center center / cover no-repeat;
        > * {
            position: relative;
            z-index: 1;
        }
        .title {
            margin-top: 15%;
            color: #fff;
            font-weight: bolder;
        }
        .logo {
            width: 100px;
            height: 100px;
            margin: 10% 0 18%;
        }
        .box {
            width: 300px;
            height: 300px;
            padding: var(--gap-large);
            border-radius: var(--border-radius);
            background: #fff;
            --van-cell-horizontal-padding: var(--gap-mini);
            h3 {
                color: #000;
            }
            .van-field {
                margin-top: var(--gap);
                :deep(.van-field__left-icon) {
                    margin-right: 20px;
                }
            }
            .signup {
                margin-top: var(--gap-small);
                margin-left: auto;
                color: var(--van-primary-color);
                cursor: pointer;
            }
            .signin {
                margin-top: var(--gap);
            }
        }
        footer {
            position: absolute;
            bottom: 5px;
            font-size: 10px;
            a {
                color: #fff6 !important;
            }
        }
    }
</style>
