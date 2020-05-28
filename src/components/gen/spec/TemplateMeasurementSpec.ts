import { BeanSpec, JavaTypes } from '../spec';

class TemplateMeasurementSpec implements BeanSpec {
    table = 'F2003';

    view = 'V2003';

    name = 'TEMPLATEMEASUREMENT';

    fields = {
      tsid: {
        alias: 'TSID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '测量序号',
      },
      tstpid: {
        alias: 'TSTPID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '规程序号',
      },
      tsseq: {
        alias: 'TSSEQ',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 2,
        lengthFraction: 0,
        min: -99,
        max: 99,
        description: '排序',
      },
      tsname: {
        alias: 'TSNAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 12,
        description: '测量名称',
      },
      tsetid: {
        alias: 'TSETID',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 4,
        description: '枚举类型编号',
      },
      tsmin: {
        alias: 'TSMIN',
        javaType: 'Double' as JavaTypes,
        notNull: false,
        lengthInteger: 8,
        lengthFraction: 4,
        min: -99999999.9999,
        max: 99999999.9999,
        description: '最小值',
      },
      tsmax: {
        alias: 'TSMAX',
        javaType: 'Double' as JavaTypes,
        notNull: false,
        lengthInteger: 8,
        lengthFraction: 4,
        min: -99999999.9999,
        max: 99999999.9999,
        description: '最大值',
      },
      tsunit: {
        alias: 'TSUNIT',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 4,
        description: '单位',
      },
      tsphoto: {
        alias: 'TSPHOTO',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        values: {
          OPTIONAL: {
            value: 0,
            code: 'OPTIONAL',
            label: '可选',
          },
          REQUIRED: {
            value: 1,
            code: 'REQUIRED',
            label: '必须',
          },
        },
        getLabel(value: number | string | Date): string | null {
          switch (value) {
            case 0:
              return '可选';
            case 1:
              return '必须';
            default:
              return null;
          }
        },
        default: 0,
        lengthInteger: 1,
        lengthFraction: 0,
        min: -9,
        max: 9,
        description: '照片必须性',
      },
      tsttid: {
        alias: 'TSTTID',
        javaType: 'Integer' as JavaTypes,
        notNull: false,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '模板序号',
      },
      tsttname: {
        alias: 'TSTTNAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 32,
        description: '模板名称',
      },
      tstttype: {
        alias: 'TSTTTYPE',
        javaType: 'String' as JavaTypes,
        notNull: false,
        values: {
          ROOM: {
            value: 'R',
            code: 'ROOM',
            label: '机房巡视模板',
          },
          EQUIPMENT: {
            value: 'E',
            code: 'EQUIPMENT',
            label: '设备维保模板',
          },
        },
        getLabel(value: number | string | Date): string | null {
          switch (value) {
            case 'R':
              return '机房巡视模板';
            case 'E':
              return '设备维保模板';
            default:
              return null;
          }
        },
        lengthString: 1,
        description: '模板类型',
      },
      tstpseq: {
        alias: 'TSTPSEQ',
        javaType: 'Integer' as JavaTypes,
        notNull: false,
        lengthInteger: 4,
        lengthFraction: 0,
        min: -9999,
        max: 9999,
        description: '规程排序',
      },
      tstpdescription: {
        alias: 'TSTPDESCRIPTION',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 128,
        description: '规程描述',
      },
      tstpphoto: {
        alias: 'TSTPPHOTO',
        javaType: 'Integer' as JavaTypes,
        notNull: false,
        values: {
          OPTIONAL: {
            value: 0,
            code: 'OPTIONAL',
            label: '可选',
          },
          REQUIRED: {
            value: 1,
            code: 'REQUIRED',
            label: '必须',
          },
        },
        getLabel(value: number | string | Date): string | null {
          switch (value) {
            case 0:
              return '可选';
            case 1:
              return '必须';
            default:
              return null;
          }
        },
        lengthInteger: 1,
        lengthFraction: 0,
        min: -9,
        max: 9,
        description: '规程照片可选性',
      },
    };

    uniques = [
      {
        items: [
          'tsid',
        ],
        key: true,
        seq: true,
      },
      {
        items: [
          'tstpid',
          'tsseq',
        ],
        key: false,
        seq: false,
      },
    ];
}

const TEMPLATEMEASUREMENT_SPEC = new TemplateMeasurementSpec();

export { TEMPLATEMEASUREMENT_SPEC };
