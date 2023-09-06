import { withInstall } from '../../utils';
import Scrollbar from './scrollbar.vue';
export const XScrollbar = withInstall(Scrollbar);
export default XScrollbar;

export type ScrollbarInstance = InstanceType<typeof Scrollbar>;
export * from './types';
