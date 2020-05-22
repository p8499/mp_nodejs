import { ENUMTYPE_SPEC } from '../spec/EnumTypeSpec';
import { EnumTypeMask } from '../mask/EnumTypeMask';
import { Bean } from '../bean';


class EnumType implements Bean {
  constructor(public etid: string|null = null, public etname: string|null = null) {
  }

  equals(target: EnumType, mask: EnumTypeMask = new EnumTypeMask(true, true)): boolean {
    return !(mask.getEtid() && !((this.etid === null && target.etid === null) || (this.etid !== null && target.etid !== null && this.etid === target.etid))) && !(mask.getEtname() && !((this.etname === null && target.etname === null) || (this.etname !== null && target.etname !== null && this.etname === target.etname)));
  }

  copy(target: EnumType = new EnumType(), mask: EnumTypeMask = new EnumTypeMask(true, true)): EnumType {
    if (mask.getEtid()) { target.etid = this.etid; }
    if (mask.getEtname()) { target.etname = this.etname; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.etid !== null) { texts.push(`"etid":"${this.etid}"`); }
    if (this.etname !== null) { texts.push(`"etname":"${this.etname}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeEnumType(str: string): EnumType {
  try {
    const obj = JSON.parse(str);
    return new EnumType(
      'etid' in obj ? obj.etid : null,
      'etname' in obj ? obj.etname : null,
    );
  } catch {
    throw Error('Error deserializing EnumType');
  }
}

function deserializeEnumTypeList(str: string): Array<EnumType> {
  try {
    return JSON.parse(str).map((obj: any) => new EnumType(
      'etid' in obj ? obj.etid : null,
      'etname' in obj ? obj.etname : null,
    ));
  } catch {
    throw Error('Error deserializing EnumTypeList');
  }
}

export {
  EnumType,
  deserializeEnumType,
  deserializeEnumTypeList,
};
