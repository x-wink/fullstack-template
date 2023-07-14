import { createApp } from 'vue';

import 'vant/es/dialog/index.css';
import App from './App.vue';
import router from './routes';

const app = createApp(App);
app.use(router);

import * as UI from '@pkgs/ui';
Object.keys(UI).forEach((key) => {
    if (key.startsWith('X')) {
        const component = UI[key as keyof typeof UI] as Component;
        const name = component.name ?? key;
        // .replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
        // .replace(/^-/, '');
        app.component(name, component);
    }
});

app.mount('#app');
