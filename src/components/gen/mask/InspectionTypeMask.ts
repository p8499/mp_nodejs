import { Mask } from '../mask';

class InspectionTypeMask implements Mask {
        public mask: number;

        constructor(
          itid = false,
          itname = false,
        ) {
          this.mask = 0b00;
          if (itid) { this.setItid(itid); }
          if (itname) { this.setItname(itname); }
        }

        getItid(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setItid(itid: boolean): InspectionTypeMask {
          if (itid) this.mask |= 0b10;
          else this.mask &= 0b01;
          return this;
        }

        getItname(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setItname(itname: boolean): InspectionTypeMask {
          if (itname) this.mask |= 0b01;
          else this.mask &= 0b10;
          return this;
        }

        all(b: boolean): InspectionTypeMask {
          this.setItid(b);
          this.setItname(b);
          return this;
        }

        keys(b: boolean): InspectionTypeMask {
          this.setItid(b);
          return this;
        }

        attributes(b: boolean): InspectionTypeMask {
          this.setItname(b);
          return this;
        }

        physicals(b: boolean): InspectionTypeMask {
          this.setItid(b);
          this.setItname(b);
          return this;
        }

        virtuals(b: boolean): InspectionTypeMask {
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'itid':
              return this.getItid();
            case 'itname':
              return this.getItname();
          }
          return false;
        }

        set(p: string, b: boolean): InspectionTypeMask {
          switch (p) {
            case 'itid':
              this.setItid(b);
              break;
            case 'itname':
              this.setItname(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeInspectionTypeMask(str: string): InspectionTypeMask {
  try {
    const mask = new InspectionTypeMask();
    mask.mask = parseInt(str) & 0b11;
    return mask;
  } catch {
    throw Error('Error deserializing InspectionTypeMask');
  }
}

export {
  InspectionTypeMask,
  deserializeInspectionTypeMask,
};
