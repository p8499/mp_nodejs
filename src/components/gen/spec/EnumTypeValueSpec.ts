import { BeanSpec, JavaTypes } from '../spec';

class EnumTypeValueSpec implements BeanSpec {
    table = 'F0005';

    view = 'V0005';

    name = 'ENUMTYPEVALUE';

    fields = {
      evid: {
        alias: 'EVID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '枚举类型值序号',
      },
      evetid: {
        alias: 'EVETID',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 4,
        description: '枚举类型编号',
      },
      evval: {
        alias: 'EVVAL',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 1,
        lengthFraction: 0,
        min: -9,
        max: 9,
        description: '数值',
      },
      evdescription: {
        alias: 'EVDESCRIPTION',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 8,
        description: '数值涵义',
      },
      evetname: {
        alias: 'EVETNAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 8,
        description: '枚举类型名称',
      },
    };

    uniques = [
      {
        items: [
          'evid',
        ],
        key: true,
        seq: true,
      },
      {
        items: [
          'evetid',
          'evval',
        ],
        key: false,
        seq: false,
      },
    ];
}

const ENUMTYPEVALUE_SPEC = new EnumTypeValueSpec();

export { ENUMTYPEVALUE_SPEC };
