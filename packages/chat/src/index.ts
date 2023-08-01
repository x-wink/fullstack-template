export enum ChatDataType {
    error = -1,
    heart = 0,
    message = 1,
    request = 2,
    response = 3,
}
export class ChatData<T = ChatMessage> {
    id: string;
    type: ChatDataType;
    content?: T;
    constructor(content?: T, type: ChatDataType = ChatDataType.message) {
        this.id = Date.now() + '';
        this.content = content;
        this.type = type;
    }
    static from<T = ChatMessage>(json: string) {
        console.info(json);
        const data = new ChatData<T>();
        try {
            const obj = JSON.parse(json);
            if (typeof obj !== 'object') {
                throw new Error('无效内容');
            } else {
                Object.assign(data, obj);
            }
        } catch (e) {
            data.type = ChatDataType.error;
            data.content = (e as Error).message as T;
        }
        return data;
    }
    toString() {
        return JSON.stringify(this);
    }
}

export enum ChatMessageType {
    text = 0,
    emojis = 1,
    image = 2,
    video = 3,
    file = 4,
    link = 5,
}
export class ChatMessage {
    type: ChatMessageType;
    content: string;
    constructor(content: string, type = ChatMessageType.text) {
        this.type = type;
        this.content = content;
    }
    toString() {
        return JSON.stringify(this);
    }
}
