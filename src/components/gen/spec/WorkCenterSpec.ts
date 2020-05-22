import { BeanSpec, JavaTypes } from '../spec';

class WorkCenterSpec implements BeanSpec {
    table = 'F3000';

    view = 'V3000';

    name = 'WORKCENTER';

    fields = {
      wcmcu: {
        alias: 'WCMCU',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 12,
        description: '工作中心编号',
      },
      wcdl01: {
        alias: 'WCDL01',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 30,
        description: '工作中心名称',
      },
    };

    uniques = [
      {
        items: [
          'wcmcu',
        ],
        key: true,
        seq: false,
      },
    ];
}

const WORKCENTER_SPEC = new WorkCenterSpec();

export { WORKCENTER_SPEC };
