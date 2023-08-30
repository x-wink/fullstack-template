import { withInstall } from '../../utils';
import Popup from './popup.vue';
export const XPopup = withInstall(Popup);
export default XPopup;

export type PopupInstance = InstanceType<typeof Popup>;
export * from './types';
