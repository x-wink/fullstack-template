import { BaseEntity } from '../../base';
import type { PartialBy } from '@xwink/utils';
import type { BookingSummary } from '../reserve';

export const userDefaults = () => ({
    type: UserType.STUDENT,
    enabled: false,
    roles: [],
});

export const studentDefaults = () => ({
    username: '',
    realname: '',
    password: '',
    leader: '',
    location: '',
    isVip: false,
    status: UserStatus.APPROVAL,
    type: UserType.STUDENT,
    phone: '',
    enabled: false,
    roles: [],
    openid: '',
    nickname: '',
    avatar: '',
    sex: UserSex.UNKNWON,
});

export enum UserType {
    STUDENT = 0,
    EMPLOYEE = 1,
    MANAGER = 2,
}
export const userTypeDict = {
    [UserType.STUDENT]: '学生',
    [UserType.EMPLOYEE]: '清洁阿姨',
    [UserType.MANAGER]: '管理人员',
} as Record<string, string>;
export const userTypeOpts = [
    {
        label: '学生',
        value: UserType.STUDENT,
    },
    {
        label: '清洁阿姨',
        value: UserType.EMPLOYEE,
    },
    {
        label: '管理人员',
        value: UserType.MANAGER,
    },
];
export const userEnabledOpts = [
    {
        label: '禁用',
        value: 0,
    },
    {
        label: '启用',
        value: 1,
    },
];
export const userVipOpts = [
    {
        label: '否',
        value: 0,
    },
    {
        label: '是',
        value: 1,
    },
];

export enum UserStatus {
    APPROVAL = 0,
    ACCEPT = 1,
    REJECT = 2,
}
export const userStatusDict = {
    [UserStatus.APPROVAL]: '等待审核',
    [UserStatus.ACCEPT]: '审核通过',
    [UserStatus.REJECT]: '拒绝注册',
} as Record<string, string>;
export const userStatusOpts = [
    {
        label: '等待审核',
        value: UserStatus.APPROVAL,
    },
    {
        label: '审核通过',
        value: UserStatus.ACCEPT,
    },
    {
        label: '拒绝注册',
        value: UserStatus.REJECT,
    },
];

export enum UserSex {
    UNKNWON = 0,
    MAN = 1,
    WOMAN = 2,
}

export const userLocationOpts = ['东院', '西院'].map((item) => ({ label: item, value: item }));

export type UserData = PartialBy<User, ReturnType<typeof userDefaults>>;
export class User extends BaseEntity {
    username!: string;
    password!: string;
    type!: UserType;
    phone!: string;
    leader?: string;
    location?: string;
    isVip?: boolean;
    status?: UserStatus;
    code?: string;
    openid?: string;
    avatar?: string;
    nickname?: string;
    realname?: string;
    sex?: UserSex;
    enabled!: boolean;
    roles!: number[];
    constructor(data?: Partial<User>) {
        super();
        Object.assign(this, data);
    }
}
export class Student extends User {
    declare leader: string;
    declare location: string;
    declare isVip: boolean;
    declare status: UserStatus;
    declare openid: string;
    declare nickname: string;
    declare realname: string;
    declare avatar: string;
    type = UserType.STUDENT;
}

export class DefaultRecord extends User {
    count!: number;
    bookings!: BookingSummary[];
}

export class UserRoleRelation {
    userId!: number;
    roleId!: number;
    constructor(data: UserRoleRelation) {
        Object.assign(this, data);
    }
}

export type PSignin = Pick<User, 'username' | 'password'>;

export interface PApprovalUser {
    id: number;
    status: UserStatus;
}

export interface PStatusUser {
    id: number;
    enabled: boolean;
}
