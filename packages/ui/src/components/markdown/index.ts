import { withInstall } from '../../utils';
import Markdown from './markdown.vue';
export const XMarkdown = withInstall(Markdown);
export default XMarkdown;

export type MarkdownInstance = InstanceType<typeof Markdown>;
export * from './types';
