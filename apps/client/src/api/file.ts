import { post } from './request';
export const uploadFile = (file: File) => {
    const data = new FormData();
    data.append('file', file);
    return post<string>('/file/upload', data);
};
