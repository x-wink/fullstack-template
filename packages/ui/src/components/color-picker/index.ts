import { withInstall } from '../../utils';
import ColorPicker from './color-picker.vue';
export const XColorPicker = withInstall(ColorPicker);
export default XColorPicker;

export type ColorPickerInstance = InstanceType<typeof ColorPicker>;
export * from './types';
