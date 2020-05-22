import { Mask } from '../mask';

class UserRoleMask implements Mask {
        public mask: number;

        constructor(
          urid = false,
          urusid = false,
          urroid = false,
          urusname = false,
          urroname = false,
        ) {
          this.mask = 0b00000;
          if (urid) { this.setUrid(urid); }
          if (urusid) { this.setUrusid(urusid); }
          if (urroid) { this.setUrroid(urroid); }
          if (urusname) { this.setUrusname(urusname); }
          if (urroname) { this.setUrroname(urroname); }
        }

        getUrid(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setUrid(urid: boolean): UserRoleMask {
          if (urid) this.mask |= 0b10000;
          else this.mask &= 0b01111;
          return this;
        }

        getUrusid(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setUrusid(urusid: boolean): UserRoleMask {
          if (urusid) this.mask |= 0b01000;
          else this.mask &= 0b10111;
          return this;
        }

        getUrroid(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setUrroid(urroid: boolean): UserRoleMask {
          if (urroid) this.mask |= 0b00100;
          else this.mask &= 0b11011;
          return this;
        }

        getUrusname(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setUrusname(urusname: boolean): UserRoleMask {
          if (urusname) this.mask |= 0b00010;
          else this.mask &= 0b11101;
          return this;
        }

        getUrroname(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setUrroname(urroname: boolean): UserRoleMask {
          if (urroname) this.mask |= 0b00001;
          else this.mask &= 0b11110;
          return this;
        }

        all(b: boolean): UserRoleMask {
          this.setUrid(b);
          this.setUrusid(b);
          this.setUrroid(b);
          this.setUrusname(b);
          this.setUrroname(b);
          return this;
        }

        keys(b: boolean): UserRoleMask {
          this.setUrid(b);
          return this;
        }

        attributes(b: boolean): UserRoleMask {
          this.setUrusid(b);
          this.setUrroid(b);
          return this;
        }

        physicals(b: boolean): UserRoleMask {
          this.setUrid(b);
          this.setUrusid(b);
          this.setUrroid(b);
          return this;
        }

        virtuals(b: boolean): UserRoleMask {
          this.setUrusname(b);
          this.setUrroname(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'urid':
              return this.getUrid();
            case 'urusid':
              return this.getUrusid();
            case 'urroid':
              return this.getUrroid();
            case 'urusname':
              return this.getUrusname();
            case 'urroname':
              return this.getUrroname();
          }
          return false;
        }

        set(p: string, b: boolean): UserRoleMask {
          switch (p) {
            case 'urid':
              this.setUrid(b);
              break;
            case 'urusid':
              this.setUrusid(b);
              break;
            case 'urroid':
              this.setUrroid(b);
              break;
            case 'urusname':
              this.setUrusname(b);
              break;
            case 'urroname':
              this.setUrroname(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeUserRoleMask(str: string): UserRoleMask {
  try {
    const mask = new UserRoleMask();
    mask.mask = parseInt(str) & 0b11111;
    return mask;
  } catch {
    throw Error('Error deserializing UserRoleMask');
  }
}

export {
  UserRoleMask,
  deserializeUserRoleMask,
};
