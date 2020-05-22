import { BeanSpec, JavaTypes } from '../spec';

class BranchSpec implements BeanSpec {
    table = 'F3001';

    view = 'V3001';

    name = 'BRANCH';

    fields = {
      bpmcu: {
        alias: 'BPMCU',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 12,
        description: '楼盘编号',
      },
      bpdl01: {
        alias: 'BPDL01',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 30,
        description: '楼盘名称',
      },
      bpwcmcu: {
        alias: 'BPWCMCU',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 12,
        description: '工作中心编号',
      },
      bpwcdl01: {
        alias: 'BPWCDL01',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 30,
        description: '工作中心名称',
      },
    };

    uniques = [
      {
        items: [
          'bpmcu',
        ],
        key: true,
        seq: false,
      },
    ];
}

const BRANCH_SPEC = new BranchSpec();

export { BRANCH_SPEC };
