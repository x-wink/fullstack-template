import { RouteRecordName, RouteRecordRaw } from 'vue-router';
export interface PluginSetup {
    (context: AppContext): PluginDefine;
}
export interface PluginDefine {
    id: string;
}
export const definePlugin = (setup: PluginSetup) => {
    return setup;
};
export const HomePlugin = definePlugin((context) => {
    console.info(context);
    return {} as PluginDefine;
});

export type AppContext = ReturnType<typeof createApp>;
export const createApp = () => {
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
    const registRoute = (route: RouteRecordRaw) => {
        router.addRoute(route);
    };
    const unregistRoute = (name: RouteRecordName) => {
        router.removeRoute(name);
    };

    const context = {
        registRoute,
        unregistRoute,
        registPlugin,
    };
    return context;
};
const app = createApp();
app.registPlugin(HomePlugin);
