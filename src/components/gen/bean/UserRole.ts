import { USERROLE_SPEC } from '../spec/UserRoleSpec';
import { UserRoleMask } from '../mask/UserRoleMask';
import { Bean } from '../bean';


class UserRole implements Bean {
  constructor(public urid: number|null = null, public urusid: number|null = null, public urroid: string|null = null, public urusname: string|null = null, public urroname: string|null = null) {
  }

  equals(target: UserRole, mask: UserRoleMask = new UserRoleMask(true, true, true, true, true)): boolean {
    return !(mask.getUrid() && !((this.urid === null && target.urid === null) || (this.urid !== null && target.urid !== null && this.urid === target.urid))) && !(mask.getUrusid() && !((this.urusid === null && target.urusid === null) || (this.urusid !== null && target.urusid !== null && this.urusid === target.urusid))) && !(mask.getUrroid() && !((this.urroid === null && target.urroid === null) || (this.urroid !== null && target.urroid !== null && this.urroid === target.urroid))) && !(mask.getUrusname() && !((this.urusname === null && target.urusname === null) || (this.urusname !== null && target.urusname !== null && this.urusname === target.urusname))) && !(mask.getUrroname() && !((this.urroname === null && target.urroname === null) || (this.urroname !== null && target.urroname !== null && this.urroname === target.urroname)));
  }

  copy(target: UserRole = new UserRole(), mask: UserRoleMask = new UserRoleMask(true, true, true, true, true)): UserRole {
    if (mask.getUrid()) { target.urid = this.urid; }
    if (mask.getUrusid()) { target.urusid = this.urusid; }
    if (mask.getUrroid()) { target.urroid = this.urroid; }
    if (mask.getUrusname()) { target.urusname = this.urusname; }
    if (mask.getUrroname()) { target.urroname = this.urroname; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.urid !== null) { texts.push(`"urid":${this.urid}`); }
    if (this.urusid !== null) { texts.push(`"urusid":${this.urusid}`); }
    if (this.urroid !== null) { texts.push(`"urroid":"${this.urroid}"`); }
    if (this.urusname !== null) { texts.push(`"urusname":"${this.urusname}"`); }
    if (this.urroname !== null) { texts.push(`"urroname":"${this.urroname}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeUserRole(str: string): UserRole {
  try {
    const obj = JSON.parse(str);
    return new UserRole(
      'urid' in obj ? obj.urid : null,
      'urusid' in obj ? obj.urusid : null,
      'urroid' in obj ? obj.urroid : null,
      'urusname' in obj ? obj.urusname : null,
      'urroname' in obj ? obj.urroname : null,
    );
  } catch {
    throw Error('Error deserializing UserRole');
  }
}

function deserializeUserRoleList(str: string): Array<UserRole> {
  try {
    return JSON.parse(str).map((obj: any) => new UserRole(
      'urid' in obj ? obj.urid : null,
      'urusid' in obj ? obj.urusid : null,
      'urroid' in obj ? obj.urroid : null,
      'urusname' in obj ? obj.urusname : null,
      'urroname' in obj ? obj.urroname : null,
    ));
  } catch {
    throw Error('Error deserializing UserRoleList');
  }
}

export {
  UserRole,
  deserializeUserRole,
  deserializeUserRoleList,
};
