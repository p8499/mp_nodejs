import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { TemplateMask } from '../mask/TemplateMask';
import { deserializeTemplate, deserializeTemplateList, Template } from '../bean/Template';

const PATH = 'api/template';
const LIST_PATH = 'api/template_list';
const ATTACHMENT_PATH = 'api/template_attachment';

async function getTemplate(
  key: { ttid: number },
  mask?: TemplateMask,
): Promise<{ statusCode: number; template: Template }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.ttid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      template: deserializeTemplate(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addTemplate(bean: Template): Promise<{ statusCode: number; template: (Template) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      template: deserializeTemplate(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addTemplateSafely(bean: Template): Promise<{ statusCode: number; template: (Template) }> {
  try {
    return await addTemplate(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      template: bean,
    };
  }
}

async function batchAddTemplate(beans: Array<Template>): Promise<Array<{ statusCode: number; template: (Template) }>> {
  return await Promise.all(beans.map((v) => addTemplateSafely(v)));
}

async function updateTemplate(bean: Template, mask?: TemplateMask): Promise<{ statusCode: number; template: (Template) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.ttid !== null ? bean.ttid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      template: deserializeTemplate(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateTemplateSafely(bean: Template, mask?: TemplateMask): Promise<{ statusCode: number; template: (Template) }> {
  try {
    return await updateTemplate(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      template: bean,
    };
  }
}

async function batchUpdateTemplate(beans: Array<Template>, mask?: TemplateMask): Promise<Array<{ statusCode: number; template: (Template) }>> {
  return await Promise.all(beans.map((v) => updateTemplateSafely(v, mask)));
}

async function deleteTemplate(key: { ttid: number }): Promise<{ statusCode: number; key: { ttid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.ttid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { ttid: key.ttid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteTemplateSafely(
  key: { ttid: number },
): Promise<{ statusCode: number; key: { ttid: number } }> {
  try {
    return await deleteTemplate(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteTemplate(keys: Array<{ ttid: number } >): Promise<Array<{ statusCode: number; key: { ttid: number } }>> {
  return await Promise.all(keys.map((v) => deleteTemplateSafely(v)));
}

async function queryTemplate(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: TemplateMask }): Promise<{ statusCode: number; list: Array<Template>; contentRange: ContentRange }> {
  const pageSize = options.pageSize !== undefined ? options.pageSize : 10;
  const pageNumber = options.pageNumber !== undefined ? options.pageNumber : 1;
  const start = (pageNumber - 1) * pageSize;
  const end = pageNumber * pageSize - 1;
  const dict = Object();
  dict.orderBy = options.orderBy;
  dict.mask = options.mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${LIST_PATH}${parameters(dict)}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8', Range: `items=${start}-${end}` }, body: options.filter?.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      list: deserializeTemplateList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countTemplate(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${LIST_PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8', Range: 'items=items=1--1' }, body: options.filter?.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      total: deserializeContentRange(response.headers.get('content-range') as string).total,
    };
  }
  throw new ServerError(response.status);
}

function downloadTemplateAttachment(
  key: { ttid: number },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.ttid.toString()}${parameters(dict)}`;
}

async function uploadTemplateAttachment(
  key: { ttid: number },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { ttid: number }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.ttid.toString()}${parameters(dict)}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/octet-stream' },
    body: buffer,
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key,
      name,
    };
  }
  throw new ServerError(response.status);
}


export {
  PATH,
  LIST_PATH,
  ATTACHMENT_PATH,
  getTemplate,
  addTemplate,
  addTemplateSafely,
  batchAddTemplate,
  updateTemplate,
  updateTemplateSafely,
  batchUpdateTemplate,
  deleteTemplate,
  deleteTemplateSafely,
  batchDeleteTemplate,
  queryTemplate,
  countTemplate,
  downloadTemplateAttachment,
  uploadTemplateAttachment,
};
