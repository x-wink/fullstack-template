import { useDao } from 'wink-dao';
import { config, isDev, useLogger } from '../utils';

const logger = useLogger('dao');
const dao = useDao({
    config: config.mysql,
    debug: isDev,
    logger,
    initSql: [
        `CREATE TABLE if not exists user (
        id int(5) primary key auto_increment not null,
        del_flag tinyint(1) not null default 0,
        photo varchar(64)
    )`,
    ],
});
export const get = dao.get;
export const select = dao.select;
export const insert = dao.insert;
export const update = dao.update;
export const remove = dao.remove;
export const revoke = dao.revoke;
