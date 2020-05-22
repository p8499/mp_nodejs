import { MAINTENANCETYPE_SPEC } from '../spec/MaintenanceTypeSpec';
import { MaintenanceTypeMask } from '../mask/MaintenanceTypeMask';
import { Bean } from '../bean';


class MaintenanceType implements Bean {
  constructor(public mtid: string|null = null, public mtname: string|null = null) {
  }

  equals(target: MaintenanceType, mask: MaintenanceTypeMask = new MaintenanceTypeMask(true, true)): boolean {
    return !(mask.getMtid() && !((this.mtid === null && target.mtid === null) || (this.mtid !== null && target.mtid !== null && this.mtid === target.mtid))) && !(mask.getMtname() && !((this.mtname === null && target.mtname === null) || (this.mtname !== null && target.mtname !== null && this.mtname === target.mtname)));
  }

  copy(target: MaintenanceType = new MaintenanceType(), mask: MaintenanceTypeMask = new MaintenanceTypeMask(true, true)): MaintenanceType {
    if (mask.getMtid()) { target.mtid = this.mtid; }
    if (mask.getMtname()) { target.mtname = this.mtname; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.mtid !== null) { texts.push(`"mtid":"${this.mtid}"`); }
    if (this.mtname !== null) { texts.push(`"mtname":"${this.mtname}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeMaintenanceType(str: string): MaintenanceType {
  try {
    const obj = JSON.parse(str);
    return new MaintenanceType(
      'mtid' in obj ? obj.mtid : null,
      'mtname' in obj ? obj.mtname : null,
    );
  } catch {
    throw Error('Error deserializing MaintenanceType');
  }
}

function deserializeMaintenanceTypeList(str: string): Array<MaintenanceType> {
  try {
    return JSON.parse(str).map((obj: any) => new MaintenanceType(
      'mtid' in obj ? obj.mtid : null,
      'mtname' in obj ? obj.mtname : null,
    ));
  } catch {
    throw Error('Error deserializing MaintenanceTypeList');
  }
}

export {
  MaintenanceType,
  deserializeMaintenanceType,
  deserializeMaintenanceTypeList,
};
