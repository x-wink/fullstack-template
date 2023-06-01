import { AutoIncrementEntity } from 'wink-dao';
export class Role extends AutoIncrementEntity {
    name?: string;
    code?: string;
    permissions?: string[];
    enabled?: boolean;
}
