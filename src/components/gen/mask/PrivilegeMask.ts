import { Mask } from '../mask';

class PrivilegeMask implements Mask {
        public mask: number;

        constructor(
          prid = false,
          prname = false,
        ) {
          this.mask = 0b00;
          if (prid) { this.setPrid(prid); }
          if (prname) { this.setPrname(prname); }
        }

        getPrid(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setPrid(prid: boolean): PrivilegeMask {
          if (prid) this.mask |= 0b10;
          else this.mask &= 0b01;
          return this;
        }

        getPrname(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setPrname(prname: boolean): PrivilegeMask {
          if (prname) this.mask |= 0b01;
          else this.mask &= 0b10;
          return this;
        }

        all(b: boolean): PrivilegeMask {
          this.setPrid(b);
          this.setPrname(b);
          return this;
        }

        keys(b: boolean): PrivilegeMask {
          this.setPrid(b);
          return this;
        }

        attributes(b: boolean): PrivilegeMask {
          this.setPrname(b);
          return this;
        }

        physicals(b: boolean): PrivilegeMask {
          this.setPrid(b);
          this.setPrname(b);
          return this;
        }

        virtuals(b: boolean): PrivilegeMask {
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'prid':
              return this.getPrid();
            case 'prname':
              return this.getPrname();
          }
          return false;
        }

        set(p: string, b: boolean): PrivilegeMask {
          switch (p) {
            case 'prid':
              this.setPrid(b);
              break;
            case 'prname':
              this.setPrname(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializePrivilegeMask(str: string): PrivilegeMask {
  try {
    const mask = new PrivilegeMask();
    mask.mask = parseInt(str) & 0b11;
    return mask;
  } catch {
    throw Error('Error deserializing PrivilegeMask');
  }
}

export {
  PrivilegeMask,
  deserializePrivilegeMask,
};
