import { BeanSpec, JavaTypes } from '../spec';

class UserSpec implements BeanSpec {
    table = 'F0092';

    view = 'V0092';

    name = 'USER';

    fields = {
      usid: {
        alias: 'USID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '用户序号',
      },
      usan8: {
        alias: 'USAN8',
        javaType: 'Integer' as JavaTypes,
        notNull: false,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: 'JDE地址号',
      },
      uscell: {
        alias: 'USCELL',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 11,
        description: '手机号',
      },
      usmail: {
        alias: 'USMAIL',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 32,
        description: '电子邮箱',
      },
      usname: {
        alias: 'USNAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 16,
        description: '姓名',
      },
      uspswd: {
        alias: 'USPSWD',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 32,
        description: '密码',
      },
      usstatus: {
        alias: 'USSTATUS',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        values: {
          ACTIVE: {
            value: 0,
            code: 'ACTIVE',
            label: '活动的',
          },
          LOCKED: {
            value: 1,
            code: 'LOCKED',
            label: '锁定的',
          },
        },
        getLabel(value: number | string | Date): string | null {
          switch (value) {
            case 0:
              return '活动的';
            case 1:
              return '锁定的';
            default:
              return null;
          }
        },
        default: 0,
        lengthInteger: 1,
        lengthFraction: 0,
        min: -9,
        max: 9,
        description: '状态',
      },
    };

    uniques = [
      {
        items: [
          'usid',
        ],
        key: true,
        seq: true,
      },
      {
        items: [
          'usan8',
        ],
        key: false,
        seq: false,
      },
      {
        items: [
          'uscell',
        ],
        key: false,
        seq: false,
      },
      {
        items: [
          'usmail',
        ],
        key: false,
        seq: false,
      },
    ];
}

const USER_SPEC = new UserSpec();

export { USER_SPEC };
