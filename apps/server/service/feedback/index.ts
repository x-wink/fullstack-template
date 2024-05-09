import type { Feedback } from '@pkgs/model';
import { baseColumnDefines, registRepository } from '../../dao';
import type { SelectOptions } from '@xwink/dao';
import { ColumnType } from '@xwink/dao';
import { searchUser } from '../system';
const { detail, page, create, update, remove } = registRepository<Feedback>(
    {
        name: 't_feedback',
        columnDefines: [
            ...baseColumnDefines,
            {
                name: 'userId',
                type: ColumnType.INT,
                required: true,
            },
            {
                name: 'title',
                type: ColumnType.STRING,
                required: true,
                length: 20,
            },
            {
                name: 'content',
                type: ColumnType.STRING,
                required: true,
                length: 255,
            },
        ],
    },
    { ignores: ['user'] }
);
export const getFeedback = detail;
export const pageFeedback = async (options?: Partial<SelectOptions>) => {
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
export const createFeedback = create;
export const updateFeedback = update;
export const removeFeedback = remove;
