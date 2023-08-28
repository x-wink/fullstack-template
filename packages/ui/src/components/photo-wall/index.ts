import { withInstall } from '../../utils';
import PhotoWall from './photo-wall.vue';
export const XPhotoWall = withInstall(PhotoWall);
export default XPhotoWall;

export type PhotoWallInstance = InstanceType<typeof PhotoWall>;
export * from './types';
