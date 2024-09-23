import { type PSignin, Student, User, UserType, UserStatus, UserRoleRelation, ID, DelStatus, Page } from '@pkgs/model';
import { baseColumnDefines, beginTransaction, commit, registRepository, rollback } from '../../dao';
import { ColumnType, OrderByDirection, QueryBuilder } from '@xwink/dao';
import { encode, getUserInfo } from '../../utils';
const { query, get, detail, select, create, update, remove } = registRepository<User>(
    {
        name: 't_user',
        columnDefines: [
            ...baseColumnDefines,
            {
                name: 'username',
                type: ColumnType.STRING,
                length: 20,
                required: true,
            },
            {
                name: 'password',
                type: ColumnType.STRING,
                length: 20,
            },
            {
                name: 'phone',
                type: ColumnType.STRING,
                length: 20,
                required: false,
            },
            {
                name: 'avatar',
                type: ColumnType.STRING,
            },
            {
                name: 'leader',
                type: ColumnType.STRING,
                length: 10,
            },
            {
                name: 'location',
                type: ColumnType.STRING,
                length: 10,
            },
            {
                name: 'isVip',
                type: ColumnType.BOOLEAN,
            },
            {
                name: 'status',
                type: ColumnType.INT,
            },
            {
                name: 'type',
                type: ColumnType.INT,
            },
            {
                name: 'enabled',
                type: ColumnType.BOOLEAN,
                defaultValue: '0',
                required: true,
            },
            {
                name: 'openid',
                type: ColumnType.STRING,
                length: 30,
            },
            {
                name: 'nickname',
                type: ColumnType.STRING,
                length: 30,
            },
            {
                name: 'sex',
                type: ColumnType.INT,
            },
            {
                name: 'realname',
                type: ColumnType.STRING,
                length: 10,
            },
        ],
    },
    {
        ignores: ['roles', 'code'],
    }
);
export const getUser = async (id: number) => {
    const entity = await detail(id);
    if (entity) {
        entity.roles = await searchUserRoles(id);
    }
    return entity;
};
export const searchUser = select;
export const pageUser = async (pageIndex: number, pageSize: number, condition: User) => {
    const builder = new QueryBuilder()
        .select('count(1) as count')
        .from('t_user')
        .equal('del_flag', DelStatus.NORMAL)
        .like('username', condition.username, () => !!condition.username)
        .like('realname', condition.realname, () => !!condition.realname)
        .like('leader', condition.leader, () => !!condition.leader)
        .like('phone', condition.phone, () => !!condition.phone)
        .equal('type', condition.type, () => typeof condition.type !== 'undefined')
        .equal('location', condition.location, () => !!condition.location)
        .equal('status', condition.status, () => !!condition.status)
        .equal('enabled', condition.enabled, () => typeof condition.enabled !== 'undefined')
        .orderBy('create_time', OrderByDirection.DESC);
    const [{ count: total }] = await query<{ count: number }>(builder);
    builder.selectBuilder.children = [];
    builder
        .select(
            'id',
            'username',
            'realname',
            'phone',
            'leader',
            'location',
            'type',
            'status',
            'enabled',
            'createTime',
            'isVip'
        )
        .page(pageIndex, pageSize);
    const list = await query<User>(builder);
    return new Page<User>({
        total,
        list,
        pageIndex,
        pageSize,
    });
};
export const createUser = async (entity: User) => {
    const id = await create([entity]);
    await createUserRoles(id, entity.roles);
    return id;
};
export const updateUser = async (entity: User) => {
    if (!entity.password) {
        const data = await getUser(entity.id!);
        entity.password = data!.password;
    }
    const count = await update(entity);
    await deleteUserRoles(entity.id!);
    await createUserRoles(entity.id!, entity.roles);
    return count;
};
export const removeUser = remove;

export const signin = async (data: PSignin) => {
    const entity = await get({ where: { ...data, enabled: true } });
    if (entity) {
        // await createLog([new Log({ ...logDefaults(), userId: entity.id! })]);
        return await encode({ ...entity });
    }
};

export const signup = async (data: Student) => {
    let entity = await get({
        where: { username: data.username, type: UserType.STUDENT, status: [UserStatus.APPROVAL, UserStatus.ACCEPT] },
    });
    if (entity) {
        throw new Error('学号已被注册');
    }
    if (data.code) {
        const userInfo = await getUserInfo(data.code);
        data.avatar = userInfo.headimgurl;
        data.openid = userInfo.openid;
        data.nickname = userInfo.nickname;
        data.sex = userInfo.sex;
    } else {
        delete data.code;
    }
    entity = await get({
        where: { username: data.username },
    });
    data.type = UserType.STUDENT;
    data.status = UserStatus.APPROVAL;
    if (entity) {
        Object.assign(entity, data);
        await update(entity);
        return entity[ID];
    }
    return await create([new User(data)]);
};

export const approvalSignup = async (id: number, status: UserStatus) => {
    let res = false;
    try {
        beginTransaction();
        const entity = new Student(await detail(id));
        if (entity) {
            res = await update(new User({ id, status }));
            entity.status = status;
        }
        commit();
    } catch (e) {
        rollback();
        throw e;
    }
    return res;
};

const relRepo = registRepository<UserRoleRelation>({
    name: 'r_user_role',
    isRelationTable: true,
    columnDefines: [
        {
            name: 'userId',
            type: ColumnType.INT,
            primary: true,
            required: true,
        },
        {
            name: 'roleId',
            type: ColumnType.INT,
            primary: true,
            required: true,
        },
    ],
});
export const deleteUserRoles = (id: number) => {
    return relRepo.deletion([id], 'userId');
};
export const createUserRoles = async (id: number, roles: number[]) => {
    return roles.length ? await relRepo.create(roles.map((roleId) => new UserRoleRelation({ userId: id, roleId }))) : 0;
};
export const searchUserRoles = async (id: number) => {
    return (await relRepo.select({ where: { userId: id } })).map((item) => item.roleId);
};
