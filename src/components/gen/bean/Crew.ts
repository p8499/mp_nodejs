import { CREW_SPEC } from '../spec/CrewSpec';
import { CrewMask } from '../mask/CrewMask';
import { Bean } from '../bean';


class Crew implements Bean {
  constructor(public cwid: number|null = null, public cwname: string|null = null, public cwan8: number|null = null, public cwwcmcu: string|null = null, public cwwcdl01: string|null = null) {
  }

  equals(target: Crew, mask: CrewMask = new CrewMask(true, true, true, true, true)): boolean {
    return !(mask.getCwid() && !((this.cwid === null && target.cwid === null) || (this.cwid !== null && target.cwid !== null && this.cwid === target.cwid))) && !(mask.getCwname() && !((this.cwname === null && target.cwname === null) || (this.cwname !== null && target.cwname !== null && this.cwname === target.cwname))) && !(mask.getCwan8() && !((this.cwan8 === null && target.cwan8 === null) || (this.cwan8 !== null && target.cwan8 !== null && this.cwan8 === target.cwan8))) && !(mask.getCwwcmcu() && !((this.cwwcmcu === null && target.cwwcmcu === null) || (this.cwwcmcu !== null && target.cwwcmcu !== null && this.cwwcmcu === target.cwwcmcu))) && !(mask.getCwwcdl01() && !((this.cwwcdl01 === null && target.cwwcdl01 === null) || (this.cwwcdl01 !== null && target.cwwcdl01 !== null && this.cwwcdl01 === target.cwwcdl01)));
  }

  copy(target: Crew = new Crew(), mask: CrewMask = new CrewMask(true, true, true, true, true)): Crew {
    if (mask.getCwid()) { target.cwid = this.cwid; }
    if (mask.getCwname()) { target.cwname = this.cwname; }
    if (mask.getCwan8()) { target.cwan8 = this.cwan8; }
    if (mask.getCwwcmcu()) { target.cwwcmcu = this.cwwcmcu; }
    if (mask.getCwwcdl01()) { target.cwwcdl01 = this.cwwcdl01; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.cwid !== null) { texts.push(`"cwid":${this.cwid}`); }
    if (this.cwname !== null) { texts.push(`"cwname":"${this.cwname}"`); }
    if (this.cwan8 !== null) { texts.push(`"cwan8":${this.cwan8}`); }
    if (this.cwwcmcu !== null) { texts.push(`"cwwcmcu":"${this.cwwcmcu}"`); }
    if (this.cwwcdl01 !== null) { texts.push(`"cwwcdl01":"${this.cwwcdl01}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeCrew(str: string): Crew {
  try {
    const obj = JSON.parse(str);
    return new Crew(
      'cwid' in obj ? obj.cwid : null,
      'cwname' in obj ? obj.cwname : null,
      'cwan8' in obj ? obj.cwan8 : null,
      'cwwcmcu' in obj ? obj.cwwcmcu : null,
      'cwwcdl01' in obj ? obj.cwwcdl01 : null,
    );
  } catch {
    throw Error('Error deserializing Crew');
  }
}

function deserializeCrewList(str: string): Array<Crew> {
  try {
    return JSON.parse(str).map((obj: any) => new Crew(
      'cwid' in obj ? obj.cwid : null,
      'cwname' in obj ? obj.cwname : null,
      'cwan8' in obj ? obj.cwan8 : null,
      'cwwcmcu' in obj ? obj.cwwcmcu : null,
      'cwwcdl01' in obj ? obj.cwwcdl01 : null,
    ));
  } catch {
    throw Error('Error deserializing CrewList');
  }
}

export {
  Crew,
  deserializeCrew,
  deserializeCrewList,
};
