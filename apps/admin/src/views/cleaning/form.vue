<template>
    <CommonForm
        v-model="form"
        :create="create"
        :get="get"
        :rules="rules"
        :update="update"
        :width="640"
        @saved="handleSaved"
    >
        <el-form-item label="保洁阿姨" prop="userId">
            <el-select v-model="form.userId" clearable filterable>
                <el-option v-for="(item, index) in users" :key="index" :label="item.username" :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="time">
            <el-date-picker v-model="form.time" type="datetime" />
        </el-form-item>
        <el-form-item label="地点" prop="location">
            <el-input v-model="form.location" clearable />
        </el-form-item>
    </CommonForm>
</template>

<script setup lang="ts">
    import type { CleanTask, User } from '@pkgs/model';
    import { cleanTaskDefaults } from '@pkgs/model';

    const form = ref<Partial<CleanTask>>(cleanTaskDefaults());
    const rules = computed(() => {
        return {
            time: [{ required: true, message: '时间不能为空' }],
            location: [{ required: true, message: '地点不能为空' }],
            userId: [{ required: true, message: '保洁阿姨不能为空' }],
        };
    });

    const users = ref([] as User[]);
    const handleLoadData = async () => {
        const res = await api.findUserPage(1, 0);
        if (res) {
            users.value = res.list;
        }
    };
    handleLoadData();

    const get = api.getCleanTask;
    const create = api.createCleanTask;
    const update = api.updateCleanTask;

    const router = useRouter();
    const handleSaved = () => {
        router.push({ name: 'SearchCleaning' });
    };
</script>
