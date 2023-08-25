import './styles/index.less';
export * from './components';
export * from './utils';
export * from '@pkgs/icons';

import * as components from './components';
import { App, DefineComponent, Plugin } from 'vue';
import { SFCWithInstall } from './utils';
import { version } from '../package.json';
export const WinkUI = {
    version,
    install: (app: App) => {
        Object.values(components).forEach((sfc) => {
            (sfc as SFCWithInstall<DefineComponent>).install?.(app);
        });
    },
} as Plugin;
export default WinkUI;
