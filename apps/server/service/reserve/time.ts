import type { Time } from '@pkgs/model';
import { baseColumnDefines, registRepository } from '../../dao';
import { ColumnType } from '@xwink/dao';
const { detail, page, create, update, remove } = registRepository<Time>({
    name: 't_time',
    columnDefines: [
        ...baseColumnDefines,
        {
            name: 'start',
            type: ColumnType.TIME,
            required: true,
        },
        {
            name: 'end',
            type: ColumnType.TIME,
            required: true,
        },
        {
            name: 'enabled',
            type: ColumnType.BOOLEAN,
            defaultValue: '0',
            required: true,
        },
    ],
});
export const getTime = detail;
export const pageTime = page;
export const createTime = create;
export const updateTime = update;
export const removeTime = remove;
