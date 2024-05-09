import { BaseEntity } from '../../base';
import type { User } from '../system/user';
import type { PartialBy } from '@xwink/utils';

export const signDefaults = () => ({});

export enum SignType {
    SIGN_IN = 0,
    SIGN_PAUSE = 1,
    SIGN_OUT = 2,
}
export const signTypeDict = {
    [SignType.SIGN_IN]: '签到',
    [SignType.SIGN_PAUSE]: '暂离',
    [SignType.SIGN_OUT]: '签退',
};
export const signTypeColor = {
    [SignType.SIGN_IN]: 'success',
    [SignType.SIGN_PAUSE]: 'warning',
    [SignType.SIGN_OUT]: 'danger',
};
export const signTypeOpts = Object.entries(signTypeDict).map(([value, label]) => ({ value, label }));

export type SignData = PartialBy<Sign, ReturnType<typeof signDefaults>>;
export class Sign extends BaseEntity {
    userId!: number;
    type!: SignType;
    longitude!: number;
    latitude!: number;
    location!: string;
    user?: User;
    constructor(data?: Partial<Sign>) {
        super();
        Object.assign(this, data);
    }
}
export interface SignSummary {
    userId: number;
    date: Date;
    start: Date;
    end?: Date;
    leave: number;
}
