import { del } from '../request';
import { get, post, put } from '../request';
import type { Page, Message } from '@pkgs/model';

export const findMessagePage = (pageIndex: number, pageSize: number, params?: Partial<Message>) =>
    get<Page<Message>>(`/message/${pageIndex}/${pageSize}`, params);

export const removeMessage = (ids: number[]) => del<number>(`/message/${ids.join(',')}`);

export const getMessage = (id: number) => get<Message>(`/message/${id}`);

export const createMessage = (data: Partial<Message>) => post<number>('/message', data);

export const updateMessage = (data: Partial<Message>) => put<number>('/message', data);
