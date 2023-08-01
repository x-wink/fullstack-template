/* eslint-disable no-console */
import express from 'express';
import { ChatData, ChatDataType } from '@pkgs/chat';

export const chat = express.Router();
let id = 0;

chat.ws('/all', function (ws, req) {
    const name = req.query.name ?? '匿名用户' + ++id;
    console.info('来了老弟，' + name);
    ws.addListener('close', () => {
        console.info('拜拜了您嘞，' + name);
    });
    ws.addEventListener('message', (e) => {
        const data = ChatData.from(e.data.toString());
        switch (data.type) {
            case ChatDataType.error:
                break;
            case ChatDataType.heart:
                break;
            case ChatDataType.message:
                data.content!.content = name + '的本质是复读机，' + data.content!.content;
                ws.send(data.toString());
                break;
            case ChatDataType.request:
                break;
            case ChatDataType.response:
                break;
        }
    });
});
