import { default as express } from 'express';
import { readFileSync } from 'fs';
import http from 'http';
import https from 'https';
import { resolve } from 'path';
import { config, env } from './config';
import { setup as setupController } from './controller';
import { preSetup as preSetupMiddleware, postSetup as postSetuoMiddleware } from './middleware';
import { useLogger } from './utils';
import { encode } from './utils/jwt';
// 配置服务
const app = express();
preSetupMiddleware(app);
setupController(app);
postSetuoMiddleware(app);
// 启动服务
const logger = useLogger();
logger.debug(encode({ username: 'administrator' }));
const { port, sslPort, sslDir, domain } = config;
http.createServer(app).listen(port, () => {
    logger.info(`HTTP服务启动成功【${env}】 >> http://${domain}:${port}`);
});
if (sslPort) {
    const cert = readFileSync(resolve(sslDir, domain + '.pem'), 'utf8');
    const key = readFileSync(resolve(sslDir, domain + '.key'), 'utf8');
    https.createServer({ key, cert }, app).listen(sslPort, () => {
        logger.info(`HTTPS服务启动成功【${env}】 >> https://${domain}:${sslPort}`);
    });
}
