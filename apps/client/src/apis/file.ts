import { post } from './request';
export const uploadFile = (file: File) => {
    const data = new FormData();
    data.append('id', JSON.parse(localStorage.getItem('user') || '{}').id || '0');
    data.append('file', file);
    return post<string>('/file/upload', data);
};
