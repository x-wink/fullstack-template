import { del } from '../request';
import { get, post, put } from '../request';
import type { PStatusRole, Role } from '@pkgs/model';

export const searchRole = (params?: Partial<Role>) => get<Role[]>(`/sys/role`, params);

export const statusRole = (data: PStatusRole) => put<boolean>('/sys/role/status', data);

export const removeRole = (ids: number[]) => del<number>(`/sys/role/${ids.join(',')}`);

export const getRole = (id: number) => get<Role>(`/sys/role/${id}`);

export const createRole = (data: Partial<Role>) => post<number>('/sys/role', data);

export const updateRole = (data: Partial<Role>) => put<number>('/sys/role', data);
