import { BeanSpec, JavaTypes } from '../spec';

class PrivilegeSpec implements BeanSpec {
    table = 'F0095';

    view = 'V0095';

    name = 'PRIVILEGE';

    fields = {
      prid: {
        alias: 'PRID',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 4,
        description: '权限编号',
      },
      prname: {
        alias: 'PRNAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 16,
        description: '权限名称',
      },
    };

    uniques = [
      {
        items: [
          'prid',
        ],
        key: true,
        seq: false,
      },
    ];
}

const PRIVILEGE_SPEC = new PrivilegeSpec();

export { PRIVILEGE_SPEC };
