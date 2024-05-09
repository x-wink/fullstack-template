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
        <el-form-item label="场地名称" prop="name">
            <el-input v-model="form.name" clearable />
        </el-form-item>
        <el-form-item label="座位数" prop="count">
            <el-input-number v-model="form.count" :min="0" />
        </el-form-item>
        <el-form-item v-if="form.seat" label="座位设置" prop="seat">
            <div class="seat-config">
                <el-space>
                    <el-form-item label="水平翻转" prop="seat.flipHorizontal">
                        <el-switch v-model="form.seat.flipHorizontal" />
                    </el-form-item>
                    <el-form-item label="垂直翻转" prop="seat.flipVertical">
                        <el-switch v-model="form.seat.flipVertical" />
                    </el-form-item>
                </el-space>
                <el-space>
                    <el-form-item label="行数" prop="seat.row">
                        <el-input-number v-model="form.seat.row" :min="1" />
                    </el-form-item>
                    <el-form-item label="列数" prop="seat.col">
                        <el-input-number v-model="form.seat.col" :min="1" />
                    </el-form-item>
                </el-space>
                <el-form-item label="走廊" prop="seat.split">
                    <template #label>
                        <span>走廊</span>
                        <el-tooltip
                            content="例如在第1行和第2行之间有走廊就填写1.5，多个走廊使用英文逗号“,”隔开"
                            placement="right"
                        >
                            <el-icon style="transform: translate(5px, 2px)">
                                <QuestionFilled />
                            </el-icon>
                        </el-tooltip>
                    </template>
                    <el-input v-model="form.seat.split" placeholder="示例：1.5,3.5" style="width: 100%" />
                </el-form-item>
                <el-form-item label="留空" prop="seat.white">
                    <template #label>
                        <span>留空</span>
                        <el-tooltip
                            content="例如在1和2之间有留空就填写1.5，多个留空使用英文逗号“,”隔开"
                            placement="right"
                        >
                            <el-icon style="transform: translate(5px, 2px)">
                                <QuestionFilled />
                            </el-icon>
                        </el-tooltip>
                    </template>
                    <el-input v-model="form.seat.white" placeholder="示例：1.5,3.5" style="width: 100%" />
                </el-form-item>
                <el-form-item label="预览">
                    <XSeat :config="seatConfig" :leaved="[13]" :selected="[5, 13, 14, 22]" />
                </el-form-item>
            </div>
        </el-form-item>
        <el-form-item label="启用状态" prop="enabled">
            <el-switch v-model="form.enabled" active-text="启用" />
        </el-form-item>
        <el-form-item label="关联时间段" prop="times">
            <el-select v-model="form.times" clearable multiple>
                <el-option v-for="(item, index) in times" :key="index" :label="item.label" :value="item.id" />
            </el-select>
        </el-form-item>
    </CommonForm>
</template>

<script setup lang="ts">
    import { roomDefaults } from '@pkgs/model';
    import type { Room, Time } from '@pkgs/model';
    import { ElMessage } from 'element-plus';
    import { QuestionFilled } from '@element-plus/icons-vue';
    import { generateSeatConfig } from '@pkgs/components';
    import type { SeatConfig } from '@pkgs/components';

    const form = ref<Partial<Room>>(roomDefaults());
    const rules = computed(() => {
        return {
            name: [{ required: true, message: '场地名称不能为空' }],
            count: [{ required: true, message: '座位数不能为空' }],
            seat: [{ required: true, message: '座位设置不能为空' }],
            'seat.flipHorizontal': [{ required: true, message: '水平翻转不能为空' }],
            'seat.flipVertical': [{ required: true, message: '垂直翻转不能为空' }],
            'seat.row': [{ required: true, message: '行数不能为空' }],
            'seat.col': [{ required: true, message: '列数不能为空' }],
            enabled: [{ required: true, message: '启用状态不能为空' }],
            times: [{ required: true, message: '关联时间段不能为空' }],
        };
    });

    const seatConfig = computed<SeatConfig>(() => generateSeatConfig(form.value.seat!));

    const times = ref([] as (Time & { label: string })[]);
    const handleLoadData = async () => {
        const res = await api.findTimePage(1, 0);
        if (res) {
            times.value = res.list.map((item) => ({
                ...item,
                label:
                    (item.start as unknown as string).split('.')[0] +
                    ' ~ ' +
                    (item.end as unknown as string).split('.')[0],
            }));
        } else {
            ElMessage.error('加载时间列表失败');
        }
    };
    handleLoadData();

    const get = api.getRoom;
    const create = api.createRoom;
    const update = api.updateRoom;

    const router = useRouter();
    const handleSaved = () => {
        router.push({ name: 'SearchRoom' });
    };
</script>
<style scoped lang="less">
    .seat-config {
        display: flex;
        flex-direction: column;
        gap: var(--gap);
        background: var(--bgc);
        padding: var(--gap) var(--gap) var(--gap) var(--gap-super);
    }
</style>
