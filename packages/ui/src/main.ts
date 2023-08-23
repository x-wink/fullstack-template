import './styles/index.less';
export * from './components';
export * from './utils';
export * from '@pkgs/icons';

import * as components from './components';
import { App, DefineComponent } from 'vue';
export const install = (app: App) => {
    Object.entries(components).forEach(([name, sfc]) => {
        app.component((sfc as unknown as DefineComponent).name ?? name, sfc);
    });
};
export default install;
