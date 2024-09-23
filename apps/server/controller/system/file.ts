import { Router, json, urlencoded } from 'express';
import { unlink } from 'fs';
import multer from 'multer';
import { resolve } from 'path';
import { v4 } from 'uuid';
import { Res } from '@pkgs/model';
import { getUser, updateUser } from '../../service/system/user';
import { useLogger, config } from '../../utils';
export const fileController = Router();
fileController.use(json());
fileController.use(urlencoded());
const storage = multer.diskStorage({
    destination: config.dir.upload,
    filename: (req, file, cb) => {
        cb(null, [v4(), file.originalname.split('.').pop()].join('.'));
    },
});
const upload = multer({
    storage,
});
const logger = useLogger('upload');
const removeFile = (filename: string) => {
    const path = resolve(config.dir.upload, filename);
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
        if (user.avatar) {
            removeFile(user.avatar);
        }
        user.avatar = file.filename;
        const result = await updateUser(user);
        if (result) {
            throw new Error('保存文件失败');
        }
        res.send(Res.success(file.filename));
    }
});
