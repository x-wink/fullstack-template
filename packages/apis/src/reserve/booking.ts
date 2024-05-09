import { del } from '../request';
import { get, post, put } from '../request';
import type { PStatusBooking, Page, Booking, RSumRoomBooking, RSumStudyTimes, BookingSummary } from '@pkgs/model';

export const findBookingPage = (pageIndex: number, pageSize: number, params?: Record<string, unknown>) =>
    get<Page<Booking>>(`/reserve/booking/${pageIndex}/${pageSize}`, params);

export const statusBooking = (data: PStatusBooking) => put<boolean>('/reserve/booking/status', data);

export const removeBooking = (ids: number[]) => del<number>(`/reserve/booking/${ids.join(',')}`);

export const getBooking = (id: number) => get<Booking>(`/reserve/booking/${id}`);

export const createBooking = (data: Partial<Booking>) => post<number>('/reserve/booking', data);

export const updateBooking = (data: Partial<Booking>) => put<number>('/reserve/booking', data);

export const sumRoomBooking = (roomId: number, date: string) =>
    get<RSumRoomBooking>(`/reserve/booking/sumRoomBooking/${roomId}`, { date });

export const sumStudyTimes = (userId: number) => get<RSumStudyTimes>(`/reserve/booking/sumStudyTimes/${userId}`);

export const exportBooking = (params: Record<string, unknown>) =>
    get<BookingSummary[]>(`/reserve/booking/export`, params);
