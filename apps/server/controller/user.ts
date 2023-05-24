import express from 'express';
import { Res, User } from '../entity';
import { createUser, getUser, removeUser, searchUser, updateUser } from '../service/user';

export const userController = express.Router();
userController.get('/:id', async (req, res) => {
    res.send(Res.success(await getUser(Number(req.params.id || 0))));
});
userController.get('/', async (req, res) => {
    res.send(Res.success(await searchUser(req.query as unknown as User)));
});
userController.post('/', async (req, res) => {
    res.send(Res.success(await createUser(req.body)));
});
userController.put('/', async (req, res) => {
    const id = req.body.id;
    const user = await getUser(id);
    if (user) {
        res.send(Res.success(await updateUser(req.body)));
    } else {
        res.send(Res.forbidden());
    }
});
userController.delete('/', async (req, res) => {
    res.send(Res.success(await removeUser(2)));
});
