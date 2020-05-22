import { BeanSpec, JavaTypes } from '../spec';

class CrewUserSpec implements BeanSpec {
    table = 'F30031';

    view = 'V30031';

    name = 'CREWUSER';

    fields = {
      cuid: {
        alias: 'CUID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '序号',
      },
      cucwid: {
        alias: 'CUCWID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '班组序号',
      },
      cucwname: {
        alias: 'CUCWNAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 30,
        description: '班组名称',
      },
      cuwcmcu: {
        alias: 'CUWCMCU',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 12,
        description: '工作中心编号',
      },
      cuwcdl01: {
        alias: 'CUWCDL01',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 30,
        description: '工作中心名称',
      },
      cuusid: {
        alias: 'CUUSID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '用户序号',
      },
      cuusname: {
        alias: 'CUUSNAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 16,
        description: '用户姓名',
      },
    };

    uniques = [
      {
        items: [
          'cuid',
        ],
        key: true,
        seq: true,
      },
      {
        items: [
          'cucwid',
          'cuusid',
        ],
        key: false,
        seq: false,
      },
    ];
}

const CREWUSER_SPEC = new CrewUserSpec();

export { CREWUSER_SPEC };
