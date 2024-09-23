import { generateKeyPair } from 'crypto';
import { writeFileSync } from 'fs';

generateKeyPair(
    'rsa',
    {
        modulusLength: 2048, // 密钥长度
        publicKeyEncoding: {
            type: 'spki', // 推荐的公钥编码
            format: 'pem', // 编码格式
        },
        privateKeyEncoding: {
            type: 'pkcs8', // 推荐的私钥编码
            format: 'pem', // 编码格式
            cipher: 'aes-256-cbc', // 加密算法
            passphrase: 'Xwink12300.', // 加密密钥
        },
    },
    (err, publicKey, privateKey) => {
        // 错误处理
        if (err) throw err;

        // 输出公钥和私钥
        writeFileSync('rsa.pub', publicKey);
        writeFileSync('rsa.key', privateKey);
    }
);
