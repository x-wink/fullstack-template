import { BaseEntity } from '../../base';
import type { PartialBy } from '@xwink/utils';

export const roomDefaults = () => ({
    name: 'unknown',
    count: 0,
    times: [],
    enabled: false,
    seat: seatDefaults(),
});
export const seatDefaults = () => ({
    flipHorizontal: false,
    flipVertical: false,
    row: 5,
    col: 5,
    split: '',
});

export type RoomData = PartialBy<Room, ReturnType<typeof roomDefaults>>;
export class Room extends BaseEntity {
    name!: string;
    count!: number;
    times!: number[];
    enabled!: boolean;
    seatId!: number;
    seat?: Seat;
    constructor(data?: Partial<Room>) {
        super();
        Object.assign(this, data);
    }
}

export type SeatData = PartialBy<Seat, ReturnType<typeof seatDefaults>>;
export class Seat extends BaseEntity {
    flipHorizontal!: boolean;
    flipVertical!: boolean;
    row!: number;
    col!: number;
    split?: string;
    white?: string;
}

export class RoomTimeRelation {
    roomId!: number;
    timeId!: number;
    constructor(data?: Partial<RoomTimeRelation>) {
        Object.assign(this, data);
    }
}

export interface PStatusRoom {
    id: number;
    enabled: boolean;
}
