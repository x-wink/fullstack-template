export enum ResCode {
    SUCCESS = 200,
    FORBIDDEN = 403,
    NOTFOUND = 404,
    ERROR = 500,
}
export class Res<T> {
    code: ResCode;
    data?: T;
    message?: string;
    constructor(code: ResCode, data?: T, message?: string) {
        this.code = code;
        this.data = data;
        this.message = message;
    }
    static success<T>(data?: T) {
        return new Res<T>(ResCode.SUCCESS, data);
    }
    static error(message: string) {
        return new Res<never>(ResCode.ERROR, undefined, message);
    }
    static forbidden(message = '无权访问') {
        return new Res<never>(ResCode.FORBIDDEN, undefined, message);
    }
    static notFound() {
        return new Res<never>(ResCode.NOTFOUND, undefined, '资源不存在');
    }
}
