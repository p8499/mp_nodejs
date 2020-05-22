import { BeanSpec, JavaTypes } from '../spec';

class EnumTypeSpec implements BeanSpec {
    table = 'F0004';

    view = 'V0004';

    name = 'ENUMTYPE';

    fields = {
      etid: {
        alias: 'ETID',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 4,
        description: '枚举类型编号',
      },
      etname: {
        alias: 'ETNAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 8,
        description: '枚举类型名称',
      },
    };

    uniques = [
      {
        items: [
          'etid',
        ],
        key: true,
        seq: false,
      },
    ];
}

const ENUMTYPE_SPEC = new EnumTypeSpec();

export { ENUMTYPE_SPEC };
