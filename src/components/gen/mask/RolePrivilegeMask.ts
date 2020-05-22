import { Mask } from '../mask';

class RolePrivilegeMask implements Mask {
        public mask: number;

        constructor(
          rpid = false,
          rproid = false,
          rpprid = false,
          rproname = false,
          rpprname = false,
        ) {
          this.mask = 0b00000;
          if (rpid) { this.setRpid(rpid); }
          if (rproid) { this.setRproid(rproid); }
          if (rpprid) { this.setRpprid(rpprid); }
          if (rproname) { this.setRproname(rproname); }
          if (rpprname) { this.setRpprname(rpprname); }
        }

        getRpid(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setRpid(rpid: boolean): RolePrivilegeMask {
          if (rpid) this.mask |= 0b10000;
          else this.mask &= 0b01111;
          return this;
        }

        getRproid(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setRproid(rproid: boolean): RolePrivilegeMask {
          if (rproid) this.mask |= 0b01000;
          else this.mask &= 0b10111;
          return this;
        }

        getRpprid(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setRpprid(rpprid: boolean): RolePrivilegeMask {
          if (rpprid) this.mask |= 0b00100;
          else this.mask &= 0b11011;
          return this;
        }

        getRproname(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setRproname(rproname: boolean): RolePrivilegeMask {
          if (rproname) this.mask |= 0b00010;
          else this.mask &= 0b11101;
          return this;
        }

        getRpprname(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setRpprname(rpprname: boolean): RolePrivilegeMask {
          if (rpprname) this.mask |= 0b00001;
          else this.mask &= 0b11110;
          return this;
        }

        all(b: boolean): RolePrivilegeMask {
          this.setRpid(b);
          this.setRproid(b);
          this.setRpprid(b);
          this.setRproname(b);
          this.setRpprname(b);
          return this;
        }

        keys(b: boolean): RolePrivilegeMask {
          this.setRpid(b);
          return this;
        }

        attributes(b: boolean): RolePrivilegeMask {
          this.setRproid(b);
          this.setRpprid(b);
          return this;
        }

        physicals(b: boolean): RolePrivilegeMask {
          this.setRpid(b);
          this.setRproid(b);
          this.setRpprid(b);
          return this;
        }

        virtuals(b: boolean): RolePrivilegeMask {
          this.setRproname(b);
          this.setRpprname(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'rpid':
              return this.getRpid();
            case 'rproid':
              return this.getRproid();
            case 'rpprid':
              return this.getRpprid();
            case 'rproname':
              return this.getRproname();
            case 'rpprname':
              return this.getRpprname();
          }
          return false;
        }

        set(p: string, b: boolean): RolePrivilegeMask {
          switch (p) {
            case 'rpid':
              this.setRpid(b);
              break;
            case 'rproid':
              this.setRproid(b);
              break;
            case 'rpprid':
              this.setRpprid(b);
              break;
            case 'rproname':
              this.setRproname(b);
              break;
            case 'rpprname':
              this.setRpprname(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeRolePrivilegeMask(str: string): RolePrivilegeMask {
  try {
    const mask = new RolePrivilegeMask();
    mask.mask = parseInt(str) & 0b11111;
    return mask;
  } catch {
    throw Error('Error deserializing RolePrivilegeMask');
  }
}

export {
  RolePrivilegeMask,
  deserializeRolePrivilegeMask,
};
