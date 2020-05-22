import { Mask } from '../mask';

class CrewUserMask implements Mask {
        public mask: number;

        constructor(
          cuid = false,
          cucwid = false,
          cucwname = false,
          cuwcmcu = false,
          cuwcdl01 = false,
          cuusid = false,
          cuusname = false,
        ) {
          this.mask = 0b0000000;
          if (cuid) { this.setCuid(cuid); }
          if (cucwid) { this.setCucwid(cucwid); }
          if (cucwname) { this.setCucwname(cucwname); }
          if (cuwcmcu) { this.setCuwcmcu(cuwcmcu); }
          if (cuwcdl01) { this.setCuwcdl01(cuwcdl01); }
          if (cuusid) { this.setCuusid(cuusid); }
          if (cuusname) { this.setCuusname(cuusname); }
        }

        getCuid(): boolean {
          return (this.mask >> 6 & 1) === 1;
        }

        setCuid(cuid: boolean): CrewUserMask {
          if (cuid) this.mask |= 0b1000000;
          else this.mask &= 0b0111111;
          return this;
        }

        getCucwid(): boolean {
          return (this.mask >> 5 & 1) === 1;
        }

        setCucwid(cucwid: boolean): CrewUserMask {
          if (cucwid) this.mask |= 0b0100000;
          else this.mask &= 0b1011111;
          return this;
        }

        getCucwname(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setCucwname(cucwname: boolean): CrewUserMask {
          if (cucwname) this.mask |= 0b0010000;
          else this.mask &= 0b1101111;
          return this;
        }

        getCuwcmcu(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setCuwcmcu(cuwcmcu: boolean): CrewUserMask {
          if (cuwcmcu) this.mask |= 0b0001000;
          else this.mask &= 0b1110111;
          return this;
        }

        getCuwcdl01(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setCuwcdl01(cuwcdl01: boolean): CrewUserMask {
          if (cuwcdl01) this.mask |= 0b0000100;
          else this.mask &= 0b1111011;
          return this;
        }

        getCuusid(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setCuusid(cuusid: boolean): CrewUserMask {
          if (cuusid) this.mask |= 0b0000010;
          else this.mask &= 0b1111101;
          return this;
        }

        getCuusname(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setCuusname(cuusname: boolean): CrewUserMask {
          if (cuusname) this.mask |= 0b0000001;
          else this.mask &= 0b1111110;
          return this;
        }

        all(b: boolean): CrewUserMask {
          this.setCuid(b);
          this.setCucwid(b);
          this.setCucwname(b);
          this.setCuwcmcu(b);
          this.setCuwcdl01(b);
          this.setCuusid(b);
          this.setCuusname(b);
          return this;
        }

        keys(b: boolean): CrewUserMask {
          this.setCuid(b);
          return this;
        }

        attributes(b: boolean): CrewUserMask {
          this.setCucwid(b);
          this.setCuusid(b);
          return this;
        }

        physicals(b: boolean): CrewUserMask {
          this.setCuid(b);
          this.setCucwid(b);
          this.setCuusid(b);
          return this;
        }

        virtuals(b: boolean): CrewUserMask {
          this.setCucwname(b);
          this.setCuwcmcu(b);
          this.setCuwcdl01(b);
          this.setCuusname(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'cuid':
              return this.getCuid();
            case 'cucwid':
              return this.getCucwid();
            case 'cucwname':
              return this.getCucwname();
            case 'cuwcmcu':
              return this.getCuwcmcu();
            case 'cuwcdl01':
              return this.getCuwcdl01();
            case 'cuusid':
              return this.getCuusid();
            case 'cuusname':
              return this.getCuusname();
          }
          return false;
        }

        set(p: string, b: boolean): CrewUserMask {
          switch (p) {
            case 'cuid':
              this.setCuid(b);
              break;
            case 'cucwid':
              this.setCucwid(b);
              break;
            case 'cucwname':
              this.setCucwname(b);
              break;
            case 'cuwcmcu':
              this.setCuwcmcu(b);
              break;
            case 'cuwcdl01':
              this.setCuwcdl01(b);
              break;
            case 'cuusid':
              this.setCuusid(b);
              break;
            case 'cuusname':
              this.setCuusname(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeCrewUserMask(str: string): CrewUserMask {
  try {
    const mask = new CrewUserMask();
    mask.mask = parseInt(str) & 0b1111111;
    return mask;
  } catch {
    throw Error('Error deserializing CrewUserMask');
  }
}

export {
  CrewUserMask,
  deserializeCrewUserMask,
};
