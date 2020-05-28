import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { TemplateProcedureMask } from '../mask/TemplateProcedureMask';
import { deserializeTemplateProcedure, deserializeTemplateProcedureList, TemplateProcedure } from '../bean/TemplateProcedure';

const PATH = 'api/templateprocedure';
const LIST_PATH = 'api/templateprocedure_list';
const ATTACHMENT_PATH = 'api/templateprocedure_attachment';

async function getTemplateProcedure(
  key: { tpid: number },
  mask?: TemplateProcedureMask,
): Promise<{ statusCode: number; templateProcedure: TemplateProcedure }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.tpid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      templateProcedure: deserializeTemplateProcedure(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addTemplateProcedure(bean: TemplateProcedure): Promise<{ statusCode: number; templateProcedure: (TemplateProcedure) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      templateProcedure: deserializeTemplateProcedure(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addTemplateProcedureSafely(bean: TemplateProcedure): Promise<{ statusCode: number; templateProcedure: (TemplateProcedure) }> {
  try {
    return await addTemplateProcedure(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      templateProcedure: bean,
    };
  }
}

async function batchAddTemplateProcedure(beans: Array<TemplateProcedure>): Promise<Array<{ statusCode: number; templateProcedure: (TemplateProcedure) }>> {
  return await Promise.all(beans.map((v) => addTemplateProcedureSafely(v)));
}

async function updateTemplateProcedure(bean: TemplateProcedure, mask?: TemplateProcedureMask): Promise<{ statusCode: number; templateProcedure: (TemplateProcedure) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.tpid !== null ? bean.tpid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      templateProcedure: deserializeTemplateProcedure(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateTemplateProcedureSafely(bean: TemplateProcedure, mask?: TemplateProcedureMask): Promise<{ statusCode: number; templateProcedure: (TemplateProcedure) }> {
  try {
    return await updateTemplateProcedure(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      templateProcedure: bean,
    };
  }
}

async function batchUpdateTemplateProcedure(beans: Array<TemplateProcedure>, mask?: TemplateProcedureMask): Promise<Array<{ statusCode: number; templateProcedure: (TemplateProcedure) }>> {
  return await Promise.all(beans.map((v) => updateTemplateProcedureSafely(v, mask)));
}

async function deleteTemplateProcedure(key: { tpid: number }): Promise<{ statusCode: number; key: { tpid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.tpid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { tpid: key.tpid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteTemplateProcedureSafely(
  key: { tpid: number },
): Promise<{ statusCode: number; key: { tpid: number } }> {
  try {
    return await deleteTemplateProcedure(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteTemplateProcedure(keys: Array<{ tpid: number } >): Promise<Array<{ statusCode: number; key: { tpid: number } }>> {
  return await Promise.all(keys.map((v) => deleteTemplateProcedureSafely(v)));
}

async function queryTemplateProcedure(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: TemplateProcedureMask }): Promise<{ statusCode: number; list: Array<TemplateProcedure>; contentRange: ContentRange }> {
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
      list: deserializeTemplateProcedureList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countTemplateProcedure(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

function downloadTemplateProcedureAttachment(
  key: { tpid: number },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.tpid.toString()}${parameters(dict)}`;
}

async function uploadTemplateProcedureAttachment(
  key: { tpid: number },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { tpid: number }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.tpid.toString()}${parameters(dict)}`, {
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
  getTemplateProcedure,
  addTemplateProcedure,
  addTemplateProcedureSafely,
  batchAddTemplateProcedure,
  updateTemplateProcedure,
  updateTemplateProcedureSafely,
  batchUpdateTemplateProcedure,
  deleteTemplateProcedure,
  deleteTemplateProcedureSafely,
  batchDeleteTemplateProcedure,
  queryTemplateProcedure,
  countTemplateProcedure,
  downloadTemplateProcedureAttachment,
  uploadTemplateProcedureAttachment,
};
