import cron from 'node-cron';
import { useLogger } from '../utils';
const logger = useLogger("`tasks");
export const tasks = [];
export const setupTasks = () => {
    tasks.forEach((task) => {
        cron.schedule(task.cron, task.handler);
        logger.info('create task: ' + task.name);
    });
    cron.getTasks().forEach((task) => {
        task.start();
    });
};

export const clearTasks = () => {
    cron.getTasks().forEach((task) => {
        task.stop();
    });
    cron.getTasks().clear();
};
