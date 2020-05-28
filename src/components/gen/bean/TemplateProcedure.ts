import { TEMPLATEPROCEDURE_SPEC } from '../spec/TemplateProcedureSpec';
import { TemplateProcedureMask } from '../mask/TemplateProcedureMask';
import { Bean } from '../bean';


class TemplateProcedure implements Bean {
  constructor(public tpid: number|null = null, public tpttid: number|null = null, public tpseq: number|null = null, public tpdescription: string|null = null, public tpphoto: number|null = TEMPLATEPROCEDURE_SPEC.fields.tpphoto.default, public tpttname: string|null = null, public tptttype: string|null = null, public tpsize: number|null = null) {
  }

  equals(target: TemplateProcedure, mask: TemplateProcedureMask = new TemplateProcedureMask(true, true, true, true, true, true, true, true)): boolean {
    return !(mask.getTpid() && !((this.tpid === null && target.tpid === null) || (this.tpid !== null && target.tpid !== null && this.tpid === target.tpid))) && !(mask.getTpttid() && !((this.tpttid === null && target.tpttid === null) || (this.tpttid !== null && target.tpttid !== null && this.tpttid === target.tpttid))) && !(mask.getTpseq() && !((this.tpseq === null && target.tpseq === null) || (this.tpseq !== null && target.tpseq !== null && this.tpseq === target.tpseq))) && !(mask.getTpdescription() && !((this.tpdescription === null && target.tpdescription === null) || (this.tpdescription !== null && target.tpdescription !== null && this.tpdescription === target.tpdescription))) && !(mask.getTpphoto() && !((this.tpphoto === null && target.tpphoto === null) || (this.tpphoto !== null && target.tpphoto !== null && this.tpphoto === target.tpphoto))) && !(mask.getTpttname() && !((this.tpttname === null && target.tpttname === null) || (this.tpttname !== null && target.tpttname !== null && this.tpttname === target.tpttname))) && !(mask.getTptttype() && !((this.tptttype === null && target.tptttype === null) || (this.tptttype !== null && target.tptttype !== null && this.tptttype === target.tptttype))) && !(mask.getTpsize() && !((this.tpsize === null && target.tpsize === null) || (this.tpsize !== null && target.tpsize !== null && this.tpsize === target.tpsize)));
  }

  copy(target: TemplateProcedure = new TemplateProcedure(), mask: TemplateProcedureMask = new TemplateProcedureMask(true, true, true, true, true, true, true, true)): TemplateProcedure {
    if (mask.getTpid()) { target.tpid = this.tpid; }
    if (mask.getTpttid()) { target.tpttid = this.tpttid; }
    if (mask.getTpseq()) { target.tpseq = this.tpseq; }
    if (mask.getTpdescription()) { target.tpdescription = this.tpdescription; }
    if (mask.getTpphoto()) { target.tpphoto = this.tpphoto; }
    if (mask.getTpttname()) { target.tpttname = this.tpttname; }
    if (mask.getTptttype()) { target.tptttype = this.tptttype; }
    if (mask.getTpsize()) { target.tpsize = this.tpsize; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.tpid !== null) { texts.push(`"tpid":${this.tpid}`); }
    if (this.tpttid !== null) { texts.push(`"tpttid":${this.tpttid}`); }
    if (this.tpseq !== null) { texts.push(`"tpseq":${this.tpseq}`); }
    if (this.tpdescription !== null) { texts.push(`"tpdescription":"${this.tpdescription}"`); }
    if (this.tpphoto !== null) { texts.push(`"tpphoto":${this.tpphoto}`); }
    if (this.tpttname !== null) { texts.push(`"tpttname":"${this.tpttname}"`); }
    if (this.tptttype !== null) { texts.push(`"tptttype":"${this.tptttype}"`); }
    if (this.tpsize !== null) { texts.push(`"tpsize":${this.tpsize}`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeTemplateProcedure(str: string): TemplateProcedure {
  try {
    const obj = JSON.parse(str);
    return new TemplateProcedure(
      'tpid' in obj ? obj.tpid : null,
      'tpttid' in obj ? obj.tpttid : null,
      'tpseq' in obj ? obj.tpseq : null,
      'tpdescription' in obj ? obj.tpdescription : null,
      'tpphoto' in obj ? obj.tpphoto : null,
      'tpttname' in obj ? obj.tpttname : null,
      'tptttype' in obj ? obj.tptttype : null,
      'tpsize' in obj ? obj.tpsize : null,
    );
  } catch {
    throw Error('Error deserializing TemplateProcedure');
  }
}

function deserializeTemplateProcedureList(str: string): Array<TemplateProcedure> {
  try {
    return JSON.parse(str).map((obj: any) => new TemplateProcedure(
      'tpid' in obj ? obj.tpid : null,
      'tpttid' in obj ? obj.tpttid : null,
      'tpseq' in obj ? obj.tpseq : null,
      'tpdescription' in obj ? obj.tpdescription : null,
      'tpphoto' in obj ? obj.tpphoto : null,
      'tpttname' in obj ? obj.tpttname : null,
      'tptttype' in obj ? obj.tptttype : null,
      'tpsize' in obj ? obj.tpsize : null,
    ));
  } catch {
    throw Error('Error deserializing TemplateProcedureList');
  }
}

export {
  TemplateProcedure,
  deserializeTemplateProcedure,
  deserializeTemplateProcedureList,
};
