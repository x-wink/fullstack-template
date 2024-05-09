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
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" clearable show-password type="password" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
            <el-input v-model="form.phone" clearable />
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
            <el-select v-model="form.type" clearable>
                <el-option v-for="(item, index) in userTypeOpts" :key="index" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="启用状态" prop="enabled">
            <el-switch v-model="form.enabled" active-text="启用" />
        </el-form-item>
        <el-form-item label="关联角色" prop="roles">
            <el-transfer v-model="form.roles" :data="roles" :props="{ key: 'id', label: 'name' }" />
        </el-form-item>
    </CommonForm>
</template>

<script setup lang="ts">
    import { userDefaults, userTypeOpts, UserStatus } from '@pkgs/model';
    import type { User, Role } from '@pkgs/model';
    import { ElMessage } from 'element-plus';

    const route = useRoute();
    const form = ref<Partial<User>>({ ...userDefaults(), status: UserStatus.ACCEPT });
    const rules = computed(() => {
        return {
            username: [{ required: true, message: '用户名不能为空' }],
            password: [{ required: !route.params.id, message: '密码不能为空' }],
            phone: [{ required: true, message: '手机号码不能为空' }],
            type: [{ required: true, message: '用户类型不能为空' }],
            enabled: [{ required: true, message: '启用状态不能为空' }],
        };
    });

    const roles = ref([] as Role[]);
    const handleLoadRoles = async () => {
        const res = await api.searchRole();
        if (res) {
            roles.value = res;
        } else {
            ElMessage.error('加载角色列表失败');
        }
    };
    handleLoadRoles();

    const get = api.getUser;
    const create = api.createUser;
    const update = api.updateUser;

    const router = useRouter();
    const handleSaved = () => {
        router.push({ name: 'SearchUser' });
    };
</script>
