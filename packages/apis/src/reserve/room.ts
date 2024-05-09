import { del } from '../request';
import { get, post, put } from '../request';
import type { PStatusRoom, Page, Room } from '@pkgs/model';

export const findRoomPage = (pageIndex: number, pageSize: number, params?: Record<string, unknown>) =>
    get<Page<Room>>(`/reserve/room/${pageIndex}/${pageSize}`, params);

export const statusRoom = (data: PStatusRoom) => put<boolean>('/reserve/room/status', data);

export const removeRoom = (ids: number[]) => del<number>(`/reserve/room/${ids.join(',')}`);

export const getRoom = (id: number) => get<Room>(`/reserve/room/${id}`);

export const createRoom = (data: Partial<Room>) => post<number>('/reserve/room', data);

export const updateRoom = (data: Partial<Room>) => put<number>('/reserve/room', data);
