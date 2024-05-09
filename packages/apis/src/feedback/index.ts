import { del } from '../request';
import { get, post, put } from '../request';
import type { Page, Feedback } from '@pkgs/model';

export const findFeedbackPage = (pageIndex: number, pageSize: number, params?: Partial<Feedback>) =>
    get<Page<Feedback>>(`/feedback/${pageIndex}/${pageSize}`, params);

export const removeFeedback = (ids: number[]) => del<number>(`/feedback/${ids.join(',')}`);

export const getFeedback = (id: number) => get<Feedback>(`/feedback/${id}`);

export const createFeedback = (data: Partial<Feedback>) => post<number>('/feedback', data);

export const updateFeedback = (data: Partial<Feedback>) => put<number>('/feedback', data);
