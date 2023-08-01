import express from 'express';

export const chat = express.Router();
chat.ws('/all', function (ws, req) {
    ws.onopen = () => {
        ws.send('来了老弟，' + req.query.name);
    };
    ws.onclose = () => {
        ws.send('拜拜了您嘞，' + req.query.name);
    };
    ws.onerror = (e) => {
        ws.send('哦豁，' + e.message);
    };
    ws.onmessage = (e) => {
        ws.send('人类的本质是复读机，' + e.data);
    };
});
