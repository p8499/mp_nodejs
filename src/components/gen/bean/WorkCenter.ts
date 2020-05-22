import { WORKCENTER_SPEC } from '../spec/WorkCenterSpec';
import { WorkCenterMask } from '../mask/WorkCenterMask';
import { Bean } from '../bean';


class WorkCenter implements Bean {
  constructor(public wcmcu: string|null = null, public wcdl01: string|null = null) {
  }

  equals(target: WorkCenter, mask: WorkCenterMask = new WorkCenterMask(true, true)): boolean {
    return !(mask.getWcmcu() && !((this.wcmcu === null && target.wcmcu === null) || (this.wcmcu !== null && target.wcmcu !== null && this.wcmcu === target.wcmcu))) && !(mask.getWcdl01() && !((this.wcdl01 === null && target.wcdl01 === null) || (this.wcdl01 !== null && target.wcdl01 !== null && this.wcdl01 === target.wcdl01)));
  }

  copy(target: WorkCenter = new WorkCenter(), mask: WorkCenterMask = new WorkCenterMask(true, true)): WorkCenter {
    if (mask.getWcmcu()) { target.wcmcu = this.wcmcu; }
    if (mask.getWcdl01()) { target.wcdl01 = this.wcdl01; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.wcmcu !== null) { texts.push(`"wcmcu":"${this.wcmcu}"`); }
    if (this.wcdl01 !== null) { texts.push(`"wcdl01":"${this.wcdl01}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeWorkCenter(str: string): WorkCenter {
  try {
    const obj = JSON.parse(str);
    return new WorkCenter(
      'wcmcu' in obj ? obj.wcmcu : null,
      'wcdl01' in obj ? obj.wcdl01 : null,
    );
  } catch {
    throw Error('Error deserializing WorkCenter');
  }
}

function deserializeWorkCenterList(str: string): Array<WorkCenter> {
  try {
    return JSON.parse(str).map((obj: any) => new WorkCenter(
      'wcmcu' in obj ? obj.wcmcu : null,
      'wcdl01' in obj ? obj.wcdl01 : null,
    ));
  } catch {
    throw Error('Error deserializing WorkCenterList');
  }
}

export {
  WorkCenter,
  deserializeWorkCenter,
  deserializeWorkCenterList,
};
