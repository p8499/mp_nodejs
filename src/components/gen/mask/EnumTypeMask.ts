import { Mask } from '../mask';

class EnumTypeMask implements Mask {
        public mask: number;

        constructor(
          etid = false,
          etname = false,
        ) {
          this.mask = 0b00;
          if (etid) { this.setEtid(etid); }
          if (etname) { this.setEtname(etname); }
        }

        getEtid(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setEtid(etid: boolean): EnumTypeMask {
          if (etid) this.mask |= 0b10;
          else this.mask &= 0b01;
          return this;
        }

        getEtname(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setEtname(etname: boolean): EnumTypeMask {
          if (etname) this.mask |= 0b01;
          else this.mask &= 0b10;
          return this;
        }

        all(b: boolean): EnumTypeMask {
          this.setEtid(b);
          this.setEtname(b);
          return this;
        }

        keys(b: boolean): EnumTypeMask {
          this.setEtid(b);
          return this;
        }

        attributes(b: boolean): EnumTypeMask {
          this.setEtname(b);
          return this;
        }

        physicals(b: boolean): EnumTypeMask {
          this.setEtid(b);
          this.setEtname(b);
          return this;
        }

        virtuals(b: boolean): EnumTypeMask {
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'etid':
              return this.getEtid();
            case 'etname':
              return this.getEtname();
          }
          return false;
        }

        set(p: string, b: boolean): EnumTypeMask {
          switch (p) {
            case 'etid':
              this.setEtid(b);
              break;
            case 'etname':
              this.setEtname(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeEnumTypeMask(str: string): EnumTypeMask {
  try {
    const mask = new EnumTypeMask();
    mask.mask = parseInt(str) & 0b11;
    return mask;
  } catch {
    throw Error('Error deserializing EnumTypeMask');
  }
}

export {
  EnumTypeMask,
  deserializeEnumTypeMask,
};
