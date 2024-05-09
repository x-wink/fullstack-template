import { default as express } from 'express';
import http from 'http';
import { config, env, useLogger } from './utils';
import setupControllers from './controller';
import { preSetup, postSetup } from './middleware';
// 配置服务
const app = express();
preSetup(app);
setupControllers(app);
postSetup(app);
// 启动服务
const logger = useLogger();
const {
    publish: { port, domain },
} = config;
logger.info(config);
http.createServer(app).listen(port, () => {
    logger.info(`HTTP服务启动成功【${env}】 >> http://${domain}:${port}`);
});
