import { dayjs } from 'element-plus';

export const formatTime = (time?: Date) =>
    new Date(`2023-01-01T${(time as unknown as string) ?? '00:00:00.000'}Z`).toLocaleTimeString();

export const formatDate = (date = new Date(), fill = false) =>
    new Date(dayjs(date).format(fill ? 'YYYY-MM-DD 23:59:59' : 'YYYY-MM-DD 00:00:00'));
