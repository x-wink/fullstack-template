import { RoomTimeRelation } from '@pkgs/model';
import type { Room, Seat } from '@pkgs/model';
import { baseColumnDefines, beginTransaction, commit, registRepository } from '../../dao';
import { ColumnType } from '@xwink/dao';
const { detail, page, select, create, update, remove } = registRepository<Room>(
    {
        name: 't_room',
        columnDefines: [
            ...baseColumnDefines,
            {
                name: 'name',
                type: ColumnType.STRING,
                length: 20,
                required: true,
            },
            {
                name: 'count',
                type: ColumnType.INT,
                defaultValue: '0',
                required: true,
            },
            {
                name: 'seatId',
                type: ColumnType.INT,
                required: true,
            },
            {
                name: 'enabled',
                type: ColumnType.BOOLEAN,
                defaultValue: '0',
                required: true,
            },
        ],
    },
    {
        ignores: ['times', 'seat'],
    }
);
export const getRoom = async (id: number) => {
    const entity = await detail(id);
    if (entity) {
        entity.times = await searchRoomTimes(id);
        entity.seat = await detailSeat(entity.seatId);
    }
    return entity;
};
export const pageRoom = page;
export const searchRoom = select;
export const createRoom = async (entity: Room) => {
    beginTransaction();
    const seatId = await createSeat([entity.seat!]);
    entity.seatId = seatId;
    const id = await create([entity]);
    await createRoomTimes(id, entity.times);
    commit();
    return id;
};
export const updateRoom = async (entity: Room) => {
    beginTransaction();
    const count = await update(entity);
    await deleteRoomTimes(entity.id!);
    await createRoomTimes(entity.id!, entity.times);
    await updateSeat(entity.seat!, { where: { id: entity.seatId } });
    commit();
    return count;
};
export const removeRoom = remove;

const timeRepo = registRepository<RoomTimeRelation>({
    name: 'r_room_time',
    isRelationTable: true,
    columnDefines: [
        {
            name: 'roomId',
            type: ColumnType.INT,
            primary: true,
            required: true,
        },
        {
            name: 'timeId',
            type: ColumnType.INT,
            primary: true,
            required: true,
        },
    ],
});
export const deleteRoomTimes = (id: number) => {
    return timeRepo.deletion([id], 'roomId');
};
export const createRoomTimes = async (id: number, times: number[]) => {
    return times.length
        ? await timeRepo.create(times.map((timeId) => new RoomTimeRelation({ roomId: id, timeId })))
        : 0;
};
export const searchRoomTimes = async (id: number) => {
    return (await timeRepo.select({ where: { roomId: id } })).map((item) => item.timeId);
};

const seatRepo = registRepository<Seat>({
    name: 't_seat',
    columnDefines: [
        ...baseColumnDefines,
        {
            name: 'flipHorizontal',
            type: ColumnType.BOOLEAN,
            required: true,
            defaultValue: '0',
        },
        {
            name: 'flipVertical',
            type: ColumnType.BOOLEAN,
            required: true,
            defaultValue: '0',
        },
        {
            name: 'row',
            type: ColumnType.INT,
            required: true,
            defaultValue: '0',
        },
        {
            name: 'col',
            type: ColumnType.INT,
            required: true,
            defaultValue: '0',
        },
        {
            name: 'split',
            type: ColumnType.STRING,
        },
        {
            name: 'white',
            type: ColumnType.STRING,
        },
    ],
});
export const createSeat = seatRepo.create;
export const updateSeat = seatRepo.update;
export const detailSeat = seatRepo.detail;
