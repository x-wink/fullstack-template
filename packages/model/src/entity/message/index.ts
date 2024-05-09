import { BaseEntity } from '../../base';
import type { BookingStatus } from '../reserve';
import type { PartialBy } from '@xwink/utils';
import type { Student, UserStatus } from '../system';

export const messageDefaults = () => ({
    author: 0,
    authorName: '系统',
    topic: MessageTopic.NOTIFY,
    notifyType: NotifyType.WARN,
});

export enum MessageTopic {
    SIGNUP = 0,
    BOOKING = 1,
    NOTIFY = 2,
}
export enum NotifyType {
    WARN = 0,
}

export type MessageData = PartialBy<Message, ReturnType<typeof messageDefaults>>;
export class Message extends BaseEntity {
    author!: number;
    authorName!: string;
    studentId!: number;
    studentName!: string;
    student?: Student;
    openid!: string;
    topic!: MessageTopic;
    signupStatus?: UserStatus;
    bookingId?: number;
    bookingStatus?: BookingStatus;
    notifyType?: NotifyType;
    content!: string;
    constructor(data?: Partial<Message>) {
        super();
        Object.assign(this, data);
    }
}
export class SignupMessage extends Message {
    declare topic: MessageTopic.SIGNUP;
    declare signupStatus: UserStatus;
}
export class BookingMessage extends Message {
    declare topic: MessageTopic.BOOKING;
    declare bookingId: number;
    declare bookingStatus: BookingStatus;
}
export class NotifyMessage extends Message {
    declare topic: MessageTopic.NOTIFY;
    declare notifyType: NotifyType;
}
export const isSignupMessage = (data: Message): data is SignupMessage => {
    return data.topic === MessageTopic.SIGNUP;
};
export const isBookingMessage = (data: Message): data is BookingMessage => {
    return data.topic === MessageTopic.BOOKING;
};
export const isNotifyMessage = (data: Message): data is NotifyMessage => {
    return data.topic === MessageTopic.NOTIFY;
};
