<template>
    <div class="login-container" @keypress.enter="handleLogin">
        <el-form class="box" label-position="top" :model="form">
            <el-form-item>
                <h2 class="title">自习室预约后台管理系统</h2>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" clearable />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" clearable show-password type="password" />
            </el-form-item>
            <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
        </el-form>
    </div>
    <a class="icp" href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2024041408号-1</a>
</template>

<script setup lang="ts">
    import { ElMessage } from 'element-plus';
    const userStore = useUserStore();
    const router = useRouter();

    const form = ref({
        username: '',
        password: '',
    });
    const loading = ref(false);
    const handleLogin = async () => {
        loading.value = true;
        if (await userStore.signin(form.value)) {
            ElMessage.success('登录成功');
            const url = userStore.returnUrl;
            if (url) {
                location.replace(url);
                userStore.returnUrl = '';
            } else {
                router.push({ name: 'Home' });
            }
        } else {
            ElMessage.error('登录失败');
        }
        loading.value = false;
    };
</script>

<style scoped lang="less">
    .login-container {
        width: 100%;
        height: 100%;
        position: relative;
        .box {
            position: absolute;
            width: 360px;
            height: fit-content;
            background: var(--bgc);
            padding: var(--gap-super);
            border-radius: var(--border-radius);
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            .title {
                width: 100%;
                text-align: center;
            }
            .login-btn {
                width: 100%;
            }
        }
    }
    .icp {
        position: absolute;
        width: max-content;
        bottom: var(--gap);
        left: 0;
        right: 0;
        margin: auto;
        color: var(--fc);
    }
</style>
