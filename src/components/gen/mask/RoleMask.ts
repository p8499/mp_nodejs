import { Mask } from '../mask';

class RoleMask implements Mask {
        public mask: number;

        constructor(
          roid = false,
          roname = false,
        ) {
          this.mask = 0b00;
          if (roid) { this.setRoid(roid); }
          if (roname) { this.setRoname(roname); }
        }

        getRoid(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setRoid(roid: boolean): RoleMask {
          if (roid) this.mask |= 0b10;
          else this.mask &= 0b01;
          return this;
        }

        getRoname(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setRoname(roname: boolean): RoleMask {
          if (roname) this.mask |= 0b01;
          else this.mask &= 0b10;
          return this;
        }

        all(b: boolean): RoleMask {
          this.setRoid(b);
          this.setRoname(b);
          return this;
        }

        keys(b: boolean): RoleMask {
          this.setRoid(b);
          return this;
        }

        attributes(b: boolean): RoleMask {
          this.setRoname(b);
          return this;
        }

        physicals(b: boolean): RoleMask {
          this.setRoid(b);
          this.setRoname(b);
          return this;
        }

        virtuals(b: boolean): RoleMask {
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'roid':
              return this.getRoid();
            case 'roname':
              return this.getRoname();
          }
          return false;
        }

        set(p: string, b: boolean): RoleMask {
          switch (p) {
            case 'roid':
              this.setRoid(b);
              break;
            case 'roname':
              this.setRoname(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeRoleMask(str: string): RoleMask {
  try {
    const mask = new RoleMask();
    mask.mask = parseInt(str) & 0b11;
    return mask;
  } catch {
    throw Error('Error deserializing RoleMask');
  }
}

export {
  RoleMask,
  deserializeRoleMask,
};
