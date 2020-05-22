import { Mask } from '../mask';

class UserMask implements Mask {
        public mask: number;

        constructor(
          usid = false,
          usan8 = false,
          uscell = false,
          usmail = false,
          usname = false,
          uspswd = false,
          usstatus = false,
        ) {
          this.mask = 0b0000000;
          if (usid) { this.setUsid(usid); }
          if (usan8) { this.setUsan8(usan8); }
          if (uscell) { this.setUscell(uscell); }
          if (usmail) { this.setUsmail(usmail); }
          if (usname) { this.setUsname(usname); }
          if (uspswd) { this.setUspswd(uspswd); }
          if (usstatus) { this.setUsstatus(usstatus); }
        }

        getUsid(): boolean {
          return (this.mask >> 6 & 1) === 1;
        }

        setUsid(usid: boolean): UserMask {
          if (usid) this.mask |= 0b1000000;
          else this.mask &= 0b0111111;
          return this;
        }

        getUsan8(): boolean {
          return (this.mask >> 5 & 1) === 1;
        }

        setUsan8(usan8: boolean): UserMask {
          if (usan8) this.mask |= 0b0100000;
          else this.mask &= 0b1011111;
          return this;
        }

        getUscell(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setUscell(uscell: boolean): UserMask {
          if (uscell) this.mask |= 0b0010000;
          else this.mask &= 0b1101111;
          return this;
        }

        getUsmail(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setUsmail(usmail: boolean): UserMask {
          if (usmail) this.mask |= 0b0001000;
          else this.mask &= 0b1110111;
          return this;
        }

        getUsname(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setUsname(usname: boolean): UserMask {
          if (usname) this.mask |= 0b0000100;
          else this.mask &= 0b1111011;
          return this;
        }

        getUspswd(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setUspswd(uspswd: boolean): UserMask {
          if (uspswd) this.mask |= 0b0000010;
          else this.mask &= 0b1111101;
          return this;
        }

        getUsstatus(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setUsstatus(usstatus: boolean): UserMask {
          if (usstatus) this.mask |= 0b0000001;
          else this.mask &= 0b1111110;
          return this;
        }

        all(b: boolean): UserMask {
          this.setUsid(b);
          this.setUsan8(b);
          this.setUscell(b);
          this.setUsmail(b);
          this.setUsname(b);
          this.setUspswd(b);
          this.setUsstatus(b);
          return this;
        }

        keys(b: boolean): UserMask {
          this.setUsid(b);
          return this;
        }

        attributes(b: boolean): UserMask {
          this.setUsan8(b);
          this.setUscell(b);
          this.setUsmail(b);
          this.setUsname(b);
          this.setUspswd(b);
          this.setUsstatus(b);
          return this;
        }

        physicals(b: boolean): UserMask {
          this.setUsid(b);
          this.setUsan8(b);
          this.setUscell(b);
          this.setUsmail(b);
          this.setUsname(b);
          this.setUspswd(b);
          this.setUsstatus(b);
          return this;
        }

        virtuals(b: boolean): UserMask {
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'usid':
              return this.getUsid();
            case 'usan8':
              return this.getUsan8();
            case 'uscell':
              return this.getUscell();
            case 'usmail':
              return this.getUsmail();
            case 'usname':
              return this.getUsname();
            case 'uspswd':
              return this.getUspswd();
            case 'usstatus':
              return this.getUsstatus();
          }
          return false;
        }

        set(p: string, b: boolean): UserMask {
          switch (p) {
            case 'usid':
              this.setUsid(b);
              break;
            case 'usan8':
              this.setUsan8(b);
              break;
            case 'uscell':
              this.setUscell(b);
              break;
            case 'usmail':
              this.setUsmail(b);
              break;
            case 'usname':
              this.setUsname(b);
              break;
            case 'uspswd':
              this.setUspswd(b);
              break;
            case 'usstatus':
              this.setUsstatus(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeUserMask(str: string): UserMask {
  try {
    const mask = new UserMask();
    mask.mask = parseInt(str) & 0b1111111;
    return mask;
  } catch {
    throw Error('Error deserializing UserMask');
  }
}

export {
  UserMask,
  deserializeUserMask,
};
