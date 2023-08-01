import { Application } from 'express';
import { chat } from './chat';
export const setup = (app: Application) => {
    app.use('/chat', chat);
};
