import { Mask } from '../mask';

class TemplateMeasurementMask implements Mask {
        public mask: number;

        constructor(
          tsid = false,
          tstpid = false,
          tsseq = false,
          tsname = false,
          tsetid = false,
          tsmin = false,
          tsmax = false,
          tsunit = false,
          tsphoto = false,
          tsttid = false,
          tsttname = false,
          tstttype = false,
          tstpseq = false,
          tstpdescription = false,
          tstpphoto = false,
        ) {
          this.mask = 0b000000000000000;
          if (tsid) { this.setTsid(tsid); }
          if (tstpid) { this.setTstpid(tstpid); }
          if (tsseq) { this.setTsseq(tsseq); }
          if (tsname) { this.setTsname(tsname); }
          if (tsetid) { this.setTsetid(tsetid); }
          if (tsmin) { this.setTsmin(tsmin); }
          if (tsmax) { this.setTsmax(tsmax); }
          if (tsunit) { this.setTsunit(tsunit); }
          if (tsphoto) { this.setTsphoto(tsphoto); }
          if (tsttid) { this.setTsttid(tsttid); }
          if (tsttname) { this.setTsttname(tsttname); }
          if (tstttype) { this.setTstttype(tstttype); }
          if (tstpseq) { this.setTstpseq(tstpseq); }
          if (tstpdescription) { this.setTstpdescription(tstpdescription); }
          if (tstpphoto) { this.setTstpphoto(tstpphoto); }
        }

        getTsid(): boolean {
          return (this.mask >> 14 & 1) === 1;
        }

        setTsid(tsid: boolean): TemplateMeasurementMask {
          if (tsid) this.mask |= 0b100000000000000;
          else this.mask &= 0b011111111111111;
          return this;
        }

        getTstpid(): boolean {
          return (this.mask >> 13 & 1) === 1;
        }

        setTstpid(tstpid: boolean): TemplateMeasurementMask {
          if (tstpid) this.mask |= 0b010000000000000;
          else this.mask &= 0b101111111111111;
          return this;
        }

        getTsseq(): boolean {
          return (this.mask >> 12 & 1) === 1;
        }

        setTsseq(tsseq: boolean): TemplateMeasurementMask {
          if (tsseq) this.mask |= 0b001000000000000;
          else this.mask &= 0b110111111111111;
          return this;
        }

        getTsname(): boolean {
          return (this.mask >> 11 & 1) === 1;
        }

        setTsname(tsname: boolean): TemplateMeasurementMask {
          if (tsname) this.mask |= 0b000100000000000;
          else this.mask &= 0b111011111111111;
          return this;
        }

        getTsetid(): boolean {
          return (this.mask >> 10 & 1) === 1;
        }

        setTsetid(tsetid: boolean): TemplateMeasurementMask {
          if (tsetid) this.mask |= 0b000010000000000;
          else this.mask &= 0b111101111111111;
          return this;
        }

        getTsmin(): boolean {
          return (this.mask >> 9 & 1) === 1;
        }

        setTsmin(tsmin: boolean): TemplateMeasurementMask {
          if (tsmin) this.mask |= 0b000001000000000;
          else this.mask &= 0b111110111111111;
          return this;
        }

        getTsmax(): boolean {
          return (this.mask >> 8 & 1) === 1;
        }

        setTsmax(tsmax: boolean): TemplateMeasurementMask {
          if (tsmax) this.mask |= 0b000000100000000;
          else this.mask &= 0b111111011111111;
          return this;
        }

        getTsunit(): boolean {
          return (this.mask >> 7 & 1) === 1;
        }

        setTsunit(tsunit: boolean): TemplateMeasurementMask {
          if (tsunit) this.mask |= 0b000000010000000;
          else this.mask &= 0b111111101111111;
          return this;
        }

        getTsphoto(): boolean {
          return (this.mask >> 6 & 1) === 1;
        }

        setTsphoto(tsphoto: boolean): TemplateMeasurementMask {
          if (tsphoto) this.mask |= 0b000000001000000;
          else this.mask &= 0b111111110111111;
          return this;
        }

        getTsttid(): boolean {
          return (this.mask >> 5 & 1) === 1;
        }

        setTsttid(tsttid: boolean): TemplateMeasurementMask {
          if (tsttid) this.mask |= 0b000000000100000;
          else this.mask &= 0b111111111011111;
          return this;
        }

        getTsttname(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setTsttname(tsttname: boolean): TemplateMeasurementMask {
          if (tsttname) this.mask |= 0b000000000010000;
          else this.mask &= 0b111111111101111;
          return this;
        }

        getTstttype(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setTstttype(tstttype: boolean): TemplateMeasurementMask {
          if (tstttype) this.mask |= 0b000000000001000;
          else this.mask &= 0b111111111110111;
          return this;
        }

        getTstpseq(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setTstpseq(tstpseq: boolean): TemplateMeasurementMask {
          if (tstpseq) this.mask |= 0b000000000000100;
          else this.mask &= 0b111111111111011;
          return this;
        }

        getTstpdescription(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setTstpdescription(tstpdescription: boolean): TemplateMeasurementMask {
          if (tstpdescription) this.mask |= 0b000000000000010;
          else this.mask &= 0b111111111111101;
          return this;
        }

        getTstpphoto(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setTstpphoto(tstpphoto: boolean): TemplateMeasurementMask {
          if (tstpphoto) this.mask |= 0b000000000000001;
          else this.mask &= 0b111111111111110;
          return this;
        }

        all(b: boolean): TemplateMeasurementMask {
          this.setTsid(b);
          this.setTstpid(b);
          this.setTsseq(b);
          this.setTsname(b);
          this.setTsetid(b);
          this.setTsmin(b);
          this.setTsmax(b);
          this.setTsunit(b);
          this.setTsphoto(b);
          this.setTsttid(b);
          this.setTsttname(b);
          this.setTstttype(b);
          this.setTstpseq(b);
          this.setTstpdescription(b);
          this.setTstpphoto(b);
          return this;
        }

        keys(b: boolean): TemplateMeasurementMask {
          this.setTsid(b);
          return this;
        }

        attributes(b: boolean): TemplateMeasurementMask {
          this.setTstpid(b);
          this.setTsseq(b);
          this.setTsname(b);
          this.setTsetid(b);
          this.setTsmin(b);
          this.setTsmax(b);
          this.setTsunit(b);
          this.setTsphoto(b);
          return this;
        }

        physicals(b: boolean): TemplateMeasurementMask {
          this.setTsid(b);
          this.setTstpid(b);
          this.setTsseq(b);
          this.setTsname(b);
          this.setTsetid(b);
          this.setTsmin(b);
          this.setTsmax(b);
          this.setTsunit(b);
          this.setTsphoto(b);
          return this;
        }

        virtuals(b: boolean): TemplateMeasurementMask {
          this.setTsttid(b);
          this.setTsttname(b);
          this.setTstttype(b);
          this.setTstpseq(b);
          this.setTstpdescription(b);
          this.setTstpphoto(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'tsid':
              return this.getTsid();
            case 'tstpid':
              return this.getTstpid();
            case 'tsseq':
              return this.getTsseq();
            case 'tsname':
              return this.getTsname();
            case 'tsetid':
              return this.getTsetid();
            case 'tsmin':
              return this.getTsmin();
            case 'tsmax':
              return this.getTsmax();
            case 'tsunit':
              return this.getTsunit();
            case 'tsphoto':
              return this.getTsphoto();
            case 'tsttid':
              return this.getTsttid();
            case 'tsttname':
              return this.getTsttname();
            case 'tstttype':
              return this.getTstttype();
            case 'tstpseq':
              return this.getTstpseq();
            case 'tstpdescription':
              return this.getTstpdescription();
            case 'tstpphoto':
              return this.getTstpphoto();
          }
          return false;
        }

        set(p: string, b: boolean): TemplateMeasurementMask {
          switch (p) {
            case 'tsid':
              this.setTsid(b);
              break;
            case 'tstpid':
              this.setTstpid(b);
              break;
            case 'tsseq':
              this.setTsseq(b);
              break;
            case 'tsname':
              this.setTsname(b);
              break;
            case 'tsetid':
              this.setTsetid(b);
              break;
            case 'tsmin':
              this.setTsmin(b);
              break;
            case 'tsmax':
              this.setTsmax(b);
              break;
            case 'tsunit':
              this.setTsunit(b);
              break;
            case 'tsphoto':
              this.setTsphoto(b);
              break;
            case 'tsttid':
              this.setTsttid(b);
              break;
            case 'tsttname':
              this.setTsttname(b);
              break;
            case 'tstttype':
              this.setTstttype(b);
              break;
            case 'tstpseq':
              this.setTstpseq(b);
              break;
            case 'tstpdescription':
              this.setTstpdescription(b);
              break;
            case 'tstpphoto':
              this.setTstpphoto(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeTemplateMeasurementMask(str: string): TemplateMeasurementMask {
  try {
    const mask = new TemplateMeasurementMask();
    mask.mask = parseInt(str) & 0b111111111111111;
    return mask;
  } catch {
    throw Error('Error deserializing TemplateMeasurementMask');
  }
}

export {
  TemplateMeasurementMask,
  deserializeTemplateMeasurementMask,
};
