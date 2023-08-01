/* eslint-disable no-console */
import express from 'express';
import { ChatData, ChatDataType, PONG } from '@pkgs/chat';
import { useIdGenerator } from '@pkgs/lib';
import { Room, useChatRoom } from '../core/room';
export const chat = express.Router();

const genUserId = useIdGenerator(0, 3).auto;
const genRoomId = useIdGenerator(0, 6).auto;
const { rooms } = useChatRoom();
chat.ws('/all', function (ws, req) {
    const name = (req.query.name ?? '用户' + genUserId()) as string;
    let roomNo = req.query.no as string | undefined;
    if (!roomNo) {
        do {
            roomNo = genRoomId();
        } while (rooms.has(roomNo));
    }
    const room = rooms.get(roomNo) ?? new Room(roomNo);
    if (!room.has(name)) {
        room.join({ send: ws.send.bind(ws), name });
    }
    rooms.set(roomNo, room);

    ws.addListener('close', () => {
        console.info('拜拜了您嘞，' + name);
    });
    ws.addEventListener('message', (e) => {
        const data = ChatData.from(e.data.toString());
        switch (data.type) {
            case ChatDataType.error:
                ws.send(data.toString());
                break;
            case ChatDataType.heart:
                ws.send(PONG);
                break;
            case ChatDataType.message:
                data.content!.content = name + '的本质是复读机，' + data.content!.content;
                room.send(data);
                break;
            case ChatDataType.request:
                break;
            case ChatDataType.response:
                break;
        }
    });
});
