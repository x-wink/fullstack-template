import { RGBA } from '../../utils';

export type ColorPickerFormat = 'hex' | 'rgba' | ((val: RGBA) => string);
