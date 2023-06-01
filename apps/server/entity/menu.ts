import { AutoIncrementEntity } from 'wink-dao';
export enum MenuType {
    ROUTE = 0,
    LINK = 1,
}
export class Menu extends AutoIncrementEntity {
    parentId?: number;
    permission?: string;
    label?: string;
    sort?: number;
    url?: string;
    visible?: boolean;
    type?: MenuType;
}
