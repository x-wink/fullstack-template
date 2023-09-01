import { withInstall } from '../../utils';
import Input from './input.vue';
export const XInput = withInstall(Input);
export default XInput;

export type InputInstance = InstanceType<typeof Input>;
export * from './types';
