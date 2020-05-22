import { BeanSpec, JavaTypes } from '../spec';

class InspectionTypeSpec implements BeanSpec {
    table = 'F1700';

    view = 'V1700';

    name = 'INSPECTIONTYPE';

    fields = {
      itid: {
        alias: 'ITID',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 4,
        description: '巡视类型编号',
      },
      itname: {
        alias: 'ITNAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 8,
        description: '巡视类型名称',
      },
    };

    uniques = [
      {
        items: [
          'itid',
        ],
        key: true,
        seq: false,
      },
    ];
}

const INSPECTIONTYPE_SPEC = new InspectionTypeSpec();

export { INSPECTIONTYPE_SPEC };
