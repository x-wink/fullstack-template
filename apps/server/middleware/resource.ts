import express from 'express';
import { config } from '../utils';
const { dir } = config;
export const resourceHandler = [
    express.static(dir.static),
    express.static(dir.upload, {
        setHeaders: function (res) {
            res.set('Access-Control-Allow-Origin', '*');
        },
    }),
];
