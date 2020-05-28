import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { EnumTypeMask } from '../mask/EnumTypeMask';
import { deserializeEnumType, deserializeEnumTypeList, EnumType } from '../bean/EnumType';

const PATH = 'api/enumtype';
const LIST_PATH = 'api/enumtype_list';
const ATTACHMENT_PATH = 'api/enumtype_attachment';

async function getEnumType(
  key: { etid: string },
  mask?: EnumTypeMask,
): Promise<{ statusCode: number; enumType: EnumType }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.etid}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      enumType: deserializeEnumType(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addEnumType(bean: EnumType): Promise<{ statusCode: number; enumType: (EnumType) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.etid !== null ? bean.etid : ''}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      enumType: deserializeEnumType(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addEnumTypeSafely(bean: EnumType): Promise<{ statusCode: number; enumType: (EnumType) }> {
  try {
    return await addEnumType(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      enumType: bean,
    };
  }
}

async function batchAddEnumType(beans: Array<EnumType>): Promise<Array<{ statusCode: number; enumType: (EnumType) }>> {
  return await Promise.all(beans.map((v) => addEnumTypeSafely(v)));
}

async function updateEnumType(bean: EnumType, mask?: EnumTypeMask): Promise<{ statusCode: number; enumType: (EnumType) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.etid !== null ? bean.etid : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      enumType: deserializeEnumType(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateEnumTypeSafely(bean: EnumType, mask?: EnumTypeMask): Promise<{ statusCode: number; enumType: (EnumType) }> {
  try {
    return await updateEnumType(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      enumType: bean,
    };
  }
}

async function batchUpdateEnumType(beans: Array<EnumType>, mask?: EnumTypeMask): Promise<Array<{ statusCode: number; enumType: (EnumType) }>> {
  return await Promise.all(beans.map((v) => updateEnumTypeSafely(v, mask)));
}

async function deleteEnumType(key: { etid: string }): Promise<{ statusCode: number; key: { etid: string } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.etid}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { etid: key.etid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteEnumTypeSafely(
  key: { etid: string },
): Promise<{ statusCode: number; key: { etid: string } }> {
  try {
    return await deleteEnumType(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteEnumType(keys: Array<{ etid: string } >): Promise<Array<{ statusCode: number; key: { etid: string } }>> {
  return await Promise.all(keys.map((v) => deleteEnumTypeSafely(v)));
}

async function queryEnumType(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: EnumTypeMask }): Promise<{ statusCode: number; list: Array<EnumType>; contentRange: ContentRange }> {
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
      list: deserializeEnumTypeList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countEnumType(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

function downloadEnumTypeAttachment(
  key: { etid: string },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.etid}${parameters(dict)}`;
}

async function uploadEnumTypeAttachment(
  key: { etid: string },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { etid: string }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.etid}${parameters(dict)}`, {
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
  getEnumType,
  addEnumType,
  addEnumTypeSafely,
  batchAddEnumType,
  updateEnumType,
  updateEnumTypeSafely,
  batchUpdateEnumType,
  deleteEnumType,
  deleteEnumTypeSafely,
  batchDeleteEnumType,
  queryEnumType,
  countEnumType,
  downloadEnumTypeAttachment,
  uploadEnumTypeAttachment,
};
