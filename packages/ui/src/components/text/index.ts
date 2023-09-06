import { withInstall } from '../../utils';
import Text from './text.vue';
export const XText = withInstall(Text);
export default XText;

export type TextInstance = InstanceType<typeof Text>;
export * from './types';
