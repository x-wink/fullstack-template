import { DelStatus, ID, Page, Student } from '@pkgs/model';
import { BookingStatus, Booking, type RSumRoomBooking, Message, MessageTopic, messageDefaults } from '@pkgs/model';
import { baseColumnDefines, beginTransaction, commit, registRepository, rollback } from '../../dao';
import type { InsertOptions } from '@xwink/dao';
import { ColumnType, Field, OnBuilder, OrderByDirection, QueryBuilder } from '@xwink/dao';
import { getUser, searchUser } from '../system';
import { getRoom, searchRoom } from './room';
import { logger } from '../../utils';
import { querySign, summarySign } from '../sign';
import dayjs from 'dayjs';
import type { Sign, RSumStudyTimes, BookingCondition, BookingSummary } from '@pkgs/model';
import { SignType } from '@pkgs/model';
import { CREATE_TIME } from '@pkgs/model';
import { createMessage } from '../message';
const { count, detail, query, select, create, update, remove } = registRepository<Booking>(
    {
        name: 't_booking',
        columnDefines: [
            ...baseColumnDefines,
            {
                name: 'userId',
                type: ColumnType.INT,
                required: true,
            },
            {
                name: 'roomId',
                type: ColumnType.INT,
                required: true,
            },
            {
                name: 'date',
                type: ColumnType.DATE,
                required: true,
            },
            {
                name: 'start',
                type: ColumnType.TIME,
            },
            {
                name: 'end',
                type: ColumnType.TIME,
            },
            {
                name: 'seatNo',
                type: ColumnType.INT,
                required: true,
            },
            {
                name: 'status',
                type: ColumnType.INT,
                required: true,
                defaultValue: String(BookingStatus.APPROVAL),
            },
        ],
    },
    {
        ignores: ['user', 'room'],
    }
);
export const getBooking = async (id: number) => {
    const entity = await detail(id);
    if (entity) {
        entity.user = (await getUser(entity.userId)) as Student;
        entity.room = await getRoom(entity.roomId);
    }
    return entity;
};
export const pageBooking = async (pageIndex: number, pageSize: number, condition: BookingCondition) => {
    const builder = new QueryBuilder()
        .select('count(1) as count')
        .from('t_booking', 'b')
        .leftJoin('t_user', 'u', new OnBuilder().equal('u.id', Field.parse('b.user_id')))
        .equal('b.del_flag', DelStatus.NORMAL)
        .equal('b.room_id', condition.roomId, () => !!condition.roomId)
        .equal('b.seat_no', condition.seatNo, () => !!condition.seatNo)
        .equal('b.status', condition.status, () => !!condition.status)
        .equal('b.date', condition.date, () => !!condition.date)
        .between('b.date', condition.getQueryRange(), () => !!condition.getQueryRange())
        .equal('u.id', condition.userId, () => !!condition.userId)
        .like('u.username', condition.user?.username, () => !!condition.user?.username)
        .like('u.realname', condition.user?.realname, () => !!condition.user?.realname)
        .like('u.phone', condition.user?.phone, () => !!condition.user?.phone)
        .like('u.leader', condition.user?.leader, () => !!condition.user?.leader)
        .orderBy('b.create_time', OrderByDirection.DESC);
    const [{ count: total }] = await query<{ count: number }>(builder);
    builder.selectBuilder.children = [];
    builder.select('b.*').page(pageIndex, pageSize);
    const list = await query<Booking>(builder);
    if (list.length) {
        const userIds = list.map((item) => item.userId);
        const roomIds = list.map((item) => item.roomId);
        const users = await searchUser({ where: { id: userIds } });
        const rooms = await searchRoom({ where: { id: roomIds } });
        list.forEach((item) => {
            item.user = users.find((user) => user.id === item.userId) as Student;
            item.room = rooms.find((user) => user.id === item.roomId);
        });
    }
    return new Page<Booking>({
        total,
        list,
        pageIndex,
        pageSize,
    });
};
export const exportBooking = async (condition: BookingCondition) => {
    const builder = new QueryBuilder()
        .select('b.*')
        .from('t_booking', 'b')
        .leftJoin('t_user', 'u', new OnBuilder().equal('u.id', Field.parse('b.user_id')))
        .equal('b.del_flag', DelStatus.NORMAL)
        .equal('b.room_id', condition.roomId, () => !!condition.roomId)
        .equal('b.seat_no', condition.seatNo, () => !!condition.seatNo)
        .equal('b.status', condition.status, () => !!condition.status)
        .equal('b.date', condition.date, () => !!condition.date)
        .between('b.date', condition.getQueryRange(), () => !!condition.getQueryRange())
        .equal('u.id', condition.userId, () => !!condition.userId)
        .like('u.username', condition.user?.username, () => !!condition.user?.username)
        .like('u.realname', condition.user?.realname, () => !!condition.user?.realname)
        .like('u.phone', condition.user?.phone, () => !!condition.user?.phone)
        .like('u.leader', condition.user?.leader, () => !!condition.user?.leader)
        .orderBy('b.create_time', OrderByDirection.DESC);
    ('select * from t_sign s where DATE(s.create_time) = b.date and s.user_id = b.user_id');
    const list = await query<Booking>(builder);
    const res: BookingSummary[] = [];
    if (list.length) {
        const userIds = list.map((item) => item.userId);
        const roomIds = list.map((item) => item.roomId);
        const users = await searchUser({ where: { id: userIds } });
        const rooms = await searchRoom({ where: { id: roomIds } });
        const signs = await summarySign();
        list.forEach((item) => {
            item.user = users.find((user) => user.id === item.userId) as Student;
            item.room = rooms.find((user) => user.id === item.roomId);
            res.push({
                ...item,
                sign: ![BookingStatus.CANCEL, BookingStatus.APPROVAL, BookingStatus.REJECT].includes(item.status)
                    ? signs.find(
                          (sign) =>
                              sign.userId === item.userId &&
                              dayjs(sign.date).format('YYYY-MM-DD') === dayjs(item.date).format('YYYY-MM-DD')
                      )
                    : void 0,
            });
        });
    }
    return res;
};
export const createBooking = async (data: Booking, options?: Partial<InsertOptions<Booking>>) => {
    const exists = await count({
        where: {
            userId: data.userId,
            date: data.date,
            status: [
                BookingStatus.CONFIRM,
                BookingStatus.APPROVAL,
                BookingStatus.ACCEPT,
                BookingStatus.LATE,
                BookingStatus.FULFILL,
                BookingStatus.LEAVED,
            ],
        },
    });
    if (exists > 0) {
        throw new Error('已有其他预约');
    }
    const user = new Student(await getUser(data.userId));
    data.user = user;
    try {
        beginTransaction();
        const id = await create([data], options);
        if (data.status === BookingStatus.ACCEPT) {
            await createMessage(
                new Message({
                    ...messageDefaults(),
                    topic: MessageTopic.BOOKING,
                    studentId: user[ID],
                    studentName: user.realname,
                    bookingId: id,
                    bookingStatus: data.status,
                    openid: user.openid,
                    content: '',
                })
            );
        }
        commit();
        setTimeout(
            async () => {
                const res = await detail(id);
                if (res && res.status === BookingStatus.CONFIRM) {
                    res.status = BookingStatus.CANCEL;
                    update(res, { where: { id: res.id } });
                    logger.info(`超时自动取消预约：${res.id}`);
                }
            },
            15 * 60 * 1000
        );
        return id;
    } catch (e) {
        rollback();
        throw e;
    }
};
export const updateBooking = update;
export const removeBooking = remove;

export const statusBooking = async (id: number, status: BookingStatus) => {
    let res = false;
    try {
        beginTransaction();
        const entity = await getBooking(id);
        if (entity) {
            if (status === BookingStatus.APPROVAL && entity.user?.isVip) {
                status = BookingStatus.ACCEPT;
                logger.info(`免审批预约成功：${entity.userId}`);
            }
            res = await update(new Booking({ id, status }));
            entity.status = status;
            if ([BookingStatus.ACCEPT, BookingStatus.REJECT].includes(status)) {
                await createMessage(
                    new Message({
                        ...messageDefaults(),
                        topic: MessageTopic.BOOKING,
                        studentId: entity.user![ID],
                        studentName: entity.user!.realname,
                        bookingId: id,
                        bookingStatus: status,
                        openid: entity.user!.openid,
                        content: '',
                    })
                );
            }
        }
        commit();
    } catch (e) {
        rollback();
        throw e;
    }
    return res;
};

/**
 * 统计学习时长
 * @param userId 用户ID
 */
export const sumStudyTimes = async (userId: number) => {
    const begin = dayjs(new Date()).add(-1, 'month').toDate();
    const list = await querySign<Sign>(
        new QueryBuilder().from('t_sign').equal('userId', userId).gte('create_time', begin).orderBy('create_time')
    );
    const sum: RSumStudyTimes = {
        today: 0,
        week: 0,
        month: 0,
    };
    let start: Date | undefined;
    let field: 'today' | 'week' | 'month' | undefined;
    list.forEach((item) => {
        const date = item[CREATE_TIME]!;
        if (dayjs(new Date()).isSame(date, 'day')) {
            field = 'today';
        } else if (dayjs(new Date()).diff(date, 'day') <= 7) {
            field = 'week';
        } else {
            field = 'month';
        }
        if (item.type === SignType.SIGN_IN) {
            start = item[CREATE_TIME];
        } else if (start) {
            sum[field] += (date.getTime() - start.getTime()) / 60000;
            start = undefined;
        }
    });
    sum.week += sum.today;
    sum.month += sum.week;
    return sum;
};

/**
 * 统计场地预约人数信息
 * @param roomId 场地ID
 */
export const sumRoomBooking = async (roomId: number, date: Date) => {
    let res = await select({ where: { roomId, status: BookingStatus.LEAVED, date } });
    const leaved = res.map((item) => item.seatNo);
    res = await select({
        where: {
            roomId,
            status: [
                BookingStatus.CONFIRM,
                BookingStatus.APPROVAL,
                BookingStatus.ACCEPT,
                BookingStatus.APPROVAL,
                BookingStatus.FULFILL,
                BookingStatus.LATE,
            ],
            date,
        },
    });
    const selected = res.map((item) => item.seatNo);
    return {
        leaved,
        selected,
    } as RSumRoomBooking;
};
