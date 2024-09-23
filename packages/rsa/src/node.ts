import { constants, privateDecrypt, publicEncrypt, generateKeyPair, createDecipheriv } from 'crypto';
import { privateKey, publicKey } from './key';
export const gen = () =>
    new Promise<{ publicKey: string; privateKey: string }>((resolve, reject) => {
        generateKeyPair(
            'rsa',
            {
                modulusLength: 2048,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem',
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                },
            },
            (err, publicKey, privateKey) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ publicKey, privateKey });
                }
            }
        );
    });
/**
 * 加密
 */
export const encrypt = (plaintext: string) => {
    const buffer = Buffer.from(plaintext, 'utf8');
    const encrypted = publicEncrypt(
        {
            key: publicKey,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        buffer
    );
    return encrypted.toString('base64');
};

/**
 * 解密
 */
export const decrypt = (encryptedText: string) => {
    const buffer = Buffer.from(encryptedText, 'base64');
    const decrypted = privateDecrypt(
        {
            key: privateKey,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        buffer
    );
    return decrypted.toString('utf8');
};

export const decryptData = (data: { key: string; iv: string; data: string }) => {
    const key = Buffer.from(decrypt(data.key), 'base64');
    const iv = Buffer.from(data.iv, 'base64');
    const decipher = createDecipheriv('aes-128-ctr', key, iv);
    let decrypted = decipher.update(data.data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
