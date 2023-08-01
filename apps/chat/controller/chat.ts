/* eslint-disable no-console */
import express from 'express';

export const chat = express.Router();
let id = 0;

chat.ws('/all', function (ws, req) {
    const name = req.query.name ?? '匿名用户' + ++id;
    console.info('来了老弟，' + name);
    ws.addListener('close', () => {
        console.info('拜拜了您嘞，' + name);
    });
    ws.onmessage = (e) => {
        ws.send(name + '的本质是复读机，' + e.data);
    };
});
