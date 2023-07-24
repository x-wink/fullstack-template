/* eslint-disable no-console */
import { default as express } from 'express';
import expressWs from 'express-ws';

const app = express();
expressWs(app);
// const app = expressWs(express()).app;
const chat = express.Router();
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
app.use('/chat', chat);

app.listen(3001);
console.info('聊天服务启动成功：ws://127.0.0.1:3001/chat/all');
