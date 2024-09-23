import type { ColumnDefine } from '@xwink/dao';
import type { Logger } from 'log4js';
import { Condition, Field, ConditionBuilder } from '@xwink/dao';
import { useDao, useOrm, AutoTablePolicies, ColumnType } from '@xwink/dao';
import { config, isDev, useLogger } from '../utils';
import { BaseEntity, CREATE_TIME, DEL_FLAG, DelStatus, ID, REMOVE_TIME, UPDATE_TIME } from '@pkgs/model';
import { camel2Underline, convertCamel2Underline } from '@xwink/utils';

/** 默认主键字段定义 */
export const defualtPrimaryKeyColumn = {
    name: ID,
    type: ColumnType.INT,
    autoIncrement: true,
    primary: true,
    required: true,
    comment: '自增主键',
} as ColumnDefine;
/** 默认逻辑删除标识字段定义 */
export const defualtDelFlagColumn = {
    name: DEL_FLAG,
    type: ColumnType.BOOLEAN,
    required: true,
    defaultValue: String(DelStatus.NORMAL),
    comment: '逻辑删除标识',
} as ColumnDefine;
/** 默认创建时间字段定义 */
export const defualtCreateTimeColumn = {
    name: CREATE_TIME,
    type: ColumnType.DATETIME,
    required: true,
    defaultValue: String('CURRENT_TIMESTAMP'),
    comment: '创建时间',
} as ColumnDefine;
/** 默认修改时间字段定义 */
export const defualtUpdateTimeColumn = {
    name: UPDATE_TIME,
    type: ColumnType.DATETIME,
    comment: '修改时间',
} as ColumnDefine;
/** 默认移除时间字段定义 */
export const defualtRemoveTimeColumn = {
    name: REMOVE_TIME,
    type: ColumnType.DATETIME,
    comment: '移除时间',
} as ColumnDefine;
/** 实体基础字段列定义 */
export const baseColumnDefines = [
    defualtPrimaryKeyColumn,
    defualtDelFlagColumn,
    defualtCreateTimeColumn,
    defualtUpdateTimeColumn,
    defualtRemoveTimeColumn,
];

export const logger: Logger = useLogger('dao');
const convertNames = <T extends object = object>(data: Field | Condition | ConditionBuilder | T) => {
    if (data instanceof Field) {
        data.name = camel2Underline(data.name);
    } else if (data instanceof Condition) {
        data.field.name = camel2Underline(data.field.name);
    } else if (data instanceof ConditionBuilder) {
        data.children.forEach(convertNames);
    } else {
        data = convertCamel2Underline<T>(data);
    }
    return data;
};
const dao = useDao({
    config: { ...config.mysql, timezone: 'Z' },
    debug: isDev,
    logger,
    hooks: {
        beforeSelect(data) {
            data.selectBuilder.children.forEach(convertNames);
            data.whereBuilder.children.forEach(convertNames);
            data.whereBuilder.children = data.whereBuilder.children.filter((item) => {
                const values = item.getValues();
                return values.length > 0;
            });
            return data;
        },
        beforeInsert(options) {
            const { data } = options;
            options.data = data.map((item) => {
                if (item instanceof BaseEntity) {
                    item[CREATE_TIME] = new Date();
                }
                return convertCamel2Underline(item);
            });
            options.fields = options.fields?.map((item) => camel2Underline(item));
            return options;
        },
        beforeUpdate(options) {
            const { where = {}, data } = options;
            if (data instanceof BaseEntity) {
                data[UPDATE_TIME] = new Date();
                (where as Record<string, unknown>)[ID] = data[ID];
            }
            options.data = convertCamel2Underline(data);
            options.fields = options.fields?.map((item) => camel2Underline(item));
            return options;
        },
        beforeRemove(options) {
            const { data, fields = [] } = options;
            (data as Record<string, unknown>)[REMOVE_TIME] = new Date();
            fields.push(REMOVE_TIME);
            return options;
        },
        beforeRevoke(options) {
            const { data, fields = [] } = options;
            (data as Record<string, unknown>)[REMOVE_TIME] = void 0;
            fields.push(REMOVE_TIME);
            return options;
        },
    },
});

const orm = useOrm(dao, {
    autoTablePolicy: isDev ? AutoTablePolicies.UPDATE : AutoTablePolicies.CREATE,
    normalrizeName: true,
});
export const registRepository = orm.registRepository;
export const beginTransaction = () => {
    dao.beginTransaction();
};
export const commit = () => {
    dao.commit();
};
export const rollback = () => {
    dao.rollback();
};
