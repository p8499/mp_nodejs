import { Mask } from '../mask';

class RoomMask implements Mask {
        public mask: number;

        constructor(
          rmid = false,
          rmserial = false,
          rman8 = false,
          rmname = false,
          rmcwid = false,
          rmcwname = false,
          rmwcmcu = false,
          rmwcdl01 = false,
        ) {
          this.mask = 0b00000000;
          if (rmid) { this.setRmid(rmid); }
          if (rmserial) { this.setRmserial(rmserial); }
          if (rman8) { this.setRman8(rman8); }
          if (rmname) { this.setRmname(rmname); }
          if (rmcwid) { this.setRmcwid(rmcwid); }
          if (rmcwname) { this.setRmcwname(rmcwname); }
          if (rmwcmcu) { this.setRmwcmcu(rmwcmcu); }
          if (rmwcdl01) { this.setRmwcdl01(rmwcdl01); }
        }

        getRmid(): boolean {
          return (this.mask >> 7 & 1) === 1;
        }

        setRmid(rmid: boolean): RoomMask {
          if (rmid) this.mask |= 0b10000000;
          else this.mask &= 0b01111111;
          return this;
        }

        getRmserial(): boolean {
          return (this.mask >> 6 & 1) === 1;
        }

        setRmserial(rmserial: boolean): RoomMask {
          if (rmserial) this.mask |= 0b01000000;
          else this.mask &= 0b10111111;
          return this;
        }

        getRman8(): boolean {
          return (this.mask >> 5 & 1) === 1;
        }

        setRman8(rman8: boolean): RoomMask {
          if (rman8) this.mask |= 0b00100000;
          else this.mask &= 0b11011111;
          return this;
        }

        getRmname(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setRmname(rmname: boolean): RoomMask {
          if (rmname) this.mask |= 0b00010000;
          else this.mask &= 0b11101111;
          return this;
        }

        getRmcwid(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setRmcwid(rmcwid: boolean): RoomMask {
          if (rmcwid) this.mask |= 0b00001000;
          else this.mask &= 0b11110111;
          return this;
        }

        getRmcwname(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setRmcwname(rmcwname: boolean): RoomMask {
          if (rmcwname) this.mask |= 0b00000100;
          else this.mask &= 0b11111011;
          return this;
        }

        getRmwcmcu(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setRmwcmcu(rmwcmcu: boolean): RoomMask {
          if (rmwcmcu) this.mask |= 0b00000010;
          else this.mask &= 0b11111101;
          return this;
        }

        getRmwcdl01(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setRmwcdl01(rmwcdl01: boolean): RoomMask {
          if (rmwcdl01) this.mask |= 0b00000001;
          else this.mask &= 0b11111110;
          return this;
        }

        all(b: boolean): RoomMask {
          this.setRmid(b);
          this.setRmserial(b);
          this.setRman8(b);
          this.setRmname(b);
          this.setRmcwid(b);
          this.setRmcwname(b);
          this.setRmwcmcu(b);
          this.setRmwcdl01(b);
          return this;
        }

        keys(b: boolean): RoomMask {
          this.setRmid(b);
          return this;
        }

        attributes(b: boolean): RoomMask {
          this.setRmserial(b);
          this.setRman8(b);
          this.setRmname(b);
          this.setRmcwid(b);
          return this;
        }

        physicals(b: boolean): RoomMask {
          this.setRmid(b);
          this.setRmserial(b);
          this.setRman8(b);
          this.setRmname(b);
          this.setRmcwid(b);
          return this;
        }

        virtuals(b: boolean): RoomMask {
          this.setRmcwname(b);
          this.setRmwcmcu(b);
          this.setRmwcdl01(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'rmid':
              return this.getRmid();
            case 'rmserial':
              return this.getRmserial();
            case 'rman8':
              return this.getRman8();
            case 'rmname':
              return this.getRmname();
            case 'rmcwid':
              return this.getRmcwid();
            case 'rmcwname':
              return this.getRmcwname();
            case 'rmwcmcu':
              return this.getRmwcmcu();
            case 'rmwcdl01':
              return this.getRmwcdl01();
          }
          return false;
        }

        set(p: string, b: boolean): RoomMask {
          switch (p) {
            case 'rmid':
              this.setRmid(b);
              break;
            case 'rmserial':
              this.setRmserial(b);
              break;
            case 'rman8':
              this.setRman8(b);
              break;
            case 'rmname':
              this.setRmname(b);
              break;
            case 'rmcwid':
              this.setRmcwid(b);
              break;
            case 'rmcwname':
              this.setRmcwname(b);
              break;
            case 'rmwcmcu':
              this.setRmwcmcu(b);
              break;
            case 'rmwcdl01':
              this.setRmwcdl01(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeRoomMask(str: string): RoomMask {
  try {
    const mask = new RoomMask();
    mask.mask = parseInt(str) & 0b11111111;
    return mask;
  } catch {
    throw Error('Error deserializing RoomMask');
  }
}

export {
  RoomMask,
  deserializeRoomMask,
};
