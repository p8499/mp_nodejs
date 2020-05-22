import { BeanSpec, JavaTypes } from '../spec';

class EquipmentSpec implements BeanSpec {
    table = 'F1201';

    view = 'V1201';

    name = 'EQUIPMENT';

    fields = {
      eqid: {
        alias: 'EQID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '设备序号',
      },
      eqserial: {
        alias: 'EQSERIAL',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 16,
        description: '设备短号',
      },
      eqnumb: {
        alias: 'EQNUMB',
        javaType: 'Integer' as JavaTypes,
        notNull: false,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: 'JDE资产号',
      },
      eqname: {
        alias: 'EQNAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 16,
        description: '设备名称',
      },
      eqcwid: {
        alias: 'EQCWID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '班组序号',
      },
      eqcwname: {
        alias: 'EQCWNAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 16,
        description: '班组名称',
      },
      eqwcmcu: {
        alias: 'EQWCMCU',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 12,
        description: '工作中心编号',
      },
      eqwcdl01: {
        alias: 'EQWCDL01',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 30,
        description: '工作中心名称',
      },
    };

    uniques = [
      {
        items: [
          'eqid',
        ],
        key: true,
        seq: true,
      },
    ];
}

const EQUIPMENT_SPEC = new EquipmentSpec();

export { EQUIPMENT_SPEC };
