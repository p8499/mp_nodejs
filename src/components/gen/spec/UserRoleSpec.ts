import { BeanSpec, JavaTypes } from '../spec';

class UserRoleSpec implements BeanSpec {
    table = 'F00921';

    view = 'V00921';

    name = 'USERROLE';

    fields = {
      urid: {
        alias: 'URID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '序号',
      },
      urusid: {
        alias: 'URUSID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '用户序号',
      },
      urroid: {
        alias: 'URROID',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 8,
        description: '角色编号',
      },
      urusname: {
        alias: 'URUSNAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 16,
        description: '用户姓名',
      },
      urroname: {
        alias: 'URRONAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 16,
        description: '角色名称',
      },
    };

    uniques = [
      {
        items: [
          'urid',
        ],
        key: true,
        seq: true,
      },
      {
        items: [
          'urusid',
          'urroid',
        ],
        key: false,
        seq: false,
      },
    ];
}

const USERROLE_SPEC = new UserRoleSpec();

export { USERROLE_SPEC };
