import { del } from '../request';
import { get, post, put } from '../request';
import type { Page, Log } from '@pkgs/model';

export const findLogPage = (pageIndex: number, pageSize: number, params?: Partial<Log>) =>
    get<Page<Log>>(`/sys/log/${pageIndex}/${pageSize}`, params);

export const removeLog = (ids: number[]) => del<number>(`/sys/log/${ids.join(',')}`);

export const getLog = (id: number) => get<Log>(`/sys/log/${id}`);

export const createLog = (data: Partial<Log>) => post<number>('/sys/log', data);

export const updateLog = (data: Partial<Log>) => put<number>('/sys/log', data);
