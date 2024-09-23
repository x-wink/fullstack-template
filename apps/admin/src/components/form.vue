<template>
    <div class="form-container">
        <el-form
            ref="refsForm"
            v-model:model="form"
            :disabled="loading"
            label-position="top"
            :rules="props.rules"
            :style="formStyle"
        >
            <el-scrollbar always>
                <slot></slot>
            </el-scrollbar>
            <el-form-item class="form-action">
                <el-popconfirm title="确定要重置刷新表单内容吗？" @confirm="handleLoad">
                    <template #reference>
                        <el-button type="danger">重置刷新</el-button>
                    </template>
                </el-popconfirm>
                <el-button :loading="loading" type="primary" @click="handleSubmit">提交保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
    import type { FormInstance } from 'element-plus';
    import { ElMessage, ElMessageBox } from 'element-plus';
    const props = withDefaults(
        defineProps<{
            rules: FormInstance['props']['rules'];
            get: (id: number) => Promise<T | undefined>;
            create: (data: T) => Promise<number | undefined>;
            update: (data: T) => Promise<number | undefined>;
            width?: number;
            convert?: (data: T) => T;
        }>(),
        {
            width: 320,
            convert: (data: T) => data,
        }
    );
    const form = defineModel<T>({ required: true });
    const loading = defineModel<boolean>('loading', { required: false, default: false, local: true });
    const refsForm = ref<FormInstance>();

    const formStyle = computed(() => {
        return {
            width: `${props.width}px`,
        };
    });

    const route = useRoute();
    const id = computed(() => route.params.id as string | undefined);

    const emits = defineEmits<{
        loaded: [];
        loadError: [];
        saved: [];
        saveError: [];
        validateError: [];
    }>();

    const handleLoad = async () => {
        refsForm.value?.resetFields();
        if (id.value) {
            loading.value = true;
            let data = await props.get(Number(id.value));
            if (data) {
                data = props.convert(data);
                Object.assign(form.value, data);
                emits('loaded');
            } else {
                ElMessageBox.alert('加载数据失败', void 0, { type: 'error' });
                emits('loadError');
            }
            loading.value = false;
        }
    };
    watch(id, handleLoad, { immediate: true });

    const handleSubmit = async () => {
        loading.value = true;
        try {
            await refsForm.value!.validate();
            const save = id.value ? props.update : props.create;
            const res = await save({ ...form.value, id: id.value });
            if (res) {
                ElMessage.success('保存成功');
                emits('saved');
            } else {
                ElMessage.error('保存失败');
                emits('saveError');
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
            emits('validateError');
        }
        loading.value = false;
    };

    defineExpose({
        refsForm,
        load: handleLoad,
        submit: handleSubmit,
    });
</script>

<style scoped lang="less">
    .form-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .el-form {
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: var(--gap);
            :deep(.el-scrollbar__wrap) {
                padding: var(--gap-large);
            }
        }
        :deep(.el-input),
        :deep(.el-select),
        :deep(.el-input-number) {
            width: 200px;
        }
    }
</style>
