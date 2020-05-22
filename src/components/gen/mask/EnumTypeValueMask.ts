import { Mask } from '../mask';

class EnumTypeValueMask implements Mask {
        public mask: number;

        constructor(
          evid = false,
          evetid = false,
          evval = false,
          evdescription = false,
          evetname = false,
        ) {
          this.mask = 0b00000;
          if (evid) { this.setEvid(evid); }
          if (evetid) { this.setEvetid(evetid); }
          if (evval) { this.setEvval(evval); }
          if (evdescription) { this.setEvdescription(evdescription); }
          if (evetname) { this.setEvetname(evetname); }
        }

        getEvid(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setEvid(evid: boolean): EnumTypeValueMask {
          if (evid) this.mask |= 0b10000;
          else this.mask &= 0b01111;
          return this;
        }

        getEvetid(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setEvetid(evetid: boolean): EnumTypeValueMask {
          if (evetid) this.mask |= 0b01000;
          else this.mask &= 0b10111;
          return this;
        }

        getEvval(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setEvval(evval: boolean): EnumTypeValueMask {
          if (evval) this.mask |= 0b00100;
          else this.mask &= 0b11011;
          return this;
        }

        getEvdescription(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setEvdescription(evdescription: boolean): EnumTypeValueMask {
          if (evdescription) this.mask |= 0b00010;
          else this.mask &= 0b11101;
          return this;
        }

        getEvetname(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setEvetname(evetname: boolean): EnumTypeValueMask {
          if (evetname) this.mask |= 0b00001;
          else this.mask &= 0b11110;
          return this;
        }

        all(b: boolean): EnumTypeValueMask {
          this.setEvid(b);
          this.setEvetid(b);
          this.setEvval(b);
          this.setEvdescription(b);
          this.setEvetname(b);
          return this;
        }

        keys(b: boolean): EnumTypeValueMask {
          this.setEvid(b);
          return this;
        }

        attributes(b: boolean): EnumTypeValueMask {
          this.setEvetid(b);
          this.setEvval(b);
          this.setEvdescription(b);
          return this;
        }

        physicals(b: boolean): EnumTypeValueMask {
          this.setEvid(b);
          this.setEvetid(b);
          this.setEvval(b);
          this.setEvdescription(b);
          return this;
        }

        virtuals(b: boolean): EnumTypeValueMask {
          this.setEvetname(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'evid':
              return this.getEvid();
            case 'evetid':
              return this.getEvetid();
            case 'evval':
              return this.getEvval();
            case 'evdescription':
              return this.getEvdescription();
            case 'evetname':
              return this.getEvetname();
          }
          return false;
        }

        set(p: string, b: boolean): EnumTypeValueMask {
          switch (p) {
            case 'evid':
              this.setEvid(b);
              break;
            case 'evetid':
              this.setEvetid(b);
              break;
            case 'evval':
              this.setEvval(b);
              break;
            case 'evdescription':
              this.setEvdescription(b);
              break;
            case 'evetname':
              this.setEvetname(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeEnumTypeValueMask(str: string): EnumTypeValueMask {
  try {
    const mask = new EnumTypeValueMask();
    mask.mask = parseInt(str) & 0b11111;
    return mask;
  } catch {
    throw Error('Error deserializing EnumTypeValueMask');
  }
}

export {
  EnumTypeValueMask,
  deserializeEnumTypeValueMask,
};
