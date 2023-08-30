import { withInstall } from '../../utils';
import Popover from './popover.vue';
export const XPopover = withInstall(Popover);
export default XPopover;

export type PopoverInstance = InstanceType<typeof Popover>;
export * from './types';
