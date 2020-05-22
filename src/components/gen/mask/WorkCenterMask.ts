import { Mask } from '../mask';

class WorkCenterMask implements Mask {
        public mask: number;

        constructor(
          wcmcu = false,
          wcdl01 = false,
        ) {
          this.mask = 0b00;
          if (wcmcu) { this.setWcmcu(wcmcu); }
          if (wcdl01) { this.setWcdl01(wcdl01); }
        }

        getWcmcu(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setWcmcu(wcmcu: boolean): WorkCenterMask {
          if (wcmcu) this.mask |= 0b10;
          else this.mask &= 0b01;
          return this;
        }

        getWcdl01(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setWcdl01(wcdl01: boolean): WorkCenterMask {
          if (wcdl01) this.mask |= 0b01;
          else this.mask &= 0b10;
          return this;
        }

        all(b: boolean): WorkCenterMask {
          this.setWcmcu(b);
          this.setWcdl01(b);
          return this;
        }

        keys(b: boolean): WorkCenterMask {
          this.setWcmcu(b);
          return this;
        }

        attributes(b: boolean): WorkCenterMask {
          this.setWcdl01(b);
          return this;
        }

        physicals(b: boolean): WorkCenterMask {
          this.setWcmcu(b);
          this.setWcdl01(b);
          return this;
        }

        virtuals(b: boolean): WorkCenterMask {
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'wcmcu':
              return this.getWcmcu();
            case 'wcdl01':
              return this.getWcdl01();
          }
          return false;
        }

        set(p: string, b: boolean): WorkCenterMask {
          switch (p) {
            case 'wcmcu':
              this.setWcmcu(b);
              break;
            case 'wcdl01':
              this.setWcdl01(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeWorkCenterMask(str: string): WorkCenterMask {
  try {
    const mask = new WorkCenterMask();
    mask.mask = parseInt(str) & 0b11;
    return mask;
  } catch {
    throw Error('Error deserializing WorkCenterMask');
  }
}

export {
  WorkCenterMask,
  deserializeWorkCenterMask,
};
