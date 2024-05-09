import { BaseEntity } from '../../base';
import type { PartialBy } from '@xwink/utils';

export const roleDefaults = () => ({
    name: 'unknown',
    code: 'unknown',
    permissions: [],
    enabled: false,
});

export type RoleData = PartialBy<Role, ReturnType<typeof roleDefaults>>;

export class Role extends BaseEntity {
    name!: string;
    code!: string;
    permissions!: number[];
    enabled!: boolean;
    constructor(data?: Partial<Role>) {
        super();
        Object.assign(this, data);
    }
}

export class RoleMenuRelation {
    roleId!: number;
    menuId!: number;
    constructor(data: RoleMenuRelation) {
        Object.assign(this, data);
    }
}

export interface PStatusRole {
    id: number;
    enabled: boolean;
}
