import { createUser, detailUser, updateUser, type User } from '@/apis/user';
import router from '@/routes';
let user: User | undefined;
export const getUser = async (): Promise<User> => {
    if (!user) {
        const localUser = JSON.parse(localStorage.getItem('user') || 'null') as User | null;
        if (localUser) {
            user = await detailUser(localUser.id!);
        }
        if (!user) {
            user = {};
            user.id = await createUser(user);
        }
        setUser(user, false);
    }
    return user;
};
export const setUser = async (user: User, api = true) => {
    if (api) {
        await updateUser(user);
    }
    localStorage.setItem('user', JSON.stringify(user));
};
export const doSignout = async () => {
    localStorage.clear();
    await router.replace({ name: 'Home' });
    showAlert('您的身份信息已失效');
};

import { showConfirmDialog, showDialog } from 'vant';
export const showAlert = (message: string) => {
    return showDialog({ message });
};
export const showConfirm = (message: string) => {
    return showConfirmDialog({ message });
};

import mitt from 'mitt';
export const eventBus = mitt();

export const loadAssets = (file: string) => {
    return new URL(`../assets/${file}`, import.meta.url).href;
};

export const loadImage = (src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = async () => {
            resolve(image);
        };
        image.onerror = () => {
            reject('加载照片失败');
        };
        image.crossOrigin = 'anonymous';
        image.src = src;
    });
};
export const blob2base64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
export const base642Blob = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(','),
        mime = arr[0]?.match(/:(.*?);/)?.[1],
        bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};
export const compressImage = (file: File, targetSize = -1, targetLength = -1): Promise<string> => {
    return new Promise((resolve, reject) => {
        const { type: fileType, size } = file;
        if (fileType.indexOf('image') === -1) {
            reject('图片格式错误');
        } else {
            if (targetSize === -1 || targetSize >= size) {
                console.info('skip compress, size:', size);
                blob2base64(file).then(resolve, reject);
            } else {
                blob2base64(file).then(async (base64) => {
                    const image = await loadImage(base64);
                    const { width: w, height: h } = image;
                    if (w > targetLength || h > targetLength || size > targetSize) {
                        let scale = targetLength / Math.max(w, h);
                        if (scale >= 1) {
                            scale = size / targetSize;
                        }
                        const cvs = document.createElement('canvas');
                        const ctx = cvs.getContext('2d')!;
                        cvs.width = targetLength === -1 ? w : w * scale;
                        cvs.height = targetLength === -1 ? h : h * scale;
                        ctx.drawImage(image, 0, 0, w, h, 0, 0, cvs.width, cvs.height);
                        const res = cvs.toDataURL(fileType);
                        const info: any = {
                            originSize: size / 1024 / 1024,
                            originWidth: w,
                            originHeight: h,
                            targetWidth: cvs.width,
                            targetHeight: cvs.height,
                            targetSize: targetSize / 1024 / 1024,
                            scale,
                            resultSize: res.length / 1024 / 1024,
                        };
                        console.info(info);
                        if (res.length > targetSize) {
                            compressImage(file, targetSize, (targetLength * targetSize) / res.length).then(
                                resolve,
                                reject
                            );
                        } else {
                            resolve(res);
                        }
                    } else {
                        console.info(`skip compress, width:${w}, height:${h}, size:${size}`);
                        blob2base64(file).then(resolve, reject);
                    }
                }, reject);
            }
        }
    });
};
