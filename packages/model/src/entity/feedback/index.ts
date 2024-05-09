import { BaseEntity } from '../../base';
import type { PartialBy } from '@xwink/utils';
import type { User } from '../system';

export const feedbackDefaults = () => ({});

export type FeedbackData = PartialBy<Feedback, ReturnType<typeof feedbackDefaults>>;
export class Feedback extends BaseEntity {
    userId!: number;
    user?: User;
    title!: string;
    content!: string;
    constructor(data?: Partial<Feedback>) {
        super();
        Object.assign(this, data);
    }
}
