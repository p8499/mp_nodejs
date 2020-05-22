import { Mask } from '../mask';

class BuildingMask implements Mask {
        public mask: number;

        constructor(
          mcmcu = false,
          mcdl01 = false,
          mcbpmcu = false,
          mcbpdl01 = false,
          mcwcmcu = false,
          mcwcdl01 = false,
        ) {
          this.mask = 0b000000;
          if (mcmcu) { this.setMcmcu(mcmcu); }
          if (mcdl01) { this.setMcdl01(mcdl01); }
          if (mcbpmcu) { this.setMcbpmcu(mcbpmcu); }
          if (mcbpdl01) { this.setMcbpdl01(mcbpdl01); }
          if (mcwcmcu) { this.setMcwcmcu(mcwcmcu); }
          if (mcwcdl01) { this.setMcwcdl01(mcwcdl01); }
        }

        getMcmcu(): boolean {
          return (this.mask >> 5 & 1) === 1;
        }

        setMcmcu(mcmcu: boolean): BuildingMask {
          if (mcmcu) this.mask |= 0b100000;
          else this.mask &= 0b011111;
          return this;
        }

        getMcdl01(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setMcdl01(mcdl01: boolean): BuildingMask {
          if (mcdl01) this.mask |= 0b010000;
          else this.mask &= 0b101111;
          return this;
        }

        getMcbpmcu(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setMcbpmcu(mcbpmcu: boolean): BuildingMask {
          if (mcbpmcu) this.mask |= 0b001000;
          else this.mask &= 0b110111;
          return this;
        }

        getMcbpdl01(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setMcbpdl01(mcbpdl01: boolean): BuildingMask {
          if (mcbpdl01) this.mask |= 0b000100;
          else this.mask &= 0b111011;
          return this;
        }

        getMcwcmcu(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setMcwcmcu(mcwcmcu: boolean): BuildingMask {
          if (mcwcmcu) this.mask |= 0b000010;
          else this.mask &= 0b111101;
          return this;
        }

        getMcwcdl01(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setMcwcdl01(mcwcdl01: boolean): BuildingMask {
          if (mcwcdl01) this.mask |= 0b000001;
          else this.mask &= 0b111110;
          return this;
        }

        all(b: boolean): BuildingMask {
          this.setMcmcu(b);
          this.setMcdl01(b);
          this.setMcbpmcu(b);
          this.setMcbpdl01(b);
          this.setMcwcmcu(b);
          this.setMcwcdl01(b);
          return this;
        }

        keys(b: boolean): BuildingMask {
          this.setMcmcu(b);
          return this;
        }

        attributes(b: boolean): BuildingMask {
          this.setMcdl01(b);
          this.setMcbpmcu(b);
          return this;
        }

        physicals(b: boolean): BuildingMask {
          this.setMcmcu(b);
          this.setMcdl01(b);
          this.setMcbpmcu(b);
          return this;
        }

        virtuals(b: boolean): BuildingMask {
          this.setMcbpdl01(b);
          this.setMcwcmcu(b);
          this.setMcwcdl01(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'mcmcu':
              return this.getMcmcu();
            case 'mcdl01':
              return this.getMcdl01();
            case 'mcbpmcu':
              return this.getMcbpmcu();
            case 'mcbpdl01':
              return this.getMcbpdl01();
            case 'mcwcmcu':
              return this.getMcwcmcu();
            case 'mcwcdl01':
              return this.getMcwcdl01();
          }
          return false;
        }

        set(p: string, b: boolean): BuildingMask {
          switch (p) {
            case 'mcmcu':
              this.setMcmcu(b);
              break;
            case 'mcdl01':
              this.setMcdl01(b);
              break;
            case 'mcbpmcu':
              this.setMcbpmcu(b);
              break;
            case 'mcbpdl01':
              this.setMcbpdl01(b);
              break;
            case 'mcwcmcu':
              this.setMcwcmcu(b);
              break;
            case 'mcwcdl01':
              this.setMcwcdl01(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeBuildingMask(str: string): BuildingMask {
  try {
    const mask = new BuildingMask();
    mask.mask = parseInt(str) & 0b111111;
    return mask;
  } catch {
    throw Error('Error deserializing BuildingMask');
  }
}

export {
  BuildingMask,
  deserializeBuildingMask,
};
