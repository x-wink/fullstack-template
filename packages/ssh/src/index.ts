/* eslint-disable no-console */
import { Client } from 'ssh2';
import path from 'path';
import fs from 'fs';
const client = new Client();
const resolvePath = (...paths: string[]) => path.resolve(...[process.cwd(), ...paths]);
const exec = (command: string) => {
    return new Promise((resolve, reject) => {
        client.exec(command, (err, stream) => {
            if (err) {
                reject(err);
            } else {
                stream
                    .on('exit', (code: string, signal: string) => {
                        console.info(`命令执行结束，退出码为：${code}，信号为：${signal}`);
                    })
                    .on('data', (data: ArrayBuffer) => {
                        const str = new String(data).toString();
                        console.info('标准输出', str);
                        resolve(str);
                    })
                    .stderr.on('data', (data) => {
                        const str = new String(data).toString();
                        console.info('错误输出', str);
                        reject(str);
                    });
            }
        });
    });
};
const scan = (dir: string, excludes: string[] = [], parent = '') => {
    const res = [] as string[];
    dir = path.resolve(parent, dir);
    if (excludes.includes(dir)) {
        console.info('已忽略：' + dir);
    } else {
        if (fs.existsSync(dir)) {
            if (fs.statSync(dir).isDirectory()) {
                res.push(...fs.readdirSync(dir).flatMap((item) => scan(item, excludes, dir)));
            } else {
                res.push(dir);
            }
        } else {
            console.warn('目录或者文件不存在：' + dir);
        }
    }
    return res;
};
const sftp = (local: string, remote: string, options?: { excludes: string[] }) => {
    let { excludes = [] } = options ?? {};
    excludes = excludes.map((item) => resolvePath(local, item));
    local = resolvePath(local);
    return new Promise<void>((resolve, reject) => {
        client.sftp(async (err, sftp) => {
            if (err) {
                console.info(`SFTP开启失败：${local} => ${remote}`);
                reject(err);
            } else {
                const files = scan(local, excludes);
                const hasSuffix = (file: string) => path.basename(file).split('.').filter(Boolean).length > 1;
                // 如果本地文件超过一个、本地文件只有一个而且有后缀但是远程路径没有后缀，则把远程路径当做目录
                let remoteIsDir = false;
                if (files.length > 1 || (hasSuffix(files[0]) && !hasSuffix(remote))) {
                    remoteIsDir = true;
                    await exec(`mkdir -p ${remote}`);
                }
                await Promise.all(
                    files.map((file) => {
                        let target = remote;
                        if (remoteIsDir) {
                            // TODO 保留目录结构
                            target += path.basename(file);
                        }
                        // TODO 文件没有上传
                        return new Promise<void>((resolve, reject) => {
                            console.info(`开始传输：${file} => ${target}`);
                            sftp.fastPut(file, remote, { mode: 777 }, (err) => {
                                if (err) {
                                    reject(err);
                                    console.info(`传输失败：${file} => ${target}`);
                                } else {
                                    console.info(`传输成功：${file} => ${target}`);
                                    resolve();
                                }
                            });
                        });
                    })
                );
                resolve();
            }
        });
    });
};
const run = () => {
    client
        .on('ready', async () => {
            console.info('连接成功');
            try {
                await sftp('./', '/tests', { excludes: ['node_modules'] });
                // const data = await exec('cd /tests && ls');
                // console.info(new String(data));
            } catch (e) {
                console.error('执行异常', e);
            }
            client.end();
            client.destroy();
        })
        .on('error', (err) => {
            console.info('发生异常：' + err);
        })
        .on('timeout', () => {
            console.info('会话超时');
        })
        .on('close', () => {
            console.info('连接关闭');
        })
        .connect({
            host: '175.178.54.28',
            port: 22,
            username: 'root',
            password: 'aa12300.',
            timeout: 60000,
        });
};
run();
