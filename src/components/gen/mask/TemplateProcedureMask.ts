import { Mask } from '../mask';

class TemplateProcedureMask implements Mask {
        public mask: number;

        constructor(
          tpid = false,
          tpttid = false,
          tpseq = false,
          tpdescription = false,
          tpphoto = false,
          tpttname = false,
          tptttype = false,
          tpsize = false,
        ) {
          this.mask = 0b00000000;
          if (tpid) { this.setTpid(tpid); }
          if (tpttid) { this.setTpttid(tpttid); }
          if (tpseq) { this.setTpseq(tpseq); }
          if (tpdescription) { this.setTpdescription(tpdescription); }
          if (tpphoto) { this.setTpphoto(tpphoto); }
          if (tpttname) { this.setTpttname(tpttname); }
          if (tptttype) { this.setTptttype(tptttype); }
          if (tpsize) { this.setTpsize(tpsize); }
        }

        getTpid(): boolean {
          return (this.mask >> 7 & 1) === 1;
        }

        setTpid(tpid: boolean): TemplateProcedureMask {
          if (tpid) this.mask |= 0b10000000;
          else this.mask &= 0b01111111;
          return this;
        }

        getTpttid(): boolean {
          return (this.mask >> 6 & 1) === 1;
        }

        setTpttid(tpttid: boolean): TemplateProcedureMask {
          if (tpttid) this.mask |= 0b01000000;
          else this.mask &= 0b10111111;
          return this;
        }

        getTpseq(): boolean {
          return (this.mask >> 5 & 1) === 1;
        }

        setTpseq(tpseq: boolean): TemplateProcedureMask {
          if (tpseq) this.mask |= 0b00100000;
          else this.mask &= 0b11011111;
          return this;
        }

        getTpdescription(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setTpdescription(tpdescription: boolean): TemplateProcedureMask {
          if (tpdescription) this.mask |= 0b00010000;
          else this.mask &= 0b11101111;
          return this;
        }

        getTpphoto(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setTpphoto(tpphoto: boolean): TemplateProcedureMask {
          if (tpphoto) this.mask |= 0b00001000;
          else this.mask &= 0b11110111;
          return this;
        }

        getTpttname(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setTpttname(tpttname: boolean): TemplateProcedureMask {
          if (tpttname) this.mask |= 0b00000100;
          else this.mask &= 0b11111011;
          return this;
        }

        getTptttype(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setTptttype(tptttype: boolean): TemplateProcedureMask {
          if (tptttype) this.mask |= 0b00000010;
          else this.mask &= 0b11111101;
          return this;
        }

        getTpsize(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setTpsize(tpsize: boolean): TemplateProcedureMask {
          if (tpsize) this.mask |= 0b00000001;
          else this.mask &= 0b11111110;
          return this;
        }

        all(b: boolean): TemplateProcedureMask {
          this.setTpid(b);
          this.setTpttid(b);
          this.setTpseq(b);
          this.setTpdescription(b);
          this.setTpphoto(b);
          this.setTpttname(b);
          this.setTptttype(b);
          this.setTpsize(b);
          return this;
        }

        keys(b: boolean): TemplateProcedureMask {
          this.setTpid(b);
          return this;
        }

        attributes(b: boolean): TemplateProcedureMask {
          this.setTpttid(b);
          this.setTpseq(b);
          this.setTpdescription(b);
          this.setTpphoto(b);
          return this;
        }

        physicals(b: boolean): TemplateProcedureMask {
          this.setTpid(b);
          this.setTpttid(b);
          this.setTpseq(b);
          this.setTpdescription(b);
          this.setTpphoto(b);
          return this;
        }

        virtuals(b: boolean): TemplateProcedureMask {
          this.setTpttname(b);
          this.setTptttype(b);
          this.setTpsize(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'tpid':
              return this.getTpid();
            case 'tpttid':
              return this.getTpttid();
            case 'tpseq':
              return this.getTpseq();
            case 'tpdescription':
              return this.getTpdescription();
            case 'tpphoto':
              return this.getTpphoto();
            case 'tpttname':
              return this.getTpttname();
            case 'tptttype':
              return this.getTptttype();
            case 'tpsize':
              return this.getTpsize();
          }
          return false;
        }

        set(p: string, b: boolean): TemplateProcedureMask {
          switch (p) {
            case 'tpid':
              this.setTpid(b);
              break;
            case 'tpttid':
              this.setTpttid(b);
              break;
            case 'tpseq':
              this.setTpseq(b);
              break;
            case 'tpdescription':
              this.setTpdescription(b);
              break;
            case 'tpphoto':
              this.setTpphoto(b);
              break;
            case 'tpttname':
              this.setTpttname(b);
              break;
            case 'tptttype':
              this.setTptttype(b);
              break;
            case 'tpsize':
              this.setTpsize(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeTemplateProcedureMask(str: string): TemplateProcedureMask {
  try {
    const mask = new TemplateProcedureMask();
    mask.mask = parseInt(str) & 0b11111111;
    return mask;
  } catch {
    throw Error('Error deserializing TemplateProcedureMask');
  }
}

export {
  TemplateProcedureMask,
  deserializeTemplateProcedureMask,
};
