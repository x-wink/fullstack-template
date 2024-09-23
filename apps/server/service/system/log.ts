import { LogModule, LogAction } from '@pkgs/model';
import type { Log } from '@pkgs/model';
import { baseColumnDefines, registRepository } from '../../dao';
import { ColumnType } from '@xwink/dao';
const { get, detail, select, page, create, update, remove } = registRepository<Log>({
    name: 't_log',
    columnDefines: [
        ...baseColumnDefines,
        {
            name: 'userId',
            type: ColumnType.INT,
            required: true,
        },
        {
            name: 'dataId',
            type: ColumnType.INT,
        },
        {
            name: 'module',
            type: ColumnType.STRING,
            defaultValue: String(LogModule.SYSTEM),
            required: true,
        },
        {
            name: 'action',
            type: ColumnType.STRING,
            defaultValue: String(LogAction.LOGIN),
            required: true,
        },
    ],
});
export const detailLog = detail;
export const selectLog = select;
export const getLog = get;
export const pageLog = page;
export const createLog = create;
export const updateLog = update;
export const removeLog = remove;
