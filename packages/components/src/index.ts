import SeatSFC from './seat/index.vue';
import type { Seat } from '@pkgs/model';
export const XSeat = SeatSFC;

export type SeatInstance = InstanceType<typeof SeatSFC>;
export interface SeatConfig {
    flipHorizontal: boolean;
    flipVertical: boolean;
    row: number;
    col: number;
    skip?: number[];
    split?: SeatSplit[];
    white?: number[];
}
export interface SeatSplit {
    type: 'horizontal' | 'vertical';
    label: string;
    location: number;
    width: number;
    height: number;
}
export const generateSeatConfig = (seat?: Seat) => {
    const { flipHorizontal = false, flipVertical = false, row = 5, col = 5, split = '', white = '' } = seat ?? {};
    return {
        flipHorizontal,
        flipVertical,
        row,
        col,
        split: split
            ?.split(',')
            .filter(Boolean)
            .map((item) => ({
                type: 'horizontal',
                width: col,
                height: 1,
                location: +item - 1,
                label: '走廊',
            })),
        white: white
            ?.split(',')
            .filter(Boolean)
            .map((item) => +item),
    } as SeatConfig;
};
