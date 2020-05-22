import { BeanSpec, JavaTypes } from '../spec';

class BuildingSpec implements BeanSpec {
    table = 'F3002';

    view = 'V3002';

    name = 'BUILDING';

    fields = {
      mcmcu: {
        alias: 'MCMCU',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 12,
        description: '建筑物编号',
      },
      mcdl01: {
        alias: 'MCDL01',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 30,
        description: '建筑物名称',
      },
      mcbpmcu: {
        alias: 'MCBPMCU',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 12,
        description: '楼盘编号',
      },
      mcbpdl01: {
        alias: 'MCBPDL01',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 30,
        description: '楼盘名称',
      },
      mcwcmcu: {
        alias: 'MCWCMCU',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 12,
        description: '工作中心编号',
      },
      mcwcdl01: {
        alias: 'MCWCDL01',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 30,
        description: '工作中心名称',
      },
    };

    uniques = [
      {
        items: [
          'mcmcu',
        ],
        key: true,
        seq: false,
      },
    ];
}

const BUILDING_SPEC = new BuildingSpec();

export { BUILDING_SPEC };
