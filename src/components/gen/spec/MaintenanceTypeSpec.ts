import { BeanSpec, JavaTypes } from '../spec';

class MaintenanceTypeSpec implements BeanSpec {
    table = 'F1701';

    view = 'V1701';

    name = 'MAINTENANCETYPE';

    fields = {
      mtid: {
        alias: 'MTID',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 4,
        description: '维保类型编号',
      },
      mtname: {
        alias: 'MTNAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 8,
        description: '维保类型名称',
      },
    };

    uniques = [
      {
        items: [
          'mtid',
        ],
        key: true,
        seq: false,
      },
    ];
}

const MAINTENANCETYPE_SPEC = new MaintenanceTypeSpec();

export { MAINTENANCETYPE_SPEC };
