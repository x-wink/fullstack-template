<template>
    <CommonList
        ref="refsList"
        v-model:condition="condition"
        v-model:page="page"
        action-width="420px"
        allow-create
        allow-remove
        allow-update
        :data="list"
        :loading="loading"
        :total="total"
        @create="handleCreate"
        @remove="handleDelete"
        @search="handleSearch"
        @update="handleUpdate"
    >
        <template #condition>
            <el-form-item prop="name">
                <el-input v-model="condition.name" clearable placeholder="场地名称" />
            </el-form-item>
        </template>
        <template #default>
            <el-table-column label="场地名称" prop="name" />
            <el-table-column label="座位数" prop="count" />
            <el-table-column label="状态" prop="enabled">
                <template #default="{ row }">
                    <el-switch v-model="row.enabled" active-text="启用" @change="handleStatus(row)" />
                </template>
            </el-table-column>
        </template>
        <template #action="{ row }">
            <el-button :loading="generating" text type="success" @click="handleQrcode(row)">下载二维码</el-button>
            <el-button :loading="generating" text type="primary" @click="handleRecord(row)">预约记录</el-button>
        </template>
    </CommonList>
</template>

<script setup lang="ts">
    import { ID, type Room } from '@pkgs/model';
    import { ElMessage } from 'element-plus';
    import type { CommonListInstance } from '@/components';
    import QRCode from 'qrcode';
    import JSZip from 'jszip';
    import { saveAs } from 'file-saver';

    const condition = ref({
        name: '',
    } as Partial<Room>);
    const page = ref({
        pageIndex: 1,
        pageSize: 100,
    });

    const refsList = ref<CommonListInstance>();
    const list = ref([] as Room[]);
    const total = ref(0);
    const loading = ref(false);
    const handleSearch = async () => {
        loading.value = true;
        const res = await api.findRoomPage(page.value.pageIndex, page.value.pageSize, condition.value);
        if (res) {
            list.value = res.list;
            total.value = res.total;
            if (!res.total && page.value.pageIndex > 1) {
                page.value.pageIndex = 1;
            }
        }
        loading.value = false;
    };

    const router = useRouter();
    const handleCreate = () => {
        router.push({ name: 'CreateRoom' });
    };
    const handleStatus = async (row: Room) => {
        const res = await api.statusRoom({ id: row.id!, enabled: row.enabled });
        if (res) {
            ElMessage.success((row.enabled ? '启用' : '禁用') + '成功');
        } else {
            ElMessage.error((row.enabled ? '启用' : '禁用') + '失败');
        }
    };
    const handleUpdate = (row: Room) => {
        router.push({ name: 'UpdateRoom', params: { id: row.id } });
    };
    const handleDelete = async (rows: Room[]) => {
        const res = await api.removeRoom(rows.map((item) => item.id!));
        if (res) {
            ElMessage.success('删除成功');
            refsList.value!.search();
        } else {
            ElMessage.error('删除失败');
        }
    };

    const generating = ref(false);
    const handleQrcode = async (row: Room) => {
        generating.value = true;
        const total = row.count;
        const zip = new JSZip();
        await Promise.all(
            Array.from({ length: total }, (_, index) => index + 1).map(async (seatNo) => {
                const url = new URL(
                    `/study-room/list?roomId=${row[ID]}&seatNo=${seatNo}`,
                    'https://xwink.fun'
                ).toString();
                const width = 512;
                const fontHeight = 50;
                const code = await QRCode.toCanvas(url, { width, scale: 10, margin: 5 });
                const cvs = document.createElement('canvas');
                cvs.width = width;
                cvs.height = width + fontHeight;
                const ctx = cvs.getContext('2d')!;
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, cvs.width, cvs.height);
                ctx.drawImage(code, 0, 0);
                ctx.fillStyle = '#000';
                ctx.font = '48px 微软雅黑 bolder';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(String(seatNo), width / 2, width + fontHeight / 2);
                zip.file(`${seatNo}.png`, cvs.toDataURL().substring(`data:image/png;base64,`.length), {
                    base64: true,
                });
            })
        );
        const blob = await zip.generateAsync({ type: 'blob' });
        saveAs(blob, `${row.name}座位二维码.zip`);
        generating.value = false;
    };

    const handleRecord = (row: Room) => {
        router.push({
            name: 'RoomRecord',
            params: {
                id: row[ID],
            },
        });
    };
</script>
