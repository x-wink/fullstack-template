import express from 'express';
import { Res } from '../entity';
export const testController = express.Router();
testController.get('/', (req, res) => {
    res.send('Hello World!!');
});
testController.get('/error', () => {
    throw new Error('this is an error!');
});
testController.get('/signout', (req, res) => {
    res.send(Res.forbidden());
});
testController.get('/reject', async (req, res) => {
    res.send(Res.success(await (() => Promise.reject('this is a reject!'))()));
});
