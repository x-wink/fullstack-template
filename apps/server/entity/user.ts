import { AutoIncrementEntity } from 'wink-dao';
export class User extends AutoIncrementEntity {
    username?: string;
    nickname?: string;
    password?: string;
    phone?: string;
    photo?: string;
    enabled?: boolean;
    locked?: boolean;
    expired?: boolean;
    roles?: string[];
}
