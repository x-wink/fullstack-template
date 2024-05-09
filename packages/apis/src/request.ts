/* eslint-disable no-console */
import type { Res } from '@pkgs/model';
import { useUserStore } from '@pkgs/stores';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
});
instance.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        config.params = Object.fromEntries(
            Object.entries(config.params || {}).filter(
                (entry) =>
                    entry[1] !== null &&
                    typeof entry[1] !== 'undefined' &&
                    (typeof entry[1] !== 'string' || entry[1].trim() !== '')
            )
        );
        config.headers.authorization = userStore.token;
        if (
            config.data &&
            (config.headers as Record<string, unknown>)['Content-Type'] ===
                'application/x-www-form-urlencoded;charset=UTF-8'
        ) {
            config.data = qs.stringify(config.data, { allowDots: true, arrayFormat: 'indices' });
        }
        if (config.data instanceof FormData) {
            (config.headers as Record<string, unknown>)['Content-Type'] = 'multipart/form-data';
        }
        return config;
    },
    (error) => Promise.reject(error)
);

import { ElMessage } from 'element-plus';
import { showToast } from 'vant';
const showError = import.meta.env.VITE_BASE_URL.indexOf('admin') === -1 ? showToast : ElMessage.error;
instance.interceptors.response.use(
    (response) => {
        const userStore = useUserStore();
        const code = response.data?.code || response.status;
        console.info('[api]', code, response.config.method, response.config.url, response.data?.data);
        if (code !== 200) {
            switch (code) {
                case 403:
                    userStore.signout();
                    break;
                default:
                    break;
            }
            showError(response.data?.message || '服务器异常');
            response.data = undefined;
        }
        return response.data;
    },
    (error) => {
        showError('网络请求失败');
        console.error(error);
        return void 0;
    }
);
export const request = async <ResData, ReqBody = unknown>(
    config: AxiosRequestConfig<ReqBody>
): Promise<ResData | undefined> => {
    const res = await instance.request<Res<ResData>, AxiosResponse<ResData> | undefined, ReqBody>(config);
    return res?.data;
};
export const get = <ResData>(url: string, params?: unknown, config?: AxiosRequestConfig<never>) =>
    request<ResData, never>({
        method: 'get',
        url,
        params,
        ...config,
    });
export const post = <ResData, ReqBody = unknown>(url: string, data?: ReqBody, config?: AxiosRequestConfig<ReqBody>) =>
    request<ResData, ReqBody>({
        method: 'post',
        url,
        data,
        ...config,
    });
export const put = <ResData, ReqBody = unknown>(url: string, data?: ReqBody, config?: AxiosRequestConfig<ReqBody>) =>
    request<ResData, ReqBody>({
        method: 'put',
        url,
        data,
        ...config,
    });
export const del = <ResData>(url: string, params?: unknown, config?: AxiosRequestConfig<never>) =>
    request<ResData, never>({
        method: 'delete',
        url,
        params,
        ...config,
    });
