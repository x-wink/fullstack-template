import { default as express } from 'express';
import { readFileSync } from 'fs';
import http from 'http';
import https from 'https';
import { resolve } from 'path';
import { config, env, useLogger } from './utils';
import { setup as setupController } from './controller';
import { preSetup as preSetupMiddleware, postSetup as postSetuoMiddleware } from './middleware';
import expressWs from 'express-ws';
// 配置服务
const app = express();
expressWs(app);
preSetupMiddleware(app);
setupController(app);
// const chat = express.Router();
// chat.ws('/all', function (ws, req) {
//     ws.onopen = () => {
//         ws.send('来了老弟，' + req.query.name);
//     };
//     ws.onclose = () => {
//         ws.send('拜拜了您嘞，' + req.query.name);
//     };
//     ws.onerror = (e) => {
//         ws.send('哦豁，' + e.message);
//     };
//     ws.onmessage = (e) => {
//         ws.send('人类的本质是复读机，' + e.data);
//     };
// });
// app.use('/chat', chat);
postSetuoMiddleware(app);
// 启动服务
const logger = useLogger();
const {
    publish: { port, sslPort, domain },
    dir: { ssl },
} = config;
logger.info(config);
http.createServer(app).listen(port, () => {
    logger.info(`HTTP服务启动成功【${env}】 >> http://${domain}:${port}`);
    logger.info(`WS服务启动成功【${env}】 >> ws://${domain}:${port}`);
});
if (sslPort) {
    const cert = readFileSync(resolve(ssl, domain + '.pem'), 'utf8');
    const key = readFileSync(resolve(ssl, domain + '.key'), 'utf8');
    https.createServer({ key, cert }, app).listen(sslPort, () => {
        logger.info(`HTTPS服务启动成功【${env}】 >> https://${domain}:${sslPort}`);
        logger.info(`WSS服务启动成功【${env}】 >> wss://${domain}:${sslPort}`);
    });
}
