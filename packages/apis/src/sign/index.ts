import { del } from '../request';
import { get, post, put } from '../request';
import type { Page, Sign, Sort } from '@pkgs/model';

export const findSignPage = (pageIndex: number, pageSize: number, params?: Partial<Sign> & { sort?: Sort }) =>
    get<Page<Sign>>(`/sign/${pageIndex}/${pageSize}`, params);

export const removeSign = (ids: number[]) => del<number>(`/sign/${ids.join(',')}`);

export const getSign = (id: number) => get<Sign>(`/sign/${id}`);

export const createSign = (data: Partial<Sign>) => post<number>('/sign', data);

export const updateSign = (data: Partial<Sign>) => put<number>('/sign', data);
