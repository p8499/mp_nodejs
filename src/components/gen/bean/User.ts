import { USER_SPEC } from '../spec/UserSpec';
import { UserMask } from '../mask/UserMask';
import { Bean } from '../bean';


class User implements Bean {
  constructor(public usid: number|null = null, public usan8: number|null = null, public uscell: string|null = null, public usmail: string|null = null, public usname: string|null = null, public uspswd: string|null = null, public usstatus: number|null = USER_SPEC.fields.usstatus.default) {
  }

  equals(target: User, mask: UserMask = new UserMask(true, true, true, true, true, true, true)): boolean {
    return !(mask.getUsid() && !((this.usid === null && target.usid === null) || (this.usid !== null && target.usid !== null && this.usid === target.usid))) && !(mask.getUsan8() && !((this.usan8 === null && target.usan8 === null) || (this.usan8 !== null && target.usan8 !== null && this.usan8 === target.usan8))) && !(mask.getUscell() && !((this.uscell === null && target.uscell === null) || (this.uscell !== null && target.uscell !== null && this.uscell === target.uscell))) && !(mask.getUsmail() && !((this.usmail === null && target.usmail === null) || (this.usmail !== null && target.usmail !== null && this.usmail === target.usmail))) && !(mask.getUsname() && !((this.usname === null && target.usname === null) || (this.usname !== null && target.usname !== null && this.usname === target.usname))) && !(mask.getUspswd() && !((this.uspswd === null && target.uspswd === null) || (this.uspswd !== null && target.uspswd !== null && this.uspswd === target.uspswd))) && !(mask.getUsstatus() && !((this.usstatus === null && target.usstatus === null) || (this.usstatus !== null && target.usstatus !== null && this.usstatus === target.usstatus)));
  }

  copy(target: User = new User(), mask: UserMask = new UserMask(true, true, true, true, true, true, true)): User {
    if (mask.getUsid()) { target.usid = this.usid; }
    if (mask.getUsan8()) { target.usan8 = this.usan8; }
    if (mask.getUscell()) { target.uscell = this.uscell; }
    if (mask.getUsmail()) { target.usmail = this.usmail; }
    if (mask.getUsname()) { target.usname = this.usname; }
    if (mask.getUspswd()) { target.uspswd = this.uspswd; }
    if (mask.getUsstatus()) { target.usstatus = this.usstatus; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.usid !== null) { texts.push(`"usid":${this.usid}`); }
    if (this.usan8 !== null) { texts.push(`"usan8":${this.usan8}`); }
    if (this.uscell !== null) { texts.push(`"uscell":"${this.uscell}"`); }
    if (this.usmail !== null) { texts.push(`"usmail":"${this.usmail}"`); }
    if (this.usname !== null) { texts.push(`"usname":"${this.usname}"`); }
    if (this.uspswd !== null) { texts.push(`"uspswd":"${this.uspswd}"`); }
    if (this.usstatus !== null) { texts.push(`"usstatus":${this.usstatus}`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeUser(str: string): User {
  try {
    const obj = JSON.parse(str);
    return new User(
      'usid' in obj ? obj.usid : null,
      'usan8' in obj ? obj.usan8 : null,
      'uscell' in obj ? obj.uscell : null,
      'usmail' in obj ? obj.usmail : null,
      'usname' in obj ? obj.usname : null,
      'uspswd' in obj ? obj.uspswd : null,
      'usstatus' in obj ? obj.usstatus : null,
    );
  } catch {
    throw Error('Error deserializing User');
  }
}

function deserializeUserList(str: string): Array<User> {
  try {
    return JSON.parse(str).map((obj: any) => new User(
      'usid' in obj ? obj.usid : null,
      'usan8' in obj ? obj.usan8 : null,
      'uscell' in obj ? obj.uscell : null,
      'usmail' in obj ? obj.usmail : null,
      'usname' in obj ? obj.usname : null,
      'uspswd' in obj ? obj.uspswd : null,
      'usstatus' in obj ? obj.usstatus : null,
    ));
  } catch {
    throw Error('Error deserializing UserList');
  }
}

export {
  User,
  deserializeUser,
  deserializeUserList,
};
