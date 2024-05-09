import { del } from '../request';
import { get, post, put } from '../request';
import type { PApprovalUser, PSignin, PStatusUser, Page, Student, User } from '@pkgs/model';

export const signin = (data: PSignin) => post<string>('/sys/user/signin', data);

export const signup = (data: Student) => post<string>('/sys/user/signup', data);

export const approvalUser = (data: PApprovalUser) => put<boolean>('/sys/user/approval', data);

export const findUserPage = (pageIndex: number, pageSize: number, params?: Partial<User>) =>
    get<Page<User>>(`/sys/user/${pageIndex}/${pageSize}`, params);

export const statusUser = (data: PStatusUser) => put<boolean>('/sys/user/status', data);

export const removeUser = (ids: number[]) => del<number>(`/sys/user/${ids.join(',')}`);

export const getUser = (id: number) => get<User>(`/sys/user/${id}`);

export const createUser = (data: Partial<User>) => post<number>('/sys/user', data);

export const updateUser = (data: Partial<User>) => put<number>('/sys/user', data);
