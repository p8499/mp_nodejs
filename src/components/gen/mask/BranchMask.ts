import { Mask } from '../mask';

class BranchMask implements Mask {
        public mask: number;

        constructor(
          bpmcu = false,
          bpdl01 = false,
          bpwcmcu = false,
          bpwcdl01 = false,
        ) {
          this.mask = 0b0000;
          if (bpmcu) { this.setBpmcu(bpmcu); }
          if (bpdl01) { this.setBpdl01(bpdl01); }
          if (bpwcmcu) { this.setBpwcmcu(bpwcmcu); }
          if (bpwcdl01) { this.setBpwcdl01(bpwcdl01); }
        }

        getBpmcu(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setBpmcu(bpmcu: boolean): BranchMask {
          if (bpmcu) this.mask |= 0b1000;
          else this.mask &= 0b0111;
          return this;
        }

        getBpdl01(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setBpdl01(bpdl01: boolean): BranchMask {
          if (bpdl01) this.mask |= 0b0100;
          else this.mask &= 0b1011;
          return this;
        }

        getBpwcmcu(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setBpwcmcu(bpwcmcu: boolean): BranchMask {
          if (bpwcmcu) this.mask |= 0b0010;
          else this.mask &= 0b1101;
          return this;
        }

        getBpwcdl01(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setBpwcdl01(bpwcdl01: boolean): BranchMask {
          if (bpwcdl01) this.mask |= 0b0001;
          else this.mask &= 0b1110;
          return this;
        }

        all(b: boolean): BranchMask {
          this.setBpmcu(b);
          this.setBpdl01(b);
          this.setBpwcmcu(b);
          this.setBpwcdl01(b);
          return this;
        }

        keys(b: boolean): BranchMask {
          this.setBpmcu(b);
          return this;
        }

        attributes(b: boolean): BranchMask {
          this.setBpdl01(b);
          this.setBpwcmcu(b);
          return this;
        }

        physicals(b: boolean): BranchMask {
          this.setBpmcu(b);
          this.setBpdl01(b);
          this.setBpwcmcu(b);
          return this;
        }

        virtuals(b: boolean): BranchMask {
          this.setBpwcdl01(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'bpmcu':
              return this.getBpmcu();
            case 'bpdl01':
              return this.getBpdl01();
            case 'bpwcmcu':
              return this.getBpwcmcu();
            case 'bpwcdl01':
              return this.getBpwcdl01();
          }
          return false;
        }

        set(p: string, b: boolean): BranchMask {
          switch (p) {
            case 'bpmcu':
              this.setBpmcu(b);
              break;
            case 'bpdl01':
              this.setBpdl01(b);
              break;
            case 'bpwcmcu':
              this.setBpwcmcu(b);
              break;
            case 'bpwcdl01':
              this.setBpwcdl01(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeBranchMask(str: string): BranchMask {
  try {
    const mask = new BranchMask();
    mask.mask = parseInt(str) & 0b1111;
    return mask;
  } catch {
    throw Error('Error deserializing BranchMask');
  }
}

export {
  BranchMask,
  deserializeBranchMask,
};
