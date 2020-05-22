import { BUILDING_SPEC } from '../spec/BuildingSpec';
import { BuildingMask } from '../mask/BuildingMask';
import { Bean } from '../bean';


class Building implements Bean {
  constructor(public mcmcu: string|null = null, public mcdl01: string|null = null, public mcbpmcu: string|null = null, public mcbpdl01: string|null = null, public mcwcmcu: string|null = null, public mcwcdl01: string|null = null) {
  }

  equals(target: Building, mask: BuildingMask = new BuildingMask(true, true, true, true, true, true)): boolean {
    return !(mask.getMcmcu() && !((this.mcmcu === null && target.mcmcu === null) || (this.mcmcu !== null && target.mcmcu !== null && this.mcmcu === target.mcmcu))) && !(mask.getMcdl01() && !((this.mcdl01 === null && target.mcdl01 === null) || (this.mcdl01 !== null && target.mcdl01 !== null && this.mcdl01 === target.mcdl01))) && !(mask.getMcbpmcu() && !((this.mcbpmcu === null && target.mcbpmcu === null) || (this.mcbpmcu !== null && target.mcbpmcu !== null && this.mcbpmcu === target.mcbpmcu))) && !(mask.getMcbpdl01() && !((this.mcbpdl01 === null && target.mcbpdl01 === null) || (this.mcbpdl01 !== null && target.mcbpdl01 !== null && this.mcbpdl01 === target.mcbpdl01))) && !(mask.getMcwcmcu() && !((this.mcwcmcu === null && target.mcwcmcu === null) || (this.mcwcmcu !== null && target.mcwcmcu !== null && this.mcwcmcu === target.mcwcmcu))) && !(mask.getMcwcdl01() && !((this.mcwcdl01 === null && target.mcwcdl01 === null) || (this.mcwcdl01 !== null && target.mcwcdl01 !== null && this.mcwcdl01 === target.mcwcdl01)));
  }

  copy(target: Building = new Building(), mask: BuildingMask = new BuildingMask(true, true, true, true, true, true)): Building {
    if (mask.getMcmcu()) { target.mcmcu = this.mcmcu; }
    if (mask.getMcdl01()) { target.mcdl01 = this.mcdl01; }
    if (mask.getMcbpmcu()) { target.mcbpmcu = this.mcbpmcu; }
    if (mask.getMcbpdl01()) { target.mcbpdl01 = this.mcbpdl01; }
    if (mask.getMcwcmcu()) { target.mcwcmcu = this.mcwcmcu; }
    if (mask.getMcwcdl01()) { target.mcwcdl01 = this.mcwcdl01; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.mcmcu !== null) { texts.push(`"mcmcu":"${this.mcmcu}"`); }
    if (this.mcdl01 !== null) { texts.push(`"mcdl01":"${this.mcdl01}"`); }
    if (this.mcbpmcu !== null) { texts.push(`"mcbpmcu":"${this.mcbpmcu}"`); }
    if (this.mcbpdl01 !== null) { texts.push(`"mcbpdl01":"${this.mcbpdl01}"`); }
    if (this.mcwcmcu !== null) { texts.push(`"mcwcmcu":"${this.mcwcmcu}"`); }
    if (this.mcwcdl01 !== null) { texts.push(`"mcwcdl01":"${this.mcwcdl01}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeBuilding(str: string): Building {
  try {
    const obj = JSON.parse(str);
    return new Building(
      'mcmcu' in obj ? obj.mcmcu : null,
      'mcdl01' in obj ? obj.mcdl01 : null,
      'mcbpmcu' in obj ? obj.mcbpmcu : null,
      'mcbpdl01' in obj ? obj.mcbpdl01 : null,
      'mcwcmcu' in obj ? obj.mcwcmcu : null,
      'mcwcdl01' in obj ? obj.mcwcdl01 : null,
    );
  } catch {
    throw Error('Error deserializing Building');
  }
}

function deserializeBuildingList(str: string): Array<Building> {
  try {
    return JSON.parse(str).map((obj: any) => new Building(
      'mcmcu' in obj ? obj.mcmcu : null,
      'mcdl01' in obj ? obj.mcdl01 : null,
      'mcbpmcu' in obj ? obj.mcbpmcu : null,
      'mcbpdl01' in obj ? obj.mcbpdl01 : null,
      'mcwcmcu' in obj ? obj.mcwcmcu : null,
      'mcwcdl01' in obj ? obj.mcwcdl01 : null,
    ));
  } catch {
    throw Error('Error deserializing BuildingList');
  }
}

export {
  Building,
  deserializeBuilding,
  deserializeBuildingList,
};
