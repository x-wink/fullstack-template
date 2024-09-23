import type { Menu } from '@pkgs/model';
import { MenuType } from '@pkgs/model';
import { baseColumnDefines, registRepository } from '../../dao';
import type { SelectOptions } from '@xwink/dao';
import { ColumnType } from '@xwink/dao';
import type { UnknownRequest } from '../../utils';
import { useSession } from '../../utils';
import { getUser } from './user';
import { searchRolePermissions } from './role';
import { unique } from '@xwink/utils';
const { detail, select, create, update, remove } = registRepository<Menu>({
    name: 't_menu',
    columnDefines: [
        ...baseColumnDefines,
        {
            name: 'parentId',
            type: ColumnType.INT,
        },
        {
            name: 'permission',
            type: ColumnType.STRING,
            length: 64,
            required: true,
        },
        {
            name: 'label',
            type: ColumnType.STRING,
            length: 20,
            required: true,
        },
        {
            name: 'sort',
            type: ColumnType.INT,
            defaultValue: '0',
            required: true,
        },
        {
            name: 'url',
            type: ColumnType.STRING,
            length: 255,
        },
        {
            name: 'visible',
            type: ColumnType.BOOLEAN,
            defaultValue: '0',
            required: true,
        },
        {
            name: 'type',
            type: ColumnType.INT,
            defaultValue: String(MenuType.ROUTE),
            required: true,
        },
    ],
});
const ownedMenus = async (req: UnknownRequest) => {
    const session = useSession(req);
    let user = session.getUser();
    if (user) {
        user = await getUser(user.id!);
        if (user?.id === 1) {
            return void 0;
        }
        const all = (await Promise.all(user?.roles.map((roleId) => searchRolePermissions(roleId)) ?? [])).flat();
        return unique(all);
    }
    return [];
};
export const getMenu = async (id: number, req: UnknownRequest) => {
    const owned = await ownedMenus(req);
    return !owned || owned?.includes(id) ? await detail(id) : void 0;
};
export const searchMenu = async (req: UnknownRequest, options?: Partial<SelectOptions>) => {
    const owned = await ownedMenus(req);
    const { where = {}, ...rest } = options ?? {};
    (where as Record<string, unknown>).id = owned;
    options = { where, ...rest };
    return !owned || owned.length ? await select(options) : [];
};
export const createMenu = create;
export const updateMenu = update;
export const removeMenu = remove;
