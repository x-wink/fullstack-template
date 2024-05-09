import { BaseEntity } from '../../base';
import type { User } from '../system/user';
import type { PartialBy } from '@xwink/utils';

export const cleanTaskDefaults = () => ({});

export type CleanTaskData = PartialBy<CleanTask, ReturnType<typeof cleanTaskDefaults>>;
export class CleanTask extends BaseEntity {
    time!: Date;
    location!: string;
    userId!: number;
    user?: User;
    constructor(data?: Partial<CleanTask>) {
        super();
        Object.assign(this, data);
    }
}
