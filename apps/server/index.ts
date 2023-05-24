import { default as express } from 'express';
import { readFileSync } from 'fs';
import http from 'http';
import https from 'https';
import { resolve } from 'path';
import { config, env, useLogger } from './utils';
import { setup as setupController } from './controller';
import { preSetup as preSetupMiddleware, postSetup as postSetuoMiddleware } from './middleware';
// 配置服务
const app = express();
preSetupMiddleware(app);
setupController(app);
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
});
if (sslPort) {
    const cert = readFileSync(resolve(ssl, domain + '.pem'), 'utf8');
    const key = readFileSync(resolve(ssl, domain + '.key'), 'utf8');
    https.createServer({ key, cert }, app).listen(sslPort, () => {
        logger.info(`HTTPS服务启动成功【${env}】 >> https://${domain}:${sslPort}`);
    });
}
