import { TEMPLATE_SPEC } from '../spec/TemplateSpec';
import { TemplateMask } from '../mask/TemplateMask';
import { Bean } from '../bean';


class Template implements Bean {
  constructor(public ttid: number|null = null, public ttname: string|null = null, public tttype: string|null = null, public ttsize: number|null = null) {
  }

  equals(target: Template, mask: TemplateMask = new TemplateMask(true, true, true, true)): boolean {
    return !(mask.getTtid() && !((this.ttid === null && target.ttid === null) || (this.ttid !== null && target.ttid !== null && this.ttid === target.ttid))) && !(mask.getTtname() && !((this.ttname === null && target.ttname === null) || (this.ttname !== null && target.ttname !== null && this.ttname === target.ttname))) && !(mask.getTttype() && !((this.tttype === null && target.tttype === null) || (this.tttype !== null && target.tttype !== null && this.tttype === target.tttype))) && !(mask.getTtsize() && !((this.ttsize === null && target.ttsize === null) || (this.ttsize !== null && target.ttsize !== null && this.ttsize === target.ttsize)));
  }

  copy(target: Template = new Template(), mask: TemplateMask = new TemplateMask(true, true, true, true)): Template {
    if (mask.getTtid()) { target.ttid = this.ttid; }
    if (mask.getTtname()) { target.ttname = this.ttname; }
    if (mask.getTttype()) { target.tttype = this.tttype; }
    if (mask.getTtsize()) { target.ttsize = this.ttsize; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.ttid !== null) { texts.push(`"ttid":${this.ttid}`); }
    if (this.ttname !== null) { texts.push(`"ttname":"${this.ttname}"`); }
    if (this.tttype !== null) { texts.push(`"tttype":"${this.tttype}"`); }
    if (this.ttsize !== null) { texts.push(`"ttsize":${this.ttsize}`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeTemplate(str: string): Template {
  try {
    const obj = JSON.parse(str);
    return new Template(
      'ttid' in obj ? obj.ttid : null,
      'ttname' in obj ? obj.ttname : null,
      'tttype' in obj ? obj.tttype : null,
      'ttsize' in obj ? obj.ttsize : null,
    );
  } catch {
    throw Error('Error deserializing Template');
  }
}

function deserializeTemplateList(str: string): Array<Template> {
  try {
    return JSON.parse(str).map((obj: any) => new Template(
      'ttid' in obj ? obj.ttid : null,
      'ttname' in obj ? obj.ttname : null,
      'tttype' in obj ? obj.tttype : null,
      'ttsize' in obj ? obj.ttsize : null,
    ));
  } catch {
    throw Error('Error deserializing TemplateList');
  }
}

export {
  Template,
  deserializeTemplate,
  deserializeTemplateList,
};
