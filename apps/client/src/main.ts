import '@/styles/flex.less';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

import vant from 'vant';
import 'vant/lib/index.css';
app.use(vant);

import { pinia } from '@pkgs/stores';
app.use(pinia);

import { router } from '@/routers';
app.use(router);

app.mount('#app');
