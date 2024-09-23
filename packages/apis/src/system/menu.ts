import { del } from '../request';
import { get, post, put } from '../request';
import type { Menu, PStatusMenu } from '@pkgs/model';
import type { TreeNode } from '@xwink/utils';

export const getMenu = (id: number) => get<Menu>(`/sys/menu/${id}`);

export const searchMenu = (params?: Partial<Menu>) => get<TreeNode<Menu>[]>('/sys/menu', params);

export const statusMenu = (data: PStatusMenu) => put<boolean>('/sys/menu/status', data);

export const createMenu = (data: Partial<Menu>) => post<number>('/sys/menu', data);

export const updateMenu = (data: Partial<Menu>) => put<number>('/sys/menu', data);

export const removeMenu = (ids: number[]) => del<number>(`/sys/menu/${ids.join(',')}`);
