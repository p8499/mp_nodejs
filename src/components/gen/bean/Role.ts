import { ROLE_SPEC } from '../spec/RoleSpec';
import { RoleMask } from '../mask/RoleMask';
import { Bean } from '../bean';


class Role implements Bean {
  constructor(public roid: string|null = null, public roname: string|null = null) {
  }

  equals(target: Role, mask: RoleMask = new RoleMask(true, true)): boolean {
    return !(mask.getRoid() && !((this.roid === null && target.roid === null) || (this.roid !== null && target.roid !== null && this.roid === target.roid))) && !(mask.getRoname() && !((this.roname === null && target.roname === null) || (this.roname !== null && target.roname !== null && this.roname === target.roname)));
  }

  copy(target: Role = new Role(), mask: RoleMask = new RoleMask(true, true)): Role {
    if (mask.getRoid()) { target.roid = this.roid; }
    if (mask.getRoname()) { target.roname = this.roname; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.roid !== null) { texts.push(`"roid":"${this.roid}"`); }
    if (this.roname !== null) { texts.push(`"roname":"${this.roname}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeRole(str: string): Role {
  try {
    const obj = JSON.parse(str);
    return new Role(
      'roid' in obj ? obj.roid : null,
      'roname' in obj ? obj.roname : null,
    );
  } catch {
    throw Error('Error deserializing Role');
  }
}

function deserializeRoleList(str: string): Array<Role> {
  try {
    return JSON.parse(str).map((obj: any) => new Role(
      'roid' in obj ? obj.roid : null,
      'roname' in obj ? obj.roname : null,
    ));
  } catch {
    throw Error('Error deserializing RoleList');
  }
}

export {
  Role,
  deserializeRole,
  deserializeRoleList,
};
