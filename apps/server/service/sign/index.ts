import type { SignSummary, Sort } from '@pkgs/model';
import { DelStatus, Page, SignType, type Sign } from '@pkgs/model';
import { baseColumnDefines, registRepository } from '../../dao';
import { ColumnType, Field, OnBuilder, QueryBuilder } from '@xwink/dao';
import { searchUser } from '../system/user';
const { exec, detail, query, create, update, remove } = registRepository<Sign>(
    {
        name: 't_sign',
        columnDefines: [
            ...baseColumnDefines,
            {
                name: 'userId',
                type: ColumnType.INT,
                required: true,
            },
            {
                name: 'longitude',
                type: ColumnType.DOUBLE,
                required: true,
            },
            {
                name: 'latitude',
                type: ColumnType.DOUBLE,
                required: true,
            },
            {
                name: 'location',
                type: ColumnType.STRING,
                required: true,
            },
            {
                name: 'type',
                type: ColumnType.INT,
                required: true,
            },
        ],
    },
    { ignores: ['user'] }
);
export const getSign = detail;
export const querySign = query;
import type { OrderByDirection } from '@xwink/dao';
export const pageSign = async (pageIndex: number, pageSize: number, condition: Partial<Sign>, sort: Sort) => {
    const builder = new QueryBuilder()
        .select('count(1) count')
        .from('t_sign', 's')
        .leftJoin('t_user', 'u', new OnBuilder().equal('u.id', Field.parse('s.user_id')))
        .equal('s.del_flag', DelStatus.NORMAL)
        .equal('s.type', condition.type, () => !!condition.type)
        .like('u.username', condition.user?.username, () => !!condition.user?.username)
        .like('u.realname', condition.user?.realname, () => !!condition.user?.realname);
    const [{ count: total }] = await query<{ count: number }>(builder);
    builder.selectBuilder.children = [];
    for (const p in sort) {
        builder.orderBy(p, sort[p] as OrderByDirection);
    }
    builder.select('s.*').page(pageIndex, pageSize);
    const list = await query<Sign>(builder);
    if (list.length) {
        const userIds = list.map((item) => item.userId);
        const users = await searchUser({ where: { id: userIds } });
        list.forEach((item) => {
            item.user = users.find((user) => user.id === item.userId);
        });
    }
    return new Page<Sign>({
        total,
        list,
        pageIndex,
        pageSize,
    });
};
export const createSign = create;
export const updateSign = update;
export const removeSign = remove;
export const summarySign = async () => {
    return await exec<SignSummary[]>(
        `
        SELECT
            user_id as \`userId\`,
            DATE(create_time) AS \`date\`,
            MIN(CASE WHEN type = ? THEN create_time END) AS \`start\`,
            MAX(CASE WHEN type = ? THEN create_time END) AS \`end\`,
            COUNT(CASE WHEN type = ? THEN type END) AS \`leave\`
        FROM
            t_sign
        GROUP BY
            user_id,
            \`date\`;
    `,
        [SignType.SIGN_IN, SignType.SIGN_OUT, SignType.SIGN_PAUSE]
    );
};
