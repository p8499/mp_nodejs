import { TEMPLATEMEASUREMENT_SPEC } from '../spec/TemplateMeasurementSpec';
import { TemplateMeasurementMask } from '../mask/TemplateMeasurementMask';
import { Bean } from '../bean';


class TemplateMeasurement implements Bean {
  constructor(public tsid: number|null = null, public tstpid: number|null = null, public tsseq: number|null = null, public tsname: string|null = null, public tsetid: string|null = null, public tsmin: number|null = null, public tsmax: number|null = null, public tsunit: string|null = null, public tsphoto: number|null = TEMPLATEMEASUREMENT_SPEC.fields.tsphoto.default, public tsttid: number|null = null, public tsttname: string|null = null, public tstttype: string|null = null, public tstpseq: number|null = null, public tstpdescription: string|null = null, public tstpphoto: number|null = null) {
  }

  equals(target: TemplateMeasurement, mask: TemplateMeasurementMask = new TemplateMeasurementMask(true, true, true, true, true, true, true, true, true, true, true, true, true, true, true)): boolean {
    return !(mask.getTsid() && !((this.tsid === null && target.tsid === null) || (this.tsid !== null && target.tsid !== null && this.tsid === target.tsid))) && !(mask.getTstpid() && !((this.tstpid === null && target.tstpid === null) || (this.tstpid !== null && target.tstpid !== null && this.tstpid === target.tstpid))) && !(mask.getTsseq() && !((this.tsseq === null && target.tsseq === null) || (this.tsseq !== null && target.tsseq !== null && this.tsseq === target.tsseq))) && !(mask.getTsname() && !((this.tsname === null && target.tsname === null) || (this.tsname !== null && target.tsname !== null && this.tsname === target.tsname))) && !(mask.getTsetid() && !((this.tsetid === null && target.tsetid === null) || (this.tsetid !== null && target.tsetid !== null && this.tsetid === target.tsetid))) && !(mask.getTsmin() && !((this.tsmin === null && target.tsmin === null) || (this.tsmin !== null && target.tsmin !== null && this.tsmin === target.tsmin))) && !(mask.getTsmax() && !((this.tsmax === null && target.tsmax === null) || (this.tsmax !== null && target.tsmax !== null && this.tsmax === target.tsmax))) && !(mask.getTsunit() && !((this.tsunit === null && target.tsunit === null) || (this.tsunit !== null && target.tsunit !== null && this.tsunit === target.tsunit))) && !(mask.getTsphoto() && !((this.tsphoto === null && target.tsphoto === null) || (this.tsphoto !== null && target.tsphoto !== null && this.tsphoto === target.tsphoto))) && !(mask.getTsttid() && !((this.tsttid === null && target.tsttid === null) || (this.tsttid !== null && target.tsttid !== null && this.tsttid === target.tsttid))) && !(mask.getTsttname() && !((this.tsttname === null && target.tsttname === null) || (this.tsttname !== null && target.tsttname !== null && this.tsttname === target.tsttname))) && !(mask.getTstttype() && !((this.tstttype === null && target.tstttype === null) || (this.tstttype !== null && target.tstttype !== null && this.tstttype === target.tstttype))) && !(mask.getTstpseq() && !((this.tstpseq === null && target.tstpseq === null) || (this.tstpseq !== null && target.tstpseq !== null && this.tstpseq === target.tstpseq))) && !(mask.getTstpdescription() && !((this.tstpdescription === null && target.tstpdescription === null) || (this.tstpdescription !== null && target.tstpdescription !== null && this.tstpdescription === target.tstpdescription))) && !(mask.getTstpphoto() && !((this.tstpphoto === null && target.tstpphoto === null) || (this.tstpphoto !== null && target.tstpphoto !== null && this.tstpphoto === target.tstpphoto)));
  }

  copy(target: TemplateMeasurement = new TemplateMeasurement(), mask: TemplateMeasurementMask = new TemplateMeasurementMask(true, true, true, true, true, true, true, true, true, true, true, true, true, true, true)): TemplateMeasurement {
    if (mask.getTsid()) { target.tsid = this.tsid; }
    if (mask.getTstpid()) { target.tstpid = this.tstpid; }
    if (mask.getTsseq()) { target.tsseq = this.tsseq; }
    if (mask.getTsname()) { target.tsname = this.tsname; }
    if (mask.getTsetid()) { target.tsetid = this.tsetid; }
    if (mask.getTsmin()) { target.tsmin = this.tsmin; }
    if (mask.getTsmax()) { target.tsmax = this.tsmax; }
    if (mask.getTsunit()) { target.tsunit = this.tsunit; }
    if (mask.getTsphoto()) { target.tsphoto = this.tsphoto; }
    if (mask.getTsttid()) { target.tsttid = this.tsttid; }
    if (mask.getTsttname()) { target.tsttname = this.tsttname; }
    if (mask.getTstttype()) { target.tstttype = this.tstttype; }
    if (mask.getTstpseq()) { target.tstpseq = this.tstpseq; }
    if (mask.getTstpdescription()) { target.tstpdescription = this.tstpdescription; }
    if (mask.getTstpphoto()) { target.tstpphoto = this.tstpphoto; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.tsid !== null) { texts.push(`"tsid":${this.tsid}`); }
    if (this.tstpid !== null) { texts.push(`"tstpid":${this.tstpid}`); }
    if (this.tsseq !== null) { texts.push(`"tsseq":${this.tsseq}`); }
    if (this.tsname !== null) { texts.push(`"tsname":"${this.tsname}"`); }
    if (this.tsetid !== null) { texts.push(`"tsetid":"${this.tsetid}"`); }
    if (this.tsmin !== null) { texts.push(`"tsmin":${this.tsmin}`); }
    if (this.tsmax !== null) { texts.push(`"tsmax":${this.tsmax}`); }
    if (this.tsunit !== null) { texts.push(`"tsunit":"${this.tsunit}"`); }
    if (this.tsphoto !== null) { texts.push(`"tsphoto":${this.tsphoto}`); }
    if (this.tsttid !== null) { texts.push(`"tsttid":${this.tsttid}`); }
    if (this.tsttname !== null) { texts.push(`"tsttname":"${this.tsttname}"`); }
    if (this.tstttype !== null) { texts.push(`"tstttype":"${this.tstttype}"`); }
    if (this.tstpseq !== null) { texts.push(`"tstpseq":${this.tstpseq}`); }
    if (this.tstpdescription !== null) { texts.push(`"tstpdescription":"${this.tstpdescription}"`); }
    if (this.tstpphoto !== null) { texts.push(`"tstpphoto":${this.tstpphoto}`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeTemplateMeasurement(str: string): TemplateMeasurement {
  try {
    const obj = JSON.parse(str);
    return new TemplateMeasurement(
      'tsid' in obj ? obj.tsid : null,
      'tstpid' in obj ? obj.tstpid : null,
      'tsseq' in obj ? obj.tsseq : null,
      'tsname' in obj ? obj.tsname : null,
      'tsetid' in obj ? obj.tsetid : null,
      'tsmin' in obj ? obj.tsmin : null,
      'tsmax' in obj ? obj.tsmax : null,
      'tsunit' in obj ? obj.tsunit : null,
      'tsphoto' in obj ? obj.tsphoto : null,
      'tsttid' in obj ? obj.tsttid : null,
      'tsttname' in obj ? obj.tsttname : null,
      'tstttype' in obj ? obj.tstttype : null,
      'tstpseq' in obj ? obj.tstpseq : null,
      'tstpdescription' in obj ? obj.tstpdescription : null,
      'tstpphoto' in obj ? obj.tstpphoto : null,
    );
  } catch {
    throw Error('Error deserializing TemplateMeasurement');
  }
}

function deserializeTemplateMeasurementList(str: string): Array<TemplateMeasurement> {
  try {
    return JSON.parse(str).map((obj: any) => new TemplateMeasurement(
      'tsid' in obj ? obj.tsid : null,
      'tstpid' in obj ? obj.tstpid : null,
      'tsseq' in obj ? obj.tsseq : null,
      'tsname' in obj ? obj.tsname : null,
      'tsetid' in obj ? obj.tsetid : null,
      'tsmin' in obj ? obj.tsmin : null,
      'tsmax' in obj ? obj.tsmax : null,
      'tsunit' in obj ? obj.tsunit : null,
      'tsphoto' in obj ? obj.tsphoto : null,
      'tsttid' in obj ? obj.tsttid : null,
      'tsttname' in obj ? obj.tsttname : null,
      'tstttype' in obj ? obj.tstttype : null,
      'tstpseq' in obj ? obj.tstpseq : null,
      'tstpdescription' in obj ? obj.tstpdescription : null,
      'tstpphoto' in obj ? obj.tstpphoto : null,
    ));
  } catch {
    throw Error('Error deserializing TemplateMeasurementList');
  }
}

export {
  TemplateMeasurement,
  deserializeTemplateMeasurement,
  deserializeTemplateMeasurementList,
};
