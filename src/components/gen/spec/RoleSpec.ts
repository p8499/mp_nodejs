import { BeanSpec, JavaTypes } from '../spec';

class RoleSpec implements BeanSpec {
    table = 'F0094';

    view = 'V0094';

    name = 'ROLE';

    fields = {
      roid: {
        alias: 'ROID',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 4,
        description: '角色编号',
      },
      roname: {
        alias: 'RONAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 16,
        description: '角色名称',
      },
    };

    uniques = [
      {
        items: [
          'roid',
        ],
        key: true,
        seq: false,
      },
    ];
}

const ROLE_SPEC = new RoleSpec();

export { ROLE_SPEC };
