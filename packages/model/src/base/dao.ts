/** 实体类主键字段名 */
export const ID = 'id' as const;
/** 实体类逻辑删除标识字段名 */
export const DEL_FLAG = 'delFlag' as const;
/** 实体类创建时间字段名 */
export const CREATE_TIME = 'createTime' as const;
/** 实体类修改时间字段名 */
export const UPDATE_TIME = 'updateTime' as const;
/** 实体类移除时间字段名 */
export const REMOVE_TIME = 'removeTime' as const;
/**
 * 逻辑删除状态
 */
export enum DelStatus {
    /**
     * 未删除
     */
    NORMAL = 0,
    /**
     * 已删除
     */
    REMOVED = 1,
}
/**
 * 自增主键基础实体类
 */
export abstract class BaseEntity {
    [ID]?: number;
    [DEL_FLAG]?: DelStatus = DelStatus.NORMAL;
    [CREATE_TIME]?: Date;
    [UPDATE_TIME]?: Date;
    [REMOVE_TIME]?: Date;
}
