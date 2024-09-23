<template>
    <div class="login-container x-flex col col-center row-center">
        <div class="title">XXX系统</div>
        <van-form class="box x-flex col" @submit="handleSignup">
            <h3>欢迎注册</h3>
            <van-field v-model="form.username" placeholder="请输入账号" />
            <van-field v-model="form.realname" placeholder="请输入姓名" />
            <van-field v-model="form.phone" placeholder="请输入手机号码" />
            <van-field v-model="form.password" placeholder="请输入密码" type="password" />
            <van-field v-model="form.repwd" placeholder="请再次输入密码" type="password" />
            <div class="signup" @click="handleSignin">登录</div>
            <van-button block class="signin" :loading="loading" native-type="submit" type="primary">注册</van-button>
            <br />
            <van-checkbox-group v-model="igree" class="protect" shape="square">
                <van-checkbox name="a">
                    我已阅读并同意
                    <a href="javascript:void(0);" @click.stop="protectVisible = true">《用户协议》</a>
                </van-checkbox>
            </van-checkbox-group>
        </van-form>
        <van-dialog v-model:show="protectVisible" confirm-button-text="知道了">
            <div class="protect-dialog x-flex col">
                <h3>XXX系统用户协议</h3>
                <ul class="x-flex col">
                    <li>为了页面展示，在您的明确同意后，收集您的昵称、头像等微信个人信息。</li>
                    <li>为了签到定位，在您的明确同意后，收集您的位置信息。</li>
                    <li>为了扫码签到，在您的明确同意后，访问您的摄像头。</li>
                </ul>
            </div>
        </van-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { Student } from '@pkgs/model';
    import { studentDefaults } from '@pkgs/model';
    import { showToast } from 'vant';
    const router = useRouter();

    const igree = ref([]);
    const protectVisible = ref(false);

    const form = ref<Student & { repwd: string }>({ ...studentDefaults(), repwd: '', phone: '' });
    const dict = {
        username: '账号',
        realname: '姓名',
        phone: '手机号码',
        password: '密码',
    };
    const validate = () => {
        let valid = ['username', 'realname', 'phone', 'password'].every((key) => {
            if (key in dict) {
                if (!form.value[key as keyof typeof form.value]) {
                    showToast(dict[key as keyof typeof dict] + '不能为空');
                    return false;
                }
            }
            return true;
        });
        if (valid) {
            if (form.value.repwd !== form.value.password) {
                valid = false;
                showToast('两次密码不一致');
            }
        }
        return valid;
    };
    const loading = ref(false);
    const userStore = useUserStore();
    const handleSignup = async () => {
        if (!igree.value.length) {
            showToast('请阅读并同意用户协议');
            return;
        }
        loading.value = true;
        if (validate()) {
            const data = { ...form.value, enabled: true, code: userStore.code } as Student;
            delete (data as unknown as Record<string, unknown>).repwd;
            const id = await api.signup(data);
            if (id) {
                showToast('注册成功');
                await userStore.signin({ username: data.username, password: data.password });
                router.push({ name: 'Status', params: { status: 'signup' } });
            }
        }
        loading.value = false;
    };
    const handleSignin = () => {
        router.push({ name: 'Signin' });
    };
</script>

<style scoped lang="less">
    .protect-dialog {
        padding: var(--gap);
        gap: var(--gap);
        h3 {
            text-align: center;
        }
        ul {
            list-style: disc;
            gap: var(--gap);
            margin-left: var(--gap);
        }
    }
    .login-container {
        position: relative;
        overflow: auto !important;
        background:
            linear-gradient(180deg, var(--dark-blue) 0%, rgba(27, 40, 84, 0) 45%),
            url('../../assets/bgp.png') center center / cover no-repeat;
        > * {
            position: relative;
            z-index: 1;
        }
        .title {
            color: #fff;
            font-weight: bolder;
        }
        .logo {
            width: 80px;
            height: 80px;
            margin: var(--gap) 0;
        }
        .box {
            width: 300px;
            padding: var(--gap-large);
            border-radius: var(--border-radius);
            background: #fff;
            --van-cell-horizontal-padding: var(--gap-mini);
            h3 {
                color: #000;
            }
            .van-field {
                margin-top: var(--gap-mini);
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
            .protect {
                font-size: 12px;
                --van-checkbox-size: 14px;
            }
        }
    }
</style>
