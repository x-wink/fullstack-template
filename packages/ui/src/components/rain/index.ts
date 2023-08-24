import { withInstall } from '../../utils';
import Rain from './rain.vue';
export const XRain = withInstall(Rain);
export default XRain;

export type RainInstance = InstanceType<typeof Rain>;
export * from './types';
