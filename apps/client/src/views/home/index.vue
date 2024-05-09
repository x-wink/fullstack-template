<template>
    <div class="home-container x-flex col col-center">
        <p class="title">自习室预约系统</p>
        <CommonPlace />
        <ul class="x-flex col">
            <li @click="handleRoute(item.route)" v-for="(item, index) in list" :key="index">{{ item.label }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    const userStore = useUserStore();
    const list = computed(() =>
        userStore.isEmployee
            ? [
                  {
                      label: '我的任务',
                      route: 'Task',
                  },
                  {
                      label: '扫码签到',
                      route: 'Sign',
                  },
              ]
            : [
                  {
                      label: '座位预约',
                      route: 'Room',
                  },
                  {
                      label: '我的预约',
                      route: 'List',
                  },
              ]
    );
    const router = useRouter();
    const handleRoute = (name: string) => {
        router.push({ name });
    };
</script>

<style scoped lang="less">
    .home-container {
        background: linear-gradient(180deg, #1b2854 0%, rgba(27, 40, 84, 0) 45%);
        .title {
            margin-top: 60px;
            text-align: center;
            font-size: 21px;

            font-weight: bold;
            color: #fff;
        }
        .common-place {
            margin-top: 80px;
        }
        ul {
            width: 300px;
            margin: auto;
            gap: var(--gap);
            li {
                width: 100%;
                padding: 30px;
                text-align: center;
                background: #fff;
                border-radius: 25px;
                box-shadow: 0 0 5px #0003;
                font-size: 23px;
                font-weight: bold;
                color: #060001;
            }
        }
    }
</style>
