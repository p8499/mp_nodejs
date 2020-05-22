import { BeanSpec, JavaTypes } from '../spec';

class RoomSpec implements BeanSpec {
    table = 'F1200';

    view = 'V1200';

    name = 'ROOM';

    fields = {
      rmid: {
        alias: 'RMID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '机房序号',
      },
      rmserial: {
        alias: 'RMSERIAL',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 16,
        description: '机房短号',
      },
      rman8: {
        alias: 'RMAN8',
        javaType: 'Integer' as JavaTypes,
        notNull: false,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: 'JDE地址号',
      },
      rmname: {
        alias: 'RMNAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 16,
        description: '机房名称',
      },
      rmcwid: {
        alias: 'RMCWID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '班组序号',
      },
      rmcwname: {
        alias: 'RMCWNAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 16,
        description: '班组名称',
      },
      rmwcmcu: {
        alias: 'RMWCMCU',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 12,
        description: '工作中心编号',
      },
      rmwcdl01: {
        alias: 'RMWCDL01',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 30,
        description: '工作中心名称',
      },
    };

    uniques = [
      {
        items: [
          'rmid',
        ],
        key: true,
        seq: true,
      },
    ];
}

const ROOM_SPEC = new RoomSpec();

export { ROOM_SPEC };
