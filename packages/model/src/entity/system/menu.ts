import { BaseEntity } from '../../base';
import type { PartialBy, TreeNodeable } from '@xwink/utils';
import { TreeNode } from '@xwink/utils';
export enum MenuType {
    ROUTE = 0,
    LINK = 1,
}

export const menuDefaults = () => ({
    sort: 0,
    permission: 'unknown',
    label: '未命名',
    visible: true,
    type: MenuType.ROUTE,
});

export type MenuData = PartialBy<Menu, ReturnType<typeof menuDefaults>>;
export class Menu extends BaseEntity implements TreeNodeable {
    parentId?: number;
    permission!: string;
    label!: string;
    sort!: number;
    url!: string;
    visible!: boolean;
    type!: MenuType;
    constructor(data?: Partial<Menu>) {
        super();
        Object.assign(this, data);
    }
    convertToTreeNode() {
        return new TreeNode<Menu>({ pid: this.parentId, id: this.id!, title: this.label, data: this, sort: this.sort });
    }
}
export interface PStatusMenu {
    id: number;
    visible: boolean;
}
