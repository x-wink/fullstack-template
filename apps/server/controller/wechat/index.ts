import crypto from 'crypto';
import { Router } from 'express';
import { setMenu } from '../../utils';
export const decryptMessage = (encryptedMessage: string, encodingAESKey: string, appId: string) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', encodingAESKey, '');
    let decrypted = decipher.update(encryptedMessage, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    const message = decrypted.substring(20);
    const length = message.length;
    const content = message.slice(0, length);
    const fromAppId = message.slice(length);

    return fromAppId === appId ? content : null;
};
interface WechatSign {
    signature: string;
    timestamp: number;
    nonce: number;
    echostr: string;
}
export const validate = (sign: WechatSign) => {
    const { signature, timestamp, nonce } = sign;
    const token = 'xwink';
    const array = [token, timestamp, nonce].sort();
    const str = array.join('');
    const sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex') === signature;
};

export const wechatController: Router = Router();

wechatController.get<never, string, never, WechatSign>('/token', (req, res) => {
    if (validate(req.query)) {
        res.send(req.query.echostr);
    } else {
        res.send('error');
    }
});
wechatController.get<never, string, never, WechatSign>('/menu', async (req, res) => {
    await setMenu();
    res.send('success');
});
export default (router: Router) => {
    router.use('/wechat', wechatController);
};
