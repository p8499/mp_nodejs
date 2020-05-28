import { BeanSpec, JavaTypes } from '../spec';

class TemplateProcedureSpec implements BeanSpec {
    table = 'F2002';

    view = 'V2002';

    name = 'TEMPLATEPROCEDURE';

    fields = {
      tpid: {
        alias: 'TPID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '规程序号',
      },
      tpttid: {
        alias: 'TPTTID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '模板序号',
      },
      tpseq: {
        alias: 'TPSEQ',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 4,
        lengthFraction: 0,
        min: -9999,
        max: 9999,
        description: '顺序',
      },
      tpdescription: {
        alias: 'TPDESCRIPTION',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 128,
        description: '规程描述',
      },
      tpphoto: {
        alias: 'TPPHOTO',
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
      tpttname: {
        alias: 'TPTTNAME',
        javaType: 'String' as JavaTypes,
        notNull: false,
        lengthString: 32,
        description: '模板名称',
      },
      tptttype: {
        alias: 'TPTTTYPE',
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
      tpsize: {
        alias: 'TPSIZE',
        javaType: 'Integer' as JavaTypes,
        notNull: false,
        lengthInteger: 2,
        lengthFraction: 0,
        min: -99,
        max: 99,
        description: '测量数',
      },
    };

    uniques = [
      {
        items: [
          'tpid',
        ],
        key: true,
        seq: true,
      },
      {
        items: [
          'tpttid',
          'tpseq',
        ],
        key: false,
        seq: false,
      },
    ];
}

const TEMPLATEPROCEDURE_SPEC = new TemplateProcedureSpec();

export { TEMPLATEPROCEDURE_SPEC };
