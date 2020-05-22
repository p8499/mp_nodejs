import { BeanSpec, JavaTypes } from '../spec';

class RolePrivilegeSpec implements BeanSpec {
    table = 'F00941';

    view = 'V00941';

    name = 'ROLEPRIVILEGE';

    fields = {
      rpid: {
        alias: 'RPID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '序号',
      },
      rproid: {
        alias: 'RPROID',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 4,
        description: '角色编号',
      },
      rpprid: {
        alias: 'RPPRID',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 4,
        description: '权限编号',
      },
      rproname: {
        alias: 'RPRONAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 16,
        description: '角色名称',
      },
      rpprname: {
        alias: 'RPPRNAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 16,
        description: '权限名称',
      },
    };

    uniques = [
      {
        items: [
          'rpid',
        ],
        key: true,
        seq: true,
      },
      {
        items: [
          'rproid',
          'rpprid',
        ],
        key: false,
        seq: false,
      },
    ];
}

const ROLEPRIVILEGE_SPEC = new RolePrivilegeSpec();

export { ROLEPRIVILEGE_SPEC };
