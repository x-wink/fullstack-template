import type { Role } from '@pkgs/model';
import { useSession, type UnknownRequest } from '../../utils';
import { RoleMenuRelation } from '@pkgs/model';
import { baseColumnDefines, beginTransaction, commit, registRepository } from '../../dao';
import type { SelectOptions } from '@xwink/dao';
import { ColumnType } from '@xwink/dao';
import { getUser } from './user';
const { detail, select, create, update, remove } = registRepository<Role>(
    {
        name: 't_role',
        columnDefines: [
            ...baseColumnDefines,
            {
                name: 'name',
                type: ColumnType.STRING,
                length: 20,
                required: true,
            },
            {
                name: 'code',
                type: ColumnType.STRING,
                length: 20,
                required: true,
            },
            {
                name: 'enabled',
                type: ColumnType.BOOLEAN,
                defaultValue: '0',
                required: true,
            },
        ],
    },
    {
        ignores: ['permissions'],
    }
);
const ownedRoles = async (req: UnknownRequest) => {
    const session = useSession(req);
    let user = session.getUser();
    if (user) {
        user = await getUser(user.id!);
        return user?.id === 1 ? void 0 : user?.roles;
    }
    return [];
};
export const getRole = async (id: number, req: UnknownRequest) => {
    const owned = await ownedRoles(req);
    if (!owned || owned?.includes(id)) {
        const entity = await detail(id);
        if (entity) {
            entity.permissions = await searchRolePermissions(id);
        }
        return entity;
    }
    return void 0;
};
export const searchRole = async (req: UnknownRequest, options?: Partial<SelectOptions>) => {
    const owned = await ownedRoles(req);
    const { where = {}, ...rest } = options ?? {};
    (where as Record<string, unknown>).id = owned;
    options = { where, ...rest };
    return !owned || owned.length ? await select(options) : [];
};
export const createRole = async (entity: Role) => {
    const id = await create([entity]);
    await createRolePermissions(id, entity.permissions);
    return id;
};
export const updateRole = async (entity: Role) => {
    beginTransaction();
    const count = await update(entity);
    await deleteRolePermissions(entity.id!);
    await createRolePermissions(entity.id!, entity.permissions);
    commit();
    return count;
};
export const removeRole = remove;

const relRepo = registRepository<RoleMenuRelation>({
    name: 'r_role_menu',
    isRelationTable: true,
    columnDefines: [
        {
            name: 'roleId',
            type: ColumnType.INT,
            primary: true,
            required: true,
        },
        {
            name: 'menuId',
            type: ColumnType.INT,
            primary: true,
            required: true,
        },
    ],
});
export const deleteRolePermissions = (id: number) => {
    return relRepo.deletion([id], 'roleId');
};
export const createRolePermissions = async (id: number, permissions: number[]) => {
    return permissions.length
        ? await relRepo.create(permissions.map((menuId) => new RoleMenuRelation({ roleId: id, menuId })))
        : 0;
};
export const searchRolePermissions = async (id: number) => {
    return (await relRepo.select({ where: { roleId: id } })).map((item) => item.menuId);
};
