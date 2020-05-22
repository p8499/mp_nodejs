import { INSPECTIONTYPE_SPEC } from '../spec/InspectionTypeSpec';
import { InspectionTypeMask } from '../mask/InspectionTypeMask';
import { Bean } from '../bean';


class InspectionType implements Bean {
  constructor(public itid: string|null = null, public itname: string|null = null) {
  }

  equals(target: InspectionType, mask: InspectionTypeMask = new InspectionTypeMask(true, true)): boolean {
    return !(mask.getItid() && !((this.itid === null && target.itid === null) || (this.itid !== null && target.itid !== null && this.itid === target.itid))) && !(mask.getItname() && !((this.itname === null && target.itname === null) || (this.itname !== null && target.itname !== null && this.itname === target.itname)));
  }

  copy(target: InspectionType = new InspectionType(), mask: InspectionTypeMask = new InspectionTypeMask(true, true)): InspectionType {
    if (mask.getItid()) { target.itid = this.itid; }
    if (mask.getItname()) { target.itname = this.itname; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.itid !== null) { texts.push(`"itid":"${this.itid}"`); }
    if (this.itname !== null) { texts.push(`"itname":"${this.itname}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeInspectionType(str: string): InspectionType {
  try {
    const obj = JSON.parse(str);
    return new InspectionType(
      'itid' in obj ? obj.itid : null,
      'itname' in obj ? obj.itname : null,
    );
  } catch {
    throw Error('Error deserializing InspectionType');
  }
}

function deserializeInspectionTypeList(str: string): Array<InspectionType> {
  try {
    return JSON.parse(str).map((obj: any) => new InspectionType(
      'itid' in obj ? obj.itid : null,
      'itname' in obj ? obj.itname : null,
    ));
  } catch {
    throw Error('Error deserializing InspectionTypeList');
  }
}

export {
  InspectionType,
  deserializeInspectionType,
  deserializeInspectionTypeList,
};
