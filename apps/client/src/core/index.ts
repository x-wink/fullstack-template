import { createSharedComposable } from '@pkgs/lib';
import { Component } from 'vue';
export interface PluginSetup {
    (context: AppContext): PluginDefine;
}
export interface PluginDefine {
    id: string;
}
export const definePlugin = (setup: PluginSetup) => {
    return setup;
};

export type AppContext = ReturnType<typeof createApp>;
export type PluginComponent = Component | (() => Promise<Component>);
export interface View {
    name: string;
    route: string;
    $main: PluginComponent;
    $aside?: PluginComponent;
}
export interface Module {
    name?: string;
    title?: string;
    icon?: string;
    route?: string;
    link?: boolean;
}

const createApp = () => {
    const plugins: PluginDefine[] = [];
    const registPlugin = (setup: PluginSetup) => {
        const plugin = setup(context);
        const p = plugins.find((item) => item.id === plugin.id);
        if (p) {
            console.warn('插件已存在：' + p.id);
        } else {
            plugins.push(plugin);
        }
    };

    const router = useRouter();
    const registView = (view: View) => {
        if (router.getRoutes().find((item) => item.name === view.name)) {
            throw new Error('视图已存在：' + view.name);
        }
        router.addRoute(
            view.$aside
                ? {
                      name: view.name,
                      path: view.route,
                      components: {
                          default: view.$main,
                          aside: view.$aside,
                      },
                  }
                : { name: view.name, path: view.route, component: view.$main }
        );
    };

    const modules: Module[] = [];
    const registModule = (module: Module) => {
        if (modules.find((item) => item.name === module.name)) {
            throw new Error('模块已存在：' + module.name);
        }
        modules.push(module);
    };

    const context = {
        plugins,
        registPlugin,
        router,
        registView,
        modules,
        registModule,
    };
    return context;
};
export const useApp = createSharedComposable(() => {
    return createApp();
});
