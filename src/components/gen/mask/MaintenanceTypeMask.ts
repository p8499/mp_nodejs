import { Mask } from '../mask';

class MaintenanceTypeMask implements Mask {
        public mask: number;

        constructor(
          mtid = false,
          mtname = false,
        ) {
          this.mask = 0b00;
          if (mtid) { this.setMtid(mtid); }
          if (mtname) { this.setMtname(mtname); }
        }

        getMtid(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setMtid(mtid: boolean): MaintenanceTypeMask {
          if (mtid) this.mask |= 0b10;
          else this.mask &= 0b01;
          return this;
        }

        getMtname(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setMtname(mtname: boolean): MaintenanceTypeMask {
          if (mtname) this.mask |= 0b01;
          else this.mask &= 0b10;
          return this;
        }

        all(b: boolean): MaintenanceTypeMask {
          this.setMtid(b);
          this.setMtname(b);
          return this;
        }

        keys(b: boolean): MaintenanceTypeMask {
          this.setMtid(b);
          return this;
        }

        attributes(b: boolean): MaintenanceTypeMask {
          this.setMtname(b);
          return this;
        }

        physicals(b: boolean): MaintenanceTypeMask {
          this.setMtid(b);
          this.setMtname(b);
          return this;
        }

        virtuals(b: boolean): MaintenanceTypeMask {
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'mtid':
              return this.getMtid();
            case 'mtname':
              return this.getMtname();
          }
          return false;
        }

        set(p: string, b: boolean): MaintenanceTypeMask {
          switch (p) {
            case 'mtid':
              this.setMtid(b);
              break;
            case 'mtname':
              this.setMtname(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeMaintenanceTypeMask(str: string): MaintenanceTypeMask {
  try {
    const mask = new MaintenanceTypeMask();
    mask.mask = parseInt(str) & 0b11;
    return mask;
  } catch {
    throw Error('Error deserializing MaintenanceTypeMask');
  }
}

export {
  MaintenanceTypeMask,
  deserializeMaintenanceTypeMask,
};
