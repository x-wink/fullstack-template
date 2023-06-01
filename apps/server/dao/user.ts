import { get, insert, remove, select, update } from './';
import { User } from '../entity';

export const getUser = async (id: number) => {
    return await get<User>('user', id);
};
export const searchUser = async (user?: User) => {
    return await select<User>('user', user);
};
export const createUser = async (user: User) => {
    return await insert<User>('user', user);
};
export const updateUser = async (user: User) => {
    return await update<User>('user', user);
};
export const removeUser = async (id: number) => {
    return await remove('user', id);
};
