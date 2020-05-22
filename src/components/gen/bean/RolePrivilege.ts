import { ROLEPRIVILEGE_SPEC } from '../spec/RolePrivilegeSpec';
import { RolePrivilegeMask } from '../mask/RolePrivilegeMask';
import { Bean } from '../bean';


class RolePrivilege implements Bean {
  constructor(public rpid: number|null = null, public rproid: string|null = null, public rpprid: string|null = null, public rproname: string|null = null, public rpprname: string|null = null) {
  }

  equals(target: RolePrivilege, mask: RolePrivilegeMask = new RolePrivilegeMask(true, true, true, true, true)): boolean {
    return !(mask.getRpid() && !((this.rpid === null && target.rpid === null) || (this.rpid !== null && target.rpid !== null && this.rpid === target.rpid))) && !(mask.getRproid() && !((this.rproid === null && target.rproid === null) || (this.rproid !== null && target.rproid !== null && this.rproid === target.rproid))) && !(mask.getRpprid() && !((this.rpprid === null && target.rpprid === null) || (this.rpprid !== null && target.rpprid !== null && this.rpprid === target.rpprid))) && !(mask.getRproname() && !((this.rproname === null && target.rproname === null) || (this.rproname !== null && target.rproname !== null && this.rproname === target.rproname))) && !(mask.getRpprname() && !((this.rpprname === null && target.rpprname === null) || (this.rpprname !== null && target.rpprname !== null && this.rpprname === target.rpprname)));
  }

  copy(target: RolePrivilege = new RolePrivilege(), mask: RolePrivilegeMask = new RolePrivilegeMask(true, true, true, true, true)): RolePrivilege {
    if (mask.getRpid()) { target.rpid = this.rpid; }
    if (mask.getRproid()) { target.rproid = this.rproid; }
    if (mask.getRpprid()) { target.rpprid = this.rpprid; }
    if (mask.getRproname()) { target.rproname = this.rproname; }
    if (mask.getRpprname()) { target.rpprname = this.rpprname; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.rpid !== null) { texts.push(`"rpid":${this.rpid}`); }
    if (this.rproid !== null) { texts.push(`"rproid":"${this.rproid}"`); }
    if (this.rpprid !== null) { texts.push(`"rpprid":"${this.rpprid}"`); }
    if (this.rproname !== null) { texts.push(`"rproname":"${this.rproname}"`); }
    if (this.rpprname !== null) { texts.push(`"rpprname":"${this.rpprname}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeRolePrivilege(str: string): RolePrivilege {
  try {
    const obj = JSON.parse(str);
    return new RolePrivilege(
      'rpid' in obj ? obj.rpid : null,
      'rproid' in obj ? obj.rproid : null,
      'rpprid' in obj ? obj.rpprid : null,
      'rproname' in obj ? obj.rproname : null,
      'rpprname' in obj ? obj.rpprname : null,
    );
  } catch {
    throw Error('Error deserializing RolePrivilege');
  }
}

function deserializeRolePrivilegeList(str: string): Array<RolePrivilege> {
  try {
    return JSON.parse(str).map((obj: any) => new RolePrivilege(
      'rpid' in obj ? obj.rpid : null,
      'rproid' in obj ? obj.rproid : null,
      'rpprid' in obj ? obj.rpprid : null,
      'rproname' in obj ? obj.rproname : null,
      'rpprname' in obj ? obj.rpprname : null,
    ));
  } catch {
    throw Error('Error deserializing RolePrivilegeList');
  }
}

export {
  RolePrivilege,
  deserializeRolePrivilege,
  deserializeRolePrivilegeList,
};
