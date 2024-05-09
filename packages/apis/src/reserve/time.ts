import { del } from '../request';
import { get, post, put } from '../request';
import type { PStatusRoom, Page, Time } from '@pkgs/model';

export const findTimePage = (pageIndex: number, pageSize: number, params?: Partial<Time>) =>
    get<Page<Time>>(`/reserve/time/${pageIndex}/${pageSize}`, params);

export const statusTime = (data: PStatusRoom) => put<boolean>('/reserve/time/status', data);

export const removeTime = (ids: number[]) => del<number>(`/reserve/time/${ids.join(',')}`);

export const getTime = (id: number) => get<Time>(`/reserve/time/${id}`);

export const createTime = (data: Partial<Time>) => post<number>('/reserve/time', data);

export const updateTime = (data: Partial<Time>) => put<number>('/reserve/time', data);
