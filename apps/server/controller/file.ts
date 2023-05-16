import express from 'express';
import { unlink } from 'fs';
import multer from 'multer';
import { resolve } from 'path';
import { v4 } from 'uuid';
import { config } from '../config';
import { Res } from '../entity/res';
import { getUser, updateUser } from '../service/user';
import { useLogger } from '../utils';
export const fileController = express.Router();
fileController.use(express.json());
fileController.use(express.urlencoded());
const storage = multer.diskStorage({
    destination: config.uploadDir,
    filename: (req, file, cb) => {
        cb(null, [v4(), file.originalname.split('.').pop()].join('.'));
    },
});
const upload = multer({
    storage,
});
const logger = useLogger('upload');
const removeFile = (filename: string) => {
    const path = resolve(config.uploadDir, filename);
    unlink(path, () => {
        //删除旧照片
        logger.info('[remove]', path);
    });
};
fileController.post('/upload', upload.single('file'), async (req, res) => {
    const uid = req.body.id;
    const file = req.file;
    if (!file) {
        throw new Error('文件不存在');
    }
    logger.info('[upload]', file.filename);
    const user = await getUser(uid);
    if (!user) {
        res.send(Res.forbidden());
    } else {
        if (user.photo) {
            removeFile(user.photo);
        }
        user.photo = file.filename;
        const result = await updateUser(user);
        if (result !== 1) {
            throw new Error('保存文件失败');
        }
        res.send(Res.success(file.filename));
    }
});
