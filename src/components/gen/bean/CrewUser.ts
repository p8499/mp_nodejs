import { CREWUSER_SPEC } from '../spec/CrewUserSpec';
import { CrewUserMask } from '../mask/CrewUserMask';
import { Bean } from '../bean';


class CrewUser implements Bean {
  constructor(public cuid: number|null = null, public cucwid: number|null = null, public cucwname: string|null = null, public cuwcmcu: string|null = null, public cuwcdl01: string|null = null, public cuusid: number|null = null, public cuusname: string|null = null) {
  }

  equals(target: CrewUser, mask: CrewUserMask = new CrewUserMask(true, true, true, true, true, true, true)): boolean {
    return !(mask.getCuid() && !((this.cuid === null && target.cuid === null) || (this.cuid !== null && target.cuid !== null && this.cuid === target.cuid))) && !(mask.getCucwid() && !((this.cucwid === null && target.cucwid === null) || (this.cucwid !== null && target.cucwid !== null && this.cucwid === target.cucwid))) && !(mask.getCucwname() && !((this.cucwname === null && target.cucwname === null) || (this.cucwname !== null && target.cucwname !== null && this.cucwname === target.cucwname))) && !(mask.getCuwcmcu() && !((this.cuwcmcu === null && target.cuwcmcu === null) || (this.cuwcmcu !== null && target.cuwcmcu !== null && this.cuwcmcu === target.cuwcmcu))) && !(mask.getCuwcdl01() && !((this.cuwcdl01 === null && target.cuwcdl01 === null) || (this.cuwcdl01 !== null && target.cuwcdl01 !== null && this.cuwcdl01 === target.cuwcdl01))) && !(mask.getCuusid() && !((this.cuusid === null && target.cuusid === null) || (this.cuusid !== null && target.cuusid !== null && this.cuusid === target.cuusid))) && !(mask.getCuusname() && !((this.cuusname === null && target.cuusname === null) || (this.cuusname !== null && target.cuusname !== null && this.cuusname === target.cuusname)));
  }

  copy(target: CrewUser = new CrewUser(), mask: CrewUserMask = new CrewUserMask(true, true, true, true, true, true, true)): CrewUser {
    if (mask.getCuid()) { target.cuid = this.cuid; }
    if (mask.getCucwid()) { target.cucwid = this.cucwid; }
    if (mask.getCucwname()) { target.cucwname = this.cucwname; }
    if (mask.getCuwcmcu()) { target.cuwcmcu = this.cuwcmcu; }
    if (mask.getCuwcdl01()) { target.cuwcdl01 = this.cuwcdl01; }
    if (mask.getCuusid()) { target.cuusid = this.cuusid; }
    if (mask.getCuusname()) { target.cuusname = this.cuusname; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.cuid !== null) { texts.push(`"cuid":${this.cuid}`); }
    if (this.cucwid !== null) { texts.push(`"cucwid":${this.cucwid}`); }
    if (this.cucwname !== null) { texts.push(`"cucwname":"${this.cucwname}"`); }
    if (this.cuwcmcu !== null) { texts.push(`"cuwcmcu":"${this.cuwcmcu}"`); }
    if (this.cuwcdl01 !== null) { texts.push(`"cuwcdl01":"${this.cuwcdl01}"`); }
    if (this.cuusid !== null) { texts.push(`"cuusid":${this.cuusid}`); }
    if (this.cuusname !== null) { texts.push(`"cuusname":"${this.cuusname}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeCrewUser(str: string): CrewUser {
  try {
    const obj = JSON.parse(str);
    return new CrewUser(
      'cuid' in obj ? obj.cuid : null,
      'cucwid' in obj ? obj.cucwid : null,
      'cucwname' in obj ? obj.cucwname : null,
      'cuwcmcu' in obj ? obj.cuwcmcu : null,
      'cuwcdl01' in obj ? obj.cuwcdl01 : null,
      'cuusid' in obj ? obj.cuusid : null,
      'cuusname' in obj ? obj.cuusname : null,
    );
  } catch {
    throw Error('Error deserializing CrewUser');
  }
}

function deserializeCrewUserList(str: string): Array<CrewUser> {
  try {
    return JSON.parse(str).map((obj: any) => new CrewUser(
      'cuid' in obj ? obj.cuid : null,
      'cucwid' in obj ? obj.cucwid : null,
      'cucwname' in obj ? obj.cucwname : null,
      'cuwcmcu' in obj ? obj.cuwcmcu : null,
      'cuwcdl01' in obj ? obj.cuwcdl01 : null,
      'cuusid' in obj ? obj.cuusid : null,
      'cuusname' in obj ? obj.cuusname : null,
    ));
  } catch {
    throw Error('Error deserializing CrewUserList');
  }
}

export {
  CrewUser,
  deserializeCrewUser,
  deserializeCrewUserList,
};
