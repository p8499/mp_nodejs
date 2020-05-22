import { ENUMTYPEVALUE_SPEC } from '../spec/EnumTypeValueSpec';
import { EnumTypeValueMask } from '../mask/EnumTypeValueMask';
import { Bean } from '../bean';


class EnumTypeValue implements Bean {
  constructor(public evid: number|null = null, public evetid: string|null = null, public evval: number|null = null, public evdescription: string|null = null, public evetname: string|null = null) {
  }

  equals(target: EnumTypeValue, mask: EnumTypeValueMask = new EnumTypeValueMask(true, true, true, true, true)): boolean {
    return !(mask.getEvid() && !((this.evid === null && target.evid === null) || (this.evid !== null && target.evid !== null && this.evid === target.evid))) && !(mask.getEvetid() && !((this.evetid === null && target.evetid === null) || (this.evetid !== null && target.evetid !== null && this.evetid === target.evetid))) && !(mask.getEvval() && !((this.evval === null && target.evval === null) || (this.evval !== null && target.evval !== null && this.evval === target.evval))) && !(mask.getEvdescription() && !((this.evdescription === null && target.evdescription === null) || (this.evdescription !== null && target.evdescription !== null && this.evdescription === target.evdescription))) && !(mask.getEvetname() && !((this.evetname === null && target.evetname === null) || (this.evetname !== null && target.evetname !== null && this.evetname === target.evetname)));
  }

  copy(target: EnumTypeValue = new EnumTypeValue(), mask: EnumTypeValueMask = new EnumTypeValueMask(true, true, true, true, true)): EnumTypeValue {
    if (mask.getEvid()) { target.evid = this.evid; }
    if (mask.getEvetid()) { target.evetid = this.evetid; }
    if (mask.getEvval()) { target.evval = this.evval; }
    if (mask.getEvdescription()) { target.evdescription = this.evdescription; }
    if (mask.getEvetname()) { target.evetname = this.evetname; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.evid !== null) { texts.push(`"evid":${this.evid}`); }
    if (this.evetid !== null) { texts.push(`"evetid":"${this.evetid}"`); }
    if (this.evval !== null) { texts.push(`"evval":${this.evval}`); }
    if (this.evdescription !== null) { texts.push(`"evdescription":"${this.evdescription}"`); }
    if (this.evetname !== null) { texts.push(`"evetname":"${this.evetname}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeEnumTypeValue(str: string): EnumTypeValue {
  try {
    const obj = JSON.parse(str);
    return new EnumTypeValue(
      'evid' in obj ? obj.evid : null,
      'evetid' in obj ? obj.evetid : null,
      'evval' in obj ? obj.evval : null,
      'evdescription' in obj ? obj.evdescription : null,
      'evetname' in obj ? obj.evetname : null,
    );
  } catch {
    throw Error('Error deserializing EnumTypeValue');
  }
}

function deserializeEnumTypeValueList(str: string): Array<EnumTypeValue> {
  try {
    return JSON.parse(str).map((obj: any) => new EnumTypeValue(
      'evid' in obj ? obj.evid : null,
      'evetid' in obj ? obj.evetid : null,
      'evval' in obj ? obj.evval : null,
      'evdescription' in obj ? obj.evdescription : null,
      'evetname' in obj ? obj.evetname : null,
    ));
  } catch {
    throw Error('Error deserializing EnumTypeValueList');
  }
}

export {
  EnumTypeValue,
  deserializeEnumTypeValue,
  deserializeEnumTypeValueList,
};
