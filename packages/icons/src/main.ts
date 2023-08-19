export * from './icons';

import * as all from './icons';
export const icons = Object.keys(all);
export type IconNames = keyof typeof all;
