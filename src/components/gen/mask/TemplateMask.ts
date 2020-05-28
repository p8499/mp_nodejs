import { Mask } from '../mask';

class TemplateMask implements Mask {
        public mask: number;

        constructor(
          ttid = false,
          ttname = false,
          tttype = false,
          ttsize = false,
        ) {
          this.mask = 0b0000;
          if (ttid) { this.setTtid(ttid); }
          if (ttname) { this.setTtname(ttname); }
          if (tttype) { this.setTttype(tttype); }
          if (ttsize) { this.setTtsize(ttsize); }
        }

        getTtid(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setTtid(ttid: boolean): TemplateMask {
          if (ttid) this.mask |= 0b1000;
          else this.mask &= 0b0111;
          return this;
        }

        getTtname(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setTtname(ttname: boolean): TemplateMask {
          if (ttname) this.mask |= 0b0100;
          else this.mask &= 0b1011;
          return this;
        }

        getTttype(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setTttype(tttype: boolean): TemplateMask {
          if (tttype) this.mask |= 0b0010;
          else this.mask &= 0b1101;
          return this;
        }

        getTtsize(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setTtsize(ttsize: boolean): TemplateMask {
          if (ttsize) this.mask |= 0b0001;
          else this.mask &= 0b1110;
          return this;
        }

        all(b: boolean): TemplateMask {
          this.setTtid(b);
          this.setTtname(b);
          this.setTttype(b);
          this.setTtsize(b);
          return this;
        }

        keys(b: boolean): TemplateMask {
          this.setTtid(b);
          return this;
        }

        attributes(b: boolean): TemplateMask {
          this.setTtname(b);
          this.setTttype(b);
          return this;
        }

        physicals(b: boolean): TemplateMask {
          this.setTtid(b);
          this.setTtname(b);
          this.setTttype(b);
          return this;
        }

        virtuals(b: boolean): TemplateMask {
          this.setTtsize(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'ttid':
              return this.getTtid();
            case 'ttname':
              return this.getTtname();
            case 'tttype':
              return this.getTttype();
            case 'ttsize':
              return this.getTtsize();
          }
          return false;
        }

        set(p: string, b: boolean): TemplateMask {
          switch (p) {
            case 'ttid':
              this.setTtid(b);
              break;
            case 'ttname':
              this.setTtname(b);
              break;
            case 'tttype':
              this.setTttype(b);
              break;
            case 'ttsize':
              this.setTtsize(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeTemplateMask(str: string): TemplateMask {
  try {
    const mask = new TemplateMask();
    mask.mask = parseInt(str) & 0b1111;
    return mask;
  } catch {
    throw Error('Error deserializing TemplateMask');
  }
}

export {
  TemplateMask,
  deserializeTemplateMask,
};
