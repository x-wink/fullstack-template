<template>
    <div class="login-container x-flex col col-center">
        <div class="title">XXX系统</div>
        <van-form class="box x-flex col" @submit="handleSignin">
            <h3>欢迎登录</h3>
            <van-field v-model="form.username" placeholder="请输入学号" />
            <van-field v-model="form.password" placeholder="请输入密码" type="password" />
            <div class="signup" @click="handleSignup">注册</div>
            <van-button block class="signin" :loading="loading" native-type="submit" type="primary">登录</van-button>
        </van-form>
        <footer><a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2024041408号-1</a></footer>
    </div>
</template>

<script setup lang="ts">
    import { showToast } from 'vant';
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
            showToast('登录成功');
            const url = userStore.returnUrl;
            if (url) {
                location.replace(url);
                userStore.returnUrl = '';
            } else {
                router.push({ name: 'Home' });
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
            linear-gradient(180deg, var(--dark-blue) 0%, rgba(27, 40, 84, 0) 45%);
        > * {
            position: relative;
            z-index: 1;
        }
        .title {
            margin-top: 15%;
            color: #fff;
            font-weight: bolder;
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
