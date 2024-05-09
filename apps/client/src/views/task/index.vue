<template>
    <div class="help-container">
        <ul class="list x-flex col">
            <li v-for="(item, index) in list" :key="index">
                <p class="time">{{ item.time.toLocaleDateString() }}</p>
                <p class="location">{{ item.location }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    const layoutStore = useLayoutStore();
    layoutStore.title = '我的任务';

    const list = ref([
        {
            time: new Date(),
            location: '图书馆一楼',
        },
        {
            time: new Date(),
            location: '图书馆二楼',
        },
    ]);
</script>

<style scoped lang="less">
    .help-container {
        padding: var(--gap);
        overflow: auto !important;
        .list {
            width: 100%;
            gap: var(--gap);
            li {
                width: 100%;
                padding: var(--gap);
                background: #fff;
                border-radius: 8px;
                font-size: 16px;
                color: #666e7d;
                line-height: 26px;
                .time {
                    font-weight: bold;
                    color: #323333;
                    line-height: 26px;
                }
            }
        }
    }
</style>
