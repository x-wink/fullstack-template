import { BaseEntity } from '../../base';
import type { PartialBy } from '@xwink/utils';

export const logDefaults = () => ({
    module: LogModule.SYSTEM,
    action: LogAction.LOGIN,
});

export type LogData = PartialBy<Log, ReturnType<typeof logDefaults>>;

export enum LogModule {
    SYSTEM = 'system',
}

export enum LogAction {
    LOGIN = 'login',
}

export class Log extends BaseEntity {
    userId!: number;
    dataId?: number;
    module!: LogModule;
    action!: LogAction;
    constructor(data?: Partial<Log>) {
        super();
        Object.assign(this, data);
    }
}
