import express from 'express';
import { config } from '../config';
const { staticDir, uploadDir } = config;
export const resourceHandler = [
    express.static(staticDir),
    express.static(uploadDir, {
        setHeaders: function (res) {
            res.set('Access-Control-Allow-Origin', '*');
        },
    }),
];
