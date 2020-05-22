import { BeanSpec, JavaTypes } from '../spec';

class CrewSpec implements BeanSpec {
    table = 'F3003';

    view = 'V3003';

    name = 'CREW';

    fields = {
      cwid: {
        alias: 'CWID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '班组序号',
      },
      cwname: {
        alias: 'CWNAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 16,
        description: '班组名称',
      },
      cwan8: {
        alias: 'CWAN8',
        javaType: 'Integer' as JavaTypes,
        notNull: false,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: 'JDE地址号',
      },
      cwwcmcu: {
        alias: 'CWWCMCU',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 12,
        description: '工作中心编号',
      },
      cwwcdl01: {
        alias: 'CWWCDL01',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 30,
        description: '工作中心名称',
      },
    };

    uniques = [
      {
        items: [
          'cwid',
        ],
        key: true,
        seq: true,
      },
    ];
}

const CREW_SPEC = new CrewSpec();

export { CREW_SPEC };
