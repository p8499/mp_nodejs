import { Mask } from '../mask';

class EquipmentMask implements Mask {
        public mask: number;

        constructor(
          eqid = false,
          eqserial = false,
          eqnumb = false,
          eqname = false,
          eqcwid = false,
          eqcwname = false,
          eqwcmcu = false,
          eqwcdl01 = false,
        ) {
          this.mask = 0b00000000;
          if (eqid) { this.setEqid(eqid); }
          if (eqserial) { this.setEqserial(eqserial); }
          if (eqnumb) { this.setEqnumb(eqnumb); }
          if (eqname) { this.setEqname(eqname); }
          if (eqcwid) { this.setEqcwid(eqcwid); }
          if (eqcwname) { this.setEqcwname(eqcwname); }
          if (eqwcmcu) { this.setEqwcmcu(eqwcmcu); }
          if (eqwcdl01) { this.setEqwcdl01(eqwcdl01); }
        }

        getEqid(): boolean {
          return (this.mask >> 7 & 1) === 1;
        }

        setEqid(eqid: boolean): EquipmentMask {
          if (eqid) this.mask |= 0b10000000;
          else this.mask &= 0b01111111;
          return this;
        }

        getEqserial(): boolean {
          return (this.mask >> 6 & 1) === 1;
        }

        setEqserial(eqserial: boolean): EquipmentMask {
          if (eqserial) this.mask |= 0b01000000;
          else this.mask &= 0b10111111;
          return this;
        }

        getEqnumb(): boolean {
          return (this.mask >> 5 & 1) === 1;
        }

        setEqnumb(eqnumb: boolean): EquipmentMask {
          if (eqnumb) this.mask |= 0b00100000;
          else this.mask &= 0b11011111;
          return this;
        }

        getEqname(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setEqname(eqname: boolean): EquipmentMask {
          if (eqname) this.mask |= 0b00010000;
          else this.mask &= 0b11101111;
          return this;
        }

        getEqcwid(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setEqcwid(eqcwid: boolean): EquipmentMask {
          if (eqcwid) this.mask |= 0b00001000;
          else this.mask &= 0b11110111;
          return this;
        }

        getEqcwname(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setEqcwname(eqcwname: boolean): EquipmentMask {
          if (eqcwname) this.mask |= 0b00000100;
          else this.mask &= 0b11111011;
          return this;
        }

        getEqwcmcu(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setEqwcmcu(eqwcmcu: boolean): EquipmentMask {
          if (eqwcmcu) this.mask |= 0b00000010;
          else this.mask &= 0b11111101;
          return this;
        }

        getEqwcdl01(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setEqwcdl01(eqwcdl01: boolean): EquipmentMask {
          if (eqwcdl01) this.mask |= 0b00000001;
          else this.mask &= 0b11111110;
          return this;
        }

        all(b: boolean): EquipmentMask {
          this.setEqid(b);
          this.setEqserial(b);
          this.setEqnumb(b);
          this.setEqname(b);
          this.setEqcwid(b);
          this.setEqcwname(b);
          this.setEqwcmcu(b);
          this.setEqwcdl01(b);
          return this;
        }

        keys(b: boolean): EquipmentMask {
          this.setEqid(b);
          return this;
        }

        attributes(b: boolean): EquipmentMask {
          this.setEqserial(b);
          this.setEqnumb(b);
          this.setEqname(b);
          this.setEqcwid(b);
          return this;
        }

        physicals(b: boolean): EquipmentMask {
          this.setEqid(b);
          this.setEqserial(b);
          this.setEqnumb(b);
          this.setEqname(b);
          this.setEqcwid(b);
          return this;
        }

        virtuals(b: boolean): EquipmentMask {
          this.setEqcwname(b);
          this.setEqwcmcu(b);
          this.setEqwcdl01(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'eqid':
              return this.getEqid();
            case 'eqserial':
              return this.getEqserial();
            case 'eqnumb':
              return this.getEqnumb();
            case 'eqname':
              return this.getEqname();
            case 'eqcwid':
              return this.getEqcwid();
            case 'eqcwname':
              return this.getEqcwname();
            case 'eqwcmcu':
              return this.getEqwcmcu();
            case 'eqwcdl01':
              return this.getEqwcdl01();
          }
          return false;
        }

        set(p: string, b: boolean): EquipmentMask {
          switch (p) {
            case 'eqid':
              this.setEqid(b);
              break;
            case 'eqserial':
              this.setEqserial(b);
              break;
            case 'eqnumb':
              this.setEqnumb(b);
              break;
            case 'eqname':
              this.setEqname(b);
              break;
            case 'eqcwid':
              this.setEqcwid(b);
              break;
            case 'eqcwname':
              this.setEqcwname(b);
              break;
            case 'eqwcmcu':
              this.setEqwcmcu(b);
              break;
            case 'eqwcdl01':
              this.setEqwcdl01(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeEquipmentMask(str: string): EquipmentMask {
  try {
    const mask = new EquipmentMask();
    mask.mask = parseInt(str) & 0b11111111;
    return mask;
  } catch {
    throw Error('Error deserializing EquipmentMask');
  }
}

export {
  EquipmentMask,
  deserializeEquipmentMask,
};
