<template>
    <div class="feedback-container x-flex col col-center">
        <van-form class="box x-flex col" @submit="handleSignin">
            <van-field v-model="form.title" label="标题" maxlength="20" placeholder="简短描述" />
            <van-field
                v-model="form.content"
                autosize
                label="留言内容"
                maxlength="255"
                placeholder="请输入留言"
                rows="5"
                show-word-limit
                type="textarea"
            />
            <van-button block class="signin" :loading="loading" native-type="submit" type="primary">提交</van-button>
        </van-form>
    </div>
</template>

<script setup lang="ts">
    import { showToast } from 'vant';

    const layoutStore = useLayoutStore();
    layoutStore.title = '留言';

    const form = ref({
        title: '',
        content: '',
    });
    const loading = ref(false);
    const router = useRouter();
    const userStore = useUserStore();
    const handleSignin = async () => {
        loading.value = true;
        if (!form.value.title) {
            showToast('请输入标题');
        } else if (!form.value.content) {
            showToast('请输入留言内容');
        } else {
            const id = await api.createFeedback({ ...form.value, userId: userStore.profile?.id });
            if (id) {
                showToast('提交成功');
                router.back();
            } else {
                showToast('提交失败');
            }
        }
        loading.value = false;
    };
</script>

<style scoped lang="less">
    .feedback-container {
        .box {
            width: 90%;
            padding: var(--gap-large);
            border-radius: var(--border-radius);
            background: #fff;
            --van-cell-horizontal-padding: var(--gap-mini);
            .signin {
                margin-top: var(--gap);
            }
        }
    }
</style>
