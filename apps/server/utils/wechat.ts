import crypto from 'crypto';
import { config } from './config';
import { getLogger } from 'log4js';
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

const {
    publish: { domain },
    wechat: { token, appid, secret },
} = config;

export const validate = (sign: WechatSign) => {
    const { signature, timestamp, nonce } = sign;
    const array = [token, timestamp, nonce].sort();
    const str = array.join('');
    const sha1 = crypto.createHash('sha1');
    sha1.update(str);
    return sha1.digest('hex') === signature;
};
const get = async <T>(url: string) => {
    const res = await fetch(url);
    return (await res.json()) as T;
};
const post = async <T>(url: string, body: unknown) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
    });
    return (await res.json()) as T;
};

export interface RAccessToken {
    access_token: string;
    expires_in: number;
}
export const getAccessToken = async () => {
    return await get<RAccessToken>(
        `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
    );
};

export const setMenu = async () => {
    const { access_token } = await getAccessToken();
    await post(`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`, {
        button: [
            {
                type: 'view',
                name: 'H5页面',
                url: `https://${domain}/`,
            },
        ],
    });
};

export interface ROpenId {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    openid: string;
    scope: string;
    is_snapshotuser: 0 | 1;
    unionid: string;
    errcode: number;
    errmsg: string;
}
export const getOpenId = async (code: string) => {
    const res = await get<ROpenId>(
        `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`
    );
    if (res.errcode) throw new Error(res.errmsg);
    return res;
};

export interface RUserInfo {
    openid: string;
    nickname: string;
    sex: 2 | 1 | 0;
    province: string;
    city: string;
    country: string;
    headimgurl: string;
    privilege: string[];
    unionid: string;
}
export const getUserInfo = async (code: string) => {
    const data = await getOpenId(code);
    return await get<RUserInfo>(
        `https://api.weixin.qq.com/sns/userinfo?access_token=${data.access_token}&openid=${data.openid}`
    );
};

export const MessageTemplate = {} as Record<string, string>;

const logger = getLogger('wechat');
export const sendTemplateMessage = async (
    templateId: string,
    openid: string,
    options?: {
        data?: Record<string, { value: string; color?: string }>;
        topcolor?: string;
        url?: string;
    }
) => {
    const { data = {}, topcolor = '#FF0000', url } = options ?? {};
    const { access_token } = await getAccessToken();
    const res = await post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`, {
        touser: openid,
        template_id: templateId,
        data,
        topcolor,
        url,
    });
    logger.info('发送公众号模板消息', res);
};