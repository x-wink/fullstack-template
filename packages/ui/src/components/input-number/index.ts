import { withInstall } from '../../utils';
import InputNumber from './input-number.vue';
export const XInputNumber = withInstall(InputNumber);
export default XInputNumber;

export type InputNumberInstance = InstanceType<typeof InputNumber>;
export * from './types';
