import { publicKey as key } from './key';
const importCache = [] as CryptoKey[];
const importKey = async (rawKey: string, isPrivate = false) => {
    if (importCache[isPrivate ? 1 : 0]) {
        return importCache[isPrivate ? 1 : 0];
    }
    const buffer = Uint8Array.from(window.atob(rawKey.split('\n').filter(Boolean).slice(1, -1).join('')), (c) =>
        c.charCodeAt(0)
    );
    const key = await window.crypto.subtle.importKey(
        isPrivate ? 'pkcs8' : 'spki',
        buffer,
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
        },
        false,
        isPrivate ? ['decrypt'] : ['encrypt']
    );
    importCache[isPrivate ? 1 : 0] = key;
    return key;
};
/**
 * 加密
 */
export const encrypt = async (text: string) => {
    const publicKey = await importKey(key);
    const encodedText = new TextEncoder().encode(text);
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: 'RSA-OAEP',
        },
        publicKey,
        encodedText
    );
    return window.btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
};

/** 接口数据加密 */
export const encryptData = async (data: string) => {
    const key = window.crypto.getRandomValues(new Uint8Array(16));
    const aesKey = await window.crypto.subtle.importKey('raw', key.buffer, 'AES-CTR', false, ['encrypt', 'decrypt']);
    const encodedKey = await encrypt(window.btoa(String.fromCharCode(...key)));
    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const encodedData = await window.crypto.subtle.encrypt(
        { name: 'AES-CTR', counter: iv, length: 128 },
        aesKey,
        new TextEncoder().encode(data)
    );
    return {
        key: encodedKey,
        iv: window.btoa(String.fromCharCode(...iv)),
        data: window.btoa(String.fromCharCode(...new Uint8Array(encodedData))),
    };
};
