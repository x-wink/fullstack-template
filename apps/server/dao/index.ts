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
            username varchar(20) not null,
            nickname varchar(20),
            password varchar(64) not null,
            phone varchar(20),
            photo varchar(64),
            enabled tinyint(1) not null default 1,
            locked tinyint(1) not null default 0,
            expired tinyint(1) not null default 0
        )`,
        `CREATE TABLE if not exists role (
            id int(5) primary key auto_increment not null,
            del_flag tinyint(1) not null default 0,
            name varchar(20) not null,
            code varchar(20) not null,
            enabled tinyint(1) not null default 1
        )`,
        `CREATE TABLE if not exists menu (
            id int(5) primary key auto_increment not null,
            del_flag tinyint(1) not null default 0,
            parent_id int(5),
            permission varchar(20) not null,
            label varchar(20) not null,
            sort int(5) not null default 0,
            url varchar(64) not null,
            type int(5) not null default 0,
            visible tinyint(1) not null default 1
        )`,
        `CREATE TABLE if not exists r_user_role (
            user_id int(5) not null,
            role_id int(5) not null,
            primary key(user_id, role_id)
        )`,
        `CREATE TABLE if not exists r_role_menu (
            role_id int(5) not null,
            menu_id int(5) not null,
            primary key(role_id, menu_id)
        )`,
    ],
});
export const get = dao.get;
export const select = dao.select;
export const insert = dao.insert;
export const update = dao.update;
export const remove = dao.remove;
export const revoke = dao.revoke;
