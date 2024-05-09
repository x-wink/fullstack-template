<template>
    <CommonForm
        v-model="form"
        :convert="convert"
        :create="create"
        :get="get"
        :rules="rules"
        :update="update"
        :width="640"
        @saved="handleSaved"
    >
        <el-form-item label="时间范围" prop="end">
            <el-time-picker v-model="range" is-range />
        </el-form-item>
        <el-form-item label="启用状态" prop="enabled">
            <el-switch v-model="form.enabled" active-text="启用" />
        </el-form-item>
    </CommonForm>
</template>

<script setup lang="ts">
    import { timeDefaults } from '@pkgs/model';
    import type { Time } from '@pkgs/model';

    const form = ref<Partial<Time>>(timeDefaults());
    const rules = computed(() => {
        return {
            end: [{ required: true, message: '时间范围不能为空' }],
            enabled: [{ required: true, message: '启用状态不能为空' }],
        };
    });

    const convert = (data: Time) => {
        data = {
            ...data,
            start: new Date(`2023-01-01T${data.start as unknown as string}Z`),
            end: new Date(`2023-01-01T${data.end as unknown as string}Z`),
        } as Time;
        return data;
    };

    const range = computed({
        get: () => [form.value.start, form.value.end],
        set: ([start, end]) => {
            form.value.start = start;
            form.value.end = end;
        },
    });

    const get = api.getTime;
    const create = api.createTime;
    const update = api.updateTime;

    const router = useRouter();
    const handleSaved = () => {
        router.push({ name: 'SearchTime' });
    };
</script>
