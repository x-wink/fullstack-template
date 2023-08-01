import { ChatData, ChatMessage, ChatMessageType } from '@pkgs/chat';
import { WebsocketRequestHandler } from 'express-ws';

export const useChatRoom = () => {
    const rooms = new Map<string, Room>();
    return {
        rooms,
    };
};
export interface User {
    name: string;
    send: Parameters<WebsocketRequestHandler>[0]['send'];
}
export class Room {
    readonly no: string;
    private users: User[] = [];
    constructor(no: string) {
        this.no = no;
    }
    send(data: ChatData, target?: string | User) {
        if (target && typeof target !== 'string') {
            target.send(data.toString());
        } else {
            this.users.find((ws) => {
                if (!target || ws.name === target) {
                    ws.send(data.toString());
                }
                return ws.name === target;
            });
        }
    }
    message(message: ChatMessage, target?: string | User) {
        this.send(new ChatData(message), target);
    }
    notify(content: string) {
        this.send(new ChatData(new ChatMessage(content, ChatMessageType.system)));
    }
    has(name: string) {
        return this.users.some((user) => user.name === name);
    }
    join(user: User) {
        this.users.forEach((ws) => {
            this.message(new ChatMessage(`【${ws.name}】在房间中`, ChatMessageType.system), user);
        });
        this.users.push(user);
        this.notify(`【${user.name}】加入房间`);
    }
}
