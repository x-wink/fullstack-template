import { get, insert, remove, select, update } from './';
import { User } from '../entity';
const tableName = 'user';
export const getUser = async (id: number) => {
    return await get<User>(tableName, id);
};
export const searchUser = async (user?: User) => {
    return await select<User>(tableName, user);
};
export const createUser = async (user: User) => {
    return await insert<User>(tableName, user);
};
export const updateUser = async (user: User) => {
    return await update<User>(tableName, user);
};
export const removeUser = async (id: number) => {
    return await remove(tableName, id);
};
