<template>
    <div class="list-container">
        <div class="operation">
            <el-button v-if="props.allowCreate" :icon="Plus" type="primary" @click="handleCreate">添加</el-button>
            <el-popconfirm v-if="props.allowRemove" title="确定删除已勾选的多条数据吗？" @confirm="handleDelete()">
                <template #reference>
                    <el-button :icon="Delete" type="danger">删除</el-button>
                </template>
            </el-popconfirm>
            <el-button v-if="props.allowExport" :icon="Download" type="success" @click="handleExport">导出</el-button>
        </div>
        <el-form ref="refsForm" v-model:model="condition" class="search" inline>
            <slot name="condition"></slot>
            <el-form-item>
                <el-button :icon="Search" type="success" @click="handleSearch">查询</el-button>
                <el-button :icon="Refresh" @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
            ref="refsTable"
            v-loading="props.loading"
            class="content"
            :data="props.data"
            flexible
            :highlight-current-row="false"
            row-key="id"
            v-bind="attrs"
            sortable="custom"
            :stripe="false"
            @selection-change="selection = $event"
            @sort-change="handleSortChange"
        >
            <el-table-column v-if="props.allowRemove" type="selection" />
            <slot></slot>
            <el-table-column v-if="hasCreateTime" label="创建时间" prop="createTime" sortable width="170px">
                <template #default="{ row }">
                    {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                v-if="hasAction"
                align="center"
                fixed="right"
                header-align="center"
                label="操作"
                :width="props.actionWidth"
            >
                <template #default="{ row, index }">
                    <el-button v-if="props.allowUpdate" :icon="Edit" text type="primary" @click="handleUpdate(row)">
                        编辑
                    </el-button>
                    <el-popconfirm v-if="props.allowRemove" title="确定删除这行数据吗？" @confirm="handleDelete([row])">
                        <template #reference>
                            <el-button :icon="Delete" text type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                    <slot name="action" v-bind="{ row, index }"></slot>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:currentPage="page.pageIndex"
            v-model:pageSize="page.pageSize"
            background
            class="footer"
            hide-on-single-page
            layout="total, prev, pager, next, sizes, jumper"
            :page-sizes="[100, 200, 300, 500]"
            small
            :total="props.total"
        />
    </div>
</template>

<script setup lang="ts" generic="T">
    import { Search, Refresh, Plus, Edit, Delete, Download } from '@element-plus/icons-vue';
    import type { SortDirection } from '@pkgs/model';
    import type { FormInstance, Sort, TableInstance } from 'element-plus';
    import { dayjs } from 'element-plus';

    defineOptions({
        name: 'XList',
        inheritAttrs: false,
    });

    const attrs = useAttrs();

    const props = withDefaults(
        defineProps<{
            allowCreate?: boolean;
            allowUpdate?: boolean;
            allowRemove?: boolean;
            allowExport?: boolean;
            data: T[];
            loading: boolean;
            total: number;
            actionWidth?: string;
            hasCreateTime?: boolean;
        }>(),
        {
            actionWidth: 'auto',
        }
    );
    const condition = defineModel<Record<string, unknown>>('condition', { required: true });
    const page = defineModel<{ pageIndex: number; pageSize: number }>('page', {
        default: () => ({ pageIndex: 1, pageSize: 9999 }),
    });

    const slots = useSlots();
    const hasAction = computed(() => slots.action ?? (props.allowUpdate || props.allowRemove));

    const refsForm = ref<FormInstance>();
    const refsTable = ref<TableInstance>();

    const emits = defineEmits<{
        search: [page: typeof page.value, sort: typeof sort];
        reset: [];
        create: [];
        update: [row: T];
        remove: [rows: T[]];
        export: [];
    }>();
    const handleSearch = () => {
        emits('search', page.value, sort);
    };
    const handleReset = () => {
        refsForm.value?.resetFields();
        emits('reset');
        handleSearch();
    };
    watch(page, handleSearch, { deep: true });
    onActivated(handleSearch);

    const handleCreate = () => {
        emits('create');
    };
    const handleUpdate = (row: T) => {
        emits('update', row);
    };
    const selection = ref([] as T[]);
    const handleDelete = (rows: T[] = selection.value as unknown as T[]) => {
        emits('remove', rows);
    };
    const handleExport = () => {
        emits('export');
    };

    const order2sort = (order: Sort['order']) => order.replace('ending', '') as SortDirection;
    const sort = { create_time: 'desc' } as Record<string, SortDirection>;
    const handleSortChange = (data: Sort) => {
        if (data.order) {
            sort[data.prop] = order2sort(data.order);
        } else {
            delete sort[data.prop];
        }
    };

    defineExpose({
        search: handleSearch,
        refsForm,
        refsTable,
    });
</script>

<style lang="less">
    .list-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .operation {
            margin-bottom: var(--gap);
        }

        .search {
            .el-input {
                width: 160px;
            }
        }

        .content {
            flex: 1;
            --el-table-bg-color: var(--bgc);
            --el-table-header-bg-color: var(--bgc);
            --el-table-header-text-color: var(--fc);
            --el-table-tr-bg-color: transparent;
            --el-table-row-hover-bg-color: var(--bgc);
            --el-table-current-row-bg-color: var(--bgc);
            --el-table-border-color: var(--bc);
            --el-table-text-color: var(--fc);
            --el-mask-color: var(--bgc-hover);
            --el-bg-color: var(--bgc);
            --el-fill-color-lighter: var(--bgc);
        }

        .footer {
            margin: var(--gap) auto;
        }
    }
</style>
