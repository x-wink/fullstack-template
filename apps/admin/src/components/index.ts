import type { DefineComponent } from 'vue';
import type { FormInstance, TableInstance } from 'element-plus';

import List from './list.vue';
export const CommonList = List;
// 泛型组件的实例类型有问题，只能手动定义了
export type CommonListInstance = InstanceType<DefineComponent> & {
    search: () => void;
    refsForm: FormInstance;
    refsTable: TableInstance;
};

import Form from './form.vue';
export const CommonForm = Form;
export type CommonFormInstance = InstanceType<DefineComponent> & {
    refsForm: FormInstance;
    load: () => Promise<void>;
    submit: () => Promise<void>;
};
