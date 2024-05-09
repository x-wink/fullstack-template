import type { Student } from '@pkgs/model';
import { type Message, MessageTopic, isSignupMessage, isBookingMessage, isNotifyMessage } from '@pkgs/model';
import { baseColumnDefines, registRepository } from '../../dao';
import { ColumnType } from '@xwink/dao';
import { sendBookingApprovalMessage, sendSignupApprovalMessage, sendFraudWarnMessage } from '../../utils';
import { getUser } from '../system/user';
import { getBooking } from '../reserve';
const { detail, page, create, update, remove } = registRepository<Message>(
    {
        name: 't_message',
        columnDefines: [
            ...baseColumnDefines,
            {
                name: 'author',
                type: ColumnType.INT,
                required: true,
            },
            {
                name: 'authorName',
                type: ColumnType.STRING,
                required: true,
                length: 20,
            },
            {
                name: 'studentId',
                type: ColumnType.INT,
                required: true,
            },
            {
                name: 'studentName',
                type: ColumnType.STRING,
                required: true,
                length: 20,
            },
            {
                name: 'openid',
                type: ColumnType.STRING,
                required: true,
                length: 30,
            },
            {
                name: 'topic',
                type: ColumnType.INT,
                required: true,
                defaultValue: String(MessageTopic.NOTIFY),
            },
            {
                name: 'signupStatus',
                type: ColumnType.INT,
            },
            {
                name: 'bookingId',
                type: ColumnType.INT,
            },
            {
                name: 'bookingStatus',
                type: ColumnType.INT,
            },
            {
                name: 'notifyType',
                type: ColumnType.INT,
            },
            {
                name: 'content',
                type: ColumnType.STRING,
                required: true,
            },
        ],
    },
    { ignores: ['student'] }
);
export const getMessage = detail;
export const pageMessage = page;
export const createMessage = async (data: Message) => {
    if (isSignupMessage(data)) {
        const student = (await getUser(data.studentId)) as Student;
        await sendSignupApprovalMessage(student);
    } else if (isBookingMessage(data)) {
        const booking = await getBooking(data.bookingId);
        await sendBookingApprovalMessage(booking!);
    } else if (isNotifyMessage(data)) {
        await sendFraudWarnMessage(data.openid);
    }
    return await create([data]);
};
export const updateMessage = update;
export const removeMessage = remove;
