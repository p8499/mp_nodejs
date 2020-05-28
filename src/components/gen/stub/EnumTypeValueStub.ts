import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { EnumTypeValueMask } from '../mask/EnumTypeValueMask';
import { deserializeEnumTypeValue, deserializeEnumTypeValueList, EnumTypeValue } from '../bean/EnumTypeValue';

const PATH = 'api/enumtypevalue';
const LIST_PATH = 'api/enumtypevalue_list';
const ATTACHMENT_PATH = 'api/enumtypevalue_attachment';

async function getEnumTypeValue(
  key: { evid: number },
  mask?: EnumTypeValueMask,
): Promise<{ statusCode: number; enumTypeValue: EnumTypeValue }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.evid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      enumTypeValue: deserializeEnumTypeValue(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addEnumTypeValue(bean: EnumTypeValue): Promise<{ statusCode: number; enumTypeValue: (EnumTypeValue) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      enumTypeValue: deserializeEnumTypeValue(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addEnumTypeValueSafely(bean: EnumTypeValue): Promise<{ statusCode: number; enumTypeValue: (EnumTypeValue) }> {
  try {
    return await addEnumTypeValue(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      enumTypeValue: bean,
    };
  }
}

async function batchAddEnumTypeValue(beans: Array<EnumTypeValue>): Promise<Array<{ statusCode: number; enumTypeValue: (EnumTypeValue) }>> {
  return await Promise.all(beans.map((v) => addEnumTypeValueSafely(v)));
}

async function updateEnumTypeValue(bean: EnumTypeValue, mask?: EnumTypeValueMask): Promise<{ statusCode: number; enumTypeValue: (EnumTypeValue) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.evid !== null ? bean.evid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      enumTypeValue: deserializeEnumTypeValue(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateEnumTypeValueSafely(bean: EnumTypeValue, mask?: EnumTypeValueMask): Promise<{ statusCode: number; enumTypeValue: (EnumTypeValue) }> {
  try {
    return await updateEnumTypeValue(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      enumTypeValue: bean,
    };
  }
}

async function batchUpdateEnumTypeValue(beans: Array<EnumTypeValue>, mask?: EnumTypeValueMask): Promise<Array<{ statusCode: number; enumTypeValue: (EnumTypeValue) }>> {
  return await Promise.all(beans.map((v) => updateEnumTypeValueSafely(v, mask)));
}

async function deleteEnumTypeValue(key: { evid: number }): Promise<{ statusCode: number; key: { evid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.evid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { evid: key.evid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteEnumTypeValueSafely(
  key: { evid: number },
): Promise<{ statusCode: number; key: { evid: number } }> {
  try {
    return await deleteEnumTypeValue(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteEnumTypeValue(keys: Array<{ evid: number } >): Promise<Array<{ statusCode: number; key: { evid: number } }>> {
  return await Promise.all(keys.map((v) => deleteEnumTypeValueSafely(v)));
}

async function queryEnumTypeValue(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: EnumTypeValueMask }): Promise<{ statusCode: number; list: Array<EnumTypeValue>; contentRange: ContentRange }> {
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
      list: deserializeEnumTypeValueList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countEnumTypeValue(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

function downloadEnumTypeValueAttachment(
  key: { evid: number },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.evid.toString()}${parameters(dict)}`;
}

async function uploadEnumTypeValueAttachment(
  key: { evid: number },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { evid: number }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.evid.toString()}${parameters(dict)}`, {
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
  getEnumTypeValue,
  addEnumTypeValue,
  addEnumTypeValueSafely,
  batchAddEnumTypeValue,
  updateEnumTypeValue,
  updateEnumTypeValueSafely,
  batchUpdateEnumTypeValue,
  deleteEnumTypeValue,
  deleteEnumTypeValueSafely,
  batchDeleteEnumTypeValue,
  queryEnumTypeValue,
  countEnumTypeValue,
  downloadEnumTypeValueAttachment,
  uploadEnumTypeValueAttachment,
};
