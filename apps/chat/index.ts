/* eslint-disable no-console */
import express from 'express';
import expressWs from 'express-ws';

const app = express();
expressWs(app);

import { setup } from './controller';
setup(app);

app.listen(3001);
console.info('聊天服务启动成功：ws://127.0.0.1:3001/chat/all');
