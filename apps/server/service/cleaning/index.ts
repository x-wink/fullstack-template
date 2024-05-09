import type { CleanTask } from '@pkgs/model';
import { baseColumnDefines, registRepository } from '../../dao';
import type { SelectOptions } from '@xwink/dao';
import { ColumnType } from '@xwink/dao';
import { searchUser } from '../system/user';
const { detail, page, create, update, remove } = registRepository<CleanTask>({
    name: 't_cleaning_task',
    columnDefines: [
        ...baseColumnDefines,
        {
            name: 'userId',
            type: ColumnType.INT,
            required: true,
        },
        {
            name: 'time',
            type: ColumnType.DATETIME,
            required: true,
        },
        {
            name: 'location',
            type: ColumnType.STRING,
            required: true,
        },
    ],
});
export const getCleanTask = detail;
export const pageCleanTask = async (options?: Partial<SelectOptions>) => {
    const res = await page(options);
    if (res.list.length) {
        const userIds = res.list.map((item) => item.userId);
        const users = await searchUser({ where: { id: userIds } });
        res.list.forEach((item) => {
            item.user = users.find((user) => user.id === item.userId);
        });
    }
    return res;
};
export const createCleanTask = create;
export const updateCleanTask = update;
export const removeCleanTask = remove;
