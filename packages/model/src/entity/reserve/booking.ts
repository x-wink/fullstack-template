import { BaseEntity } from '../../base';
import type { PartialBy } from '@xwink/utils';
import type { Student } from '../system';
import type { Room } from './room';
import type { SignSummary } from '../sign';

export const bookingDefaults = () => ({
    date: new Date(),
    status: BookingStatus.CONFIRM,
});

export enum BookingStatus {
    /** 确认中 */
    CONFIRM = -1,
    /** 审核中 */
    APPROVAL = 0,
    /** 被拒绝 */
    REJECT = 1,
    /** 已预约 */
    ACCEPT = 2,
    /** 取消预约 */
    CANCEL = 3,
    /** 迟到 */
    LATE = 4,
    /** 进行中 */
    FULFILL = 5,
    /** 暂离 */
    LEAVED = 6,
    /** 早退 */
    EARLY = 7,
    /** 缺席 */
    ABSENT = 8,
    /** 完成 */
    DONE = 9,
}
export const bookingStatusDict = {
    [BookingStatus.CONFIRM]: '确认中',
    [BookingStatus.APPROVAL]: '审核中',
    [BookingStatus.REJECT]: '被拒绝',
    [BookingStatus.ACCEPT]: '已预约',
    [BookingStatus.CANCEL]: '取消预约',
    [BookingStatus.LATE]: '迟到',
    [BookingStatus.FULFILL]: '进行中',
    [BookingStatus.LEAVED]: '暂离',
    [BookingStatus.EARLY]: '早退',
    [BookingStatus.ABSENT]: '缺席',
    [BookingStatus.DONE]: '完成',
} as Record<string, string>;
export const bookingStatusOpts = Object.entries(bookingStatusDict).map(([value, label]) => ({ value: +value, label }));

export type BookingData = PartialBy<Booking, ReturnType<typeof bookingDefaults>>;
export class Booking extends BaseEntity {
    userId!: number;
    user?: Student;
    roomId!: number;
    room?: Room;
    date!: Date;
    start?: Date;
    end?: Date;
    seatNo!: number;
    status!: BookingStatus;
    constructor(data?: Partial<Booking>) {
        super();
        Object.assign(this, data);
    }
}
export class BookingCondition extends Booking {
    #range?: [Date, Date];
    constructor(data?: Partial<Booking> & { range?: [Date, Date] }) {
        super(data);
        this.#range = data?.range;
    }
    getQueryRange() {
        return this.#range;
    }
}

export class BookingSummary extends Booking {
    sign?: SignSummary;
}

export interface PStatusBooking {
    id: number;
    status: BookingStatus;
}

export interface RSumRoomBooking {
    leaved: number[];
    selected: number[];
}

export interface RSumStudyTimes {
    today: number;
    week: number;
    month: number;
}
