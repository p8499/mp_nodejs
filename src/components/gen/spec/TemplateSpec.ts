import { BeanSpec, JavaTypes } from '../spec';

class TemplateSpec implements BeanSpec {
    table = 'F2001';

    view = 'V2001';

    name = 'TEMPLATE';

    fields = {
      ttid: {
        alias: 'TTID',
        javaType: 'Integer' as JavaTypes,
        notNull: true,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: '模板序号',
      },
      ttname: {
        alias: 'TTNAME',
        javaType: 'String' as JavaTypes,
        notNull: true,
        lengthString: 32,
        description: '模板名称',
      },
      tttype: {
        alias: 'TTTYPE',
        javaType: 'String' as JavaTypes,
        notNull: true,
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
      ttsize: {
        alias: 'TTSIZE',
        javaType: 'Integer' as JavaTypes,
        notNull: false,
        lengthInteger: 4,
        lengthFraction: 0,
        min: -9999,
        max: 9999,
        description: '规程数',
      },
    };

    uniques = [
      {
        items: [
          'ttid',
        ],
        key: true,
        seq: true,
      },
    ];
}

const TEMPLATE_SPEC = new TemplateSpec();

export { TEMPLATE_SPEC };
