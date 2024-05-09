import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/flex.less';

const app = createApp(App);

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs';
app.use(ElementPlus, { locale: zhCn, size: 'default', zIndex: 3000 });

import { pinia } from '@pkgs/stores';
app.use(pinia);

import { router } from '@/routers';
app.use(router);

app.mount('#app');
