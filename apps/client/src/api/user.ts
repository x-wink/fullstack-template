import { get, post, put } from './request';
export interface User {
    id?: number;
    photo?: string;
}
export const detailUser = (id: number) => get<User>('/user/' + id);
export const createUser = (data: User) => post<number>('/user', data);
export const updateUser = (data: User) => put<number>('/user', data);
