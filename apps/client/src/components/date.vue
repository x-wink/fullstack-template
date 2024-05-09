<template>
    <div class="common-date x-flex col-center">
        <template v-for="(item, index) in list" :key="index">
            <div
                class="item x-flex col row-center col-center"
                :class="{ active: modelValue === handleFormat(item.value, 'YYYY-MM-DD') }"
                @click="modelValue = handleFormat(item.value, 'YYYY-MM-DD')"
            >
                <p class="label">{{ item.label }}</p>
                <p class="time">{{ handleFormat(item.value) }}</p>
            </div>
            <div v-if="index !== list.length - 1" class="split"></div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import dayjs from 'dayjs';
    const list = ref<{ label: string; value: Date }[]>([]);
    const modelValue = defineModel<string>({ required: true });
    const handleFormat = (date: Date, fmt = 'MM月DD日') => dayjs(date).format(fmt);
    onActivated(() => {
        list.value = [
            {
                label: '今天',
                value: dayjs(new Date()).toDate(),
            },
            {
                label: '明天',
                value: dayjs(new Date()).add(1, 'day').toDate(),
            },
            {
                label: '后天',
                value: dayjs(new Date()).add(2, 'day').toDate(),
            },
        ];
    });
</script>

<style lang="less">
    .common-date {
        height: 60px;
        background: #fff;
        .split {
            width: 1px;
            height: 42px;
            background: #dfdfdf;
        }
        .item {
            flex: 1;
            height: 100%;
            font-size: 16px;
            color: #999999;
            position: relative;
            &.active {
                color: var(--blue);
                &::after {
                    content: '';
                    width: 34px;
                    height: 5px;
                    background: var(--blue);
                    border-radius: 5px;
                    position: absolute;
                    bottom: 0;
                }
            }
        }
    }
</style>
