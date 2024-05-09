import { del } from '../request';
import { get, post, put } from '../request';
import type { Page, CleanTask } from '@pkgs/model';

export const findCleanTaskPage = (pageIndex: number, pageSize: number, params?: Partial<CleanTask>) =>
    get<Page<CleanTask>>(`/cleaning/${pageIndex}/${pageSize}`, params);

export const removeCleanTask = (ids: number[]) => del<number>(`/cleaning/${ids.join(',')}`);

export const getCleanTask = (id: number) => get<CleanTask>(`/cleaning/${id}`);

export const createCleanTask = (data: Partial<CleanTask>) => post<number>('/cleaning', data);

export const updateCleanTask = (data: Partial<CleanTask>) => put<number>('/cleaning', data);
