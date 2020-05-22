import { Mask } from '../mask';

class CrewMask implements Mask {
        public mask: number;

        constructor(
          cwid = false,
          cwname = false,
          cwan8 = false,
          cwwcmcu = false,
          cwwcdl01 = false,
        ) {
          this.mask = 0b00000;
          if (cwid) { this.setCwid(cwid); }
          if (cwname) { this.setCwname(cwname); }
          if (cwan8) { this.setCwan8(cwan8); }
          if (cwwcmcu) { this.setCwwcmcu(cwwcmcu); }
          if (cwwcdl01) { this.setCwwcdl01(cwwcdl01); }
        }

        getCwid(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setCwid(cwid: boolean): CrewMask {
          if (cwid) this.mask |= 0b10000;
          else this.mask &= 0b01111;
          return this;
        }

        getCwname(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setCwname(cwname: boolean): CrewMask {
          if (cwname) this.mask |= 0b01000;
          else this.mask &= 0b10111;
          return this;
        }

        getCwan8(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setCwan8(cwan8: boolean): CrewMask {
          if (cwan8) this.mask |= 0b00100;
          else this.mask &= 0b11011;
          return this;
        }

        getCwwcmcu(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setCwwcmcu(cwwcmcu: boolean): CrewMask {
          if (cwwcmcu) this.mask |= 0b00010;
          else this.mask &= 0b11101;
          return this;
        }

        getCwwcdl01(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setCwwcdl01(cwwcdl01: boolean): CrewMask {
          if (cwwcdl01) this.mask |= 0b00001;
          else this.mask &= 0b11110;
          return this;
        }

        all(b: boolean): CrewMask {
          this.setCwid(b);
          this.setCwname(b);
          this.setCwan8(b);
          this.setCwwcmcu(b);
          this.setCwwcdl01(b);
          return this;
        }

        keys(b: boolean): CrewMask {
          this.setCwid(b);
          return this;
        }

        attributes(b: boolean): CrewMask {
          this.setCwname(b);
          this.setCwan8(b);
          this.setCwwcmcu(b);
          return this;
        }

        physicals(b: boolean): CrewMask {
          this.setCwid(b);
          this.setCwname(b);
          this.setCwan8(b);
          this.setCwwcmcu(b);
          return this;
        }

        virtuals(b: boolean): CrewMask {
          this.setCwwcdl01(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'cwid':
              return this.getCwid();
            case 'cwname':
              return this.getCwname();
            case 'cwan8':
              return this.getCwan8();
            case 'cwwcmcu':
              return this.getCwwcmcu();
            case 'cwwcdl01':
              return this.getCwwcdl01();
          }
          return false;
        }

        set(p: string, b: boolean): CrewMask {
          switch (p) {
            case 'cwid':
              this.setCwid(b);
              break;
            case 'cwname':
              this.setCwname(b);
              break;
            case 'cwan8':
              this.setCwan8(b);
              break;
            case 'cwwcmcu':
              this.setCwwcmcu(b);
              break;
            case 'cwwcdl01':
              this.setCwwcdl01(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeCrewMask(str: string): CrewMask {
  try {
    const mask = new CrewMask();
    mask.mask = parseInt(str) & 0b11111;
    return mask;
  } catch {
    throw Error('Error deserializing CrewMask');
  }
}

export {
  CrewMask,
  deserializeCrewMask,
};
