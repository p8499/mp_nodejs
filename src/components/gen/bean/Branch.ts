import { BRANCH_SPEC } from '../spec/BranchSpec';
import { BranchMask } from '../mask/BranchMask';
import { Bean } from '../bean';


class Branch implements Bean {
  constructor(public bpmcu: string|null = null, public bpdl01: string|null = null, public bpwcmcu: string|null = null, public bpwcdl01: string|null = null) {
  }

  equals(target: Branch, mask: BranchMask = new BranchMask(true, true, true, true)): boolean {
    return !(mask.getBpmcu() && !((this.bpmcu === null && target.bpmcu === null) || (this.bpmcu !== null && target.bpmcu !== null && this.bpmcu === target.bpmcu))) && !(mask.getBpdl01() && !((this.bpdl01 === null && target.bpdl01 === null) || (this.bpdl01 !== null && target.bpdl01 !== null && this.bpdl01 === target.bpdl01))) && !(mask.getBpwcmcu() && !((this.bpwcmcu === null && target.bpwcmcu === null) || (this.bpwcmcu !== null && target.bpwcmcu !== null && this.bpwcmcu === target.bpwcmcu))) && !(mask.getBpwcdl01() && !((this.bpwcdl01 === null && target.bpwcdl01 === null) || (this.bpwcdl01 !== null && target.bpwcdl01 !== null && this.bpwcdl01 === target.bpwcdl01)));
  }

  copy(target: Branch = new Branch(), mask: BranchMask = new BranchMask(true, true, true, true)): Branch {
    if (mask.getBpmcu()) { target.bpmcu = this.bpmcu; }
    if (mask.getBpdl01()) { target.bpdl01 = this.bpdl01; }
    if (mask.getBpwcmcu()) { target.bpwcmcu = this.bpwcmcu; }
    if (mask.getBpwcdl01()) { target.bpwcdl01 = this.bpwcdl01; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.bpmcu !== null) { texts.push(`"bpmcu":"${this.bpmcu}"`); }
    if (this.bpdl01 !== null) { texts.push(`"bpdl01":"${this.bpdl01}"`); }
    if (this.bpwcmcu !== null) { texts.push(`"bpwcmcu":"${this.bpwcmcu}"`); }
    if (this.bpwcdl01 !== null) { texts.push(`"bpwcdl01":"${this.bpwcdl01}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeBranch(str: string): Branch {
  try {
    const obj = JSON.parse(str);
    return new Branch(
      'bpmcu' in obj ? obj.bpmcu : null,
      'bpdl01' in obj ? obj.bpdl01 : null,
      'bpwcmcu' in obj ? obj.bpwcmcu : null,
      'bpwcdl01' in obj ? obj.bpwcdl01 : null,
    );
  } catch {
    throw Error('Error deserializing Branch');
  }
}

function deserializeBranchList(str: string): Array<Branch> {
  try {
    return JSON.parse(str).map((obj: any) => new Branch(
      'bpmcu' in obj ? obj.bpmcu : null,
      'bpdl01' in obj ? obj.bpdl01 : null,
      'bpwcmcu' in obj ? obj.bpwcmcu : null,
      'bpwcdl01' in obj ? obj.bpwcdl01 : null,
    ));
  } catch {
    throw Error('Error deserializing BranchList');
  }
}

export {
  Branch,
  deserializeBranch,
  deserializeBranchList,
};
