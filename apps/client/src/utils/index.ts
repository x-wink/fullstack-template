export * from './amap';
export const formatTime = (time?: Date) =>
    new Date(`2023-01-01T${(time as unknown as string) ?? '00:00:00.000'}Z`).toLocaleTimeString();
