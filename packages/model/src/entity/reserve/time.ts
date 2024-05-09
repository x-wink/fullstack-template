import { BaseEntity } from '../../base';
import type { PartialBy } from '@xwink/utils';

export const timeDefaults = () => ({
    enabled: false,
});

export type TimeData = PartialBy<Time, ReturnType<typeof timeDefaults>>;
export class Time extends BaseEntity {
    start!: Date;
    end!: Date;
    enabled!: boolean;
    constructor(data?: Partial<Time>) {
        super();
        Object.assign(this, data);
    }
}

export interface PStatusTime {
    id: number;
    enabled: boolean;
}
