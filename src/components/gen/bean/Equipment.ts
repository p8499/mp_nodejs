import { EQUIPMENT_SPEC } from '../spec/EquipmentSpec';
import { EquipmentMask } from '../mask/EquipmentMask';
import { Bean } from '../bean';


class Equipment implements Bean {
  constructor(public eqid: number|null = null, public eqserial: string|null = null, public eqnumb: number|null = null, public eqname: string|null = null, public eqcwid: number|null = null, public eqcwname: string|null = null, public eqwcmcu: string|null = null, public eqwcdl01: string|null = null) {
  }

  equals(target: Equipment, mask: EquipmentMask = new EquipmentMask(true, true, true, true, true, true, true, true)): boolean {
    return !(mask.getEqid() && !((this.eqid === null && target.eqid === null) || (this.eqid !== null && target.eqid !== null && this.eqid === target.eqid))) && !(mask.getEqserial() && !((this.eqserial === null && target.eqserial === null) || (this.eqserial !== null && target.eqserial !== null && this.eqserial === target.eqserial))) && !(mask.getEqnumb() && !((this.eqnumb === null && target.eqnumb === null) || (this.eqnumb !== null && target.eqnumb !== null && this.eqnumb === target.eqnumb))) && !(mask.getEqname() && !((this.eqname === null && target.eqname === null) || (this.eqname !== null && target.eqname !== null && this.eqname === target.eqname))) && !(mask.getEqcwid() && !((this.eqcwid === null && target.eqcwid === null) || (this.eqcwid !== null && target.eqcwid !== null && this.eqcwid === target.eqcwid))) && !(mask.getEqcwname() && !((this.eqcwname === null && target.eqcwname === null) || (this.eqcwname !== null && target.eqcwname !== null && this.eqcwname === target.eqcwname))) && !(mask.getEqwcmcu() && !((this.eqwcmcu === null && target.eqwcmcu === null) || (this.eqwcmcu !== null && target.eqwcmcu !== null && this.eqwcmcu === target.eqwcmcu))) && !(mask.getEqwcdl01() && !((this.eqwcdl01 === null && target.eqwcdl01 === null) || (this.eqwcdl01 !== null && target.eqwcdl01 !== null && this.eqwcdl01 === target.eqwcdl01)));
  }

  copy(target: Equipment = new Equipment(), mask: EquipmentMask = new EquipmentMask(true, true, true, true, true, true, true, true)): Equipment {
    if (mask.getEqid()) { target.eqid = this.eqid; }
    if (mask.getEqserial()) { target.eqserial = this.eqserial; }
    if (mask.getEqnumb()) { target.eqnumb = this.eqnumb; }
    if (mask.getEqname()) { target.eqname = this.eqname; }
    if (mask.getEqcwid()) { target.eqcwid = this.eqcwid; }
    if (mask.getEqcwname()) { target.eqcwname = this.eqcwname; }
    if (mask.getEqwcmcu()) { target.eqwcmcu = this.eqwcmcu; }
    if (mask.getEqwcdl01()) { target.eqwcdl01 = this.eqwcdl01; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.eqid !== null) { texts.push(`"eqid":${this.eqid}`); }
    if (this.eqserial !== null) { texts.push(`"eqserial":"${this.eqserial}"`); }
    if (this.eqnumb !== null) { texts.push(`"eqnumb":${this.eqnumb}`); }
    if (this.eqname !== null) { texts.push(`"eqname":"${this.eqname}"`); }
    if (this.eqcwid !== null) { texts.push(`"eqcwid":${this.eqcwid}`); }
    if (this.eqcwname !== null) { texts.push(`"eqcwname":"${this.eqcwname}"`); }
    if (this.eqwcmcu !== null) { texts.push(`"eqwcmcu":"${this.eqwcmcu}"`); }
    if (this.eqwcdl01 !== null) { texts.push(`"eqwcdl01":"${this.eqwcdl01}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeEquipment(str: string): Equipment {
  try {
    const obj = JSON.parse(str);
    return new Equipment(
      'eqid' in obj ? obj.eqid : null,
      'eqserial' in obj ? obj.eqserial : null,
      'eqnumb' in obj ? obj.eqnumb : null,
      'eqname' in obj ? obj.eqname : null,
      'eqcwid' in obj ? obj.eqcwid : null,
      'eqcwname' in obj ? obj.eqcwname : null,
      'eqwcmcu' in obj ? obj.eqwcmcu : null,
      'eqwcdl01' in obj ? obj.eqwcdl01 : null,
    );
  } catch {
    throw Error('Error deserializing Equipment');
  }
}

function deserializeEquipmentList(str: string): Array<Equipment> {
  try {
    return JSON.parse(str).map((obj: any) => new Equipment(
      'eqid' in obj ? obj.eqid : null,
      'eqserial' in obj ? obj.eqserial : null,
      'eqnumb' in obj ? obj.eqnumb : null,
      'eqname' in obj ? obj.eqname : null,
      'eqcwid' in obj ? obj.eqcwid : null,
      'eqcwname' in obj ? obj.eqcwname : null,
      'eqwcmcu' in obj ? obj.eqwcmcu : null,
      'eqwcdl01' in obj ? obj.eqwcdl01 : null,
    ));
  } catch {
    throw Error('Error deserializing EquipmentList');
  }
}

export {
  Equipment,
  deserializeEquipment,
  deserializeEquipmentList,
};
