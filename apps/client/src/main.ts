import { createApp } from 'vue';

import App from './App.vue';
import router from './routes';

const app = createApp(App);

import winkUI from '@pkgs/ui';

app.use(router).use(winkUI).mount('#app');
