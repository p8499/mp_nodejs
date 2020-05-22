import { PRIVILEGE_SPEC } from '../spec/PrivilegeSpec';
import { PrivilegeMask } from '../mask/PrivilegeMask';
import { Bean } from '../bean';


class Privilege implements Bean {
  constructor(public prid: string|null = null, public prname: string|null = null) {
  }

  equals(target: Privilege, mask: PrivilegeMask = new PrivilegeMask(true, true)): boolean {
    return !(mask.getPrid() && !((this.prid === null && target.prid === null) || (this.prid !== null && target.prid !== null && this.prid === target.prid))) && !(mask.getPrname() && !((this.prname === null && target.prname === null) || (this.prname !== null && target.prname !== null && this.prname === target.prname)));
  }

  copy(target: Privilege = new Privilege(), mask: PrivilegeMask = new PrivilegeMask(true, true)): Privilege {
    if (mask.getPrid()) { target.prid = this.prid; }
    if (mask.getPrname()) { target.prname = this.prname; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.prid !== null) { texts.push(`"prid":"${this.prid}"`); }
    if (this.prname !== null) { texts.push(`"prname":"${this.prname}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializePrivilege(str: string): Privilege {
  try {
    const obj = JSON.parse(str);
    return new Privilege(
      'prid' in obj ? obj.prid : null,
      'prname' in obj ? obj.prname : null,
    );
  } catch {
    throw Error('Error deserializing Privilege');
  }
}

function deserializePrivilegeList(str: string): Array<Privilege> {
  try {
    return JSON.parse(str).map((obj: any) => new Privilege(
      'prid' in obj ? obj.prid : null,
      'prname' in obj ? obj.prname : null,
    ));
  } catch {
    throw Error('Error deserializing PrivilegeList');
  }
}

export {
  Privilege,
  deserializePrivilege,
  deserializePrivilegeList,
};
