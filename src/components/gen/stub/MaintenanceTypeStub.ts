import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { MaintenanceTypeMask } from '../mask/MaintenanceTypeMask';
import { deserializeMaintenanceType, deserializeMaintenanceTypeList, MaintenanceType } from '../bean/MaintenanceType';

const PATH = 'api/maintenancetype';
const LIST_PATH = 'api/maintenancetype_list';
const ATTACHMENT_PATH = 'api/maintenancetype_attachment';

async function getMaintenanceType(
  key: { mtid: string },
  mask?: MaintenanceTypeMask,
): Promise<{ statusCode: number; maintenanceType: MaintenanceType }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.mtid}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      maintenanceType: deserializeMaintenanceType(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addMaintenanceType(bean: MaintenanceType): Promise<{ statusCode: number; maintenanceType: (MaintenanceType) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.mtid !== null ? bean.mtid : ''}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      maintenanceType: deserializeMaintenanceType(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addMaintenanceTypeSafely(bean: MaintenanceType): Promise<{ statusCode: number; maintenanceType: (MaintenanceType) }> {
  try {
    return await addMaintenanceType(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      maintenanceType: bean,
    };
  }
}

async function batchAddMaintenanceType(beans: Array<MaintenanceType>): Promise<Array<{ statusCode: number; maintenanceType: (MaintenanceType) }>> {
  return await Promise.all(beans.map((v) => addMaintenanceTypeSafely(v)));
}

async function updateMaintenanceType(bean: MaintenanceType, mask?: MaintenanceTypeMask): Promise<{ statusCode: number; maintenanceType: (MaintenanceType) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.mtid !== null ? bean.mtid : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      maintenanceType: deserializeMaintenanceType(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateMaintenanceTypeSafely(bean: MaintenanceType, mask?: MaintenanceTypeMask): Promise<{ statusCode: number; maintenanceType: (MaintenanceType) }> {
  try {
    return await updateMaintenanceType(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      maintenanceType: bean,
    };
  }
}

async function batchUpdateMaintenanceType(beans: Array<MaintenanceType>, mask?: MaintenanceTypeMask): Promise<Array<{ statusCode: number; maintenanceType: (MaintenanceType) }>> {
  return await Promise.all(beans.map((v) => updateMaintenanceTypeSafely(v, mask)));
}

async function deleteMaintenanceType(key: { mtid: string }): Promise<{ statusCode: number; key: { mtid: string } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.mtid}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { mtid: key.mtid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteMaintenanceTypeSafely(
  key: { mtid: string },
): Promise<{ statusCode: number; key: { mtid: string } }> {
  try {
    return await deleteMaintenanceType(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteMaintenanceType(keys: Array<{ mtid: string } >): Promise<Array<{ statusCode: number; key: { mtid: string } }>> {
  return await Promise.all(keys.map((v) => deleteMaintenanceTypeSafely(v)));
}

async function queryMaintenanceType(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: MaintenanceTypeMask }): Promise<{ statusCode: number; list: Array<MaintenanceType>; contentRange: ContentRange }> {
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
      list: deserializeMaintenanceTypeList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countMaintenanceType(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

function downloadMaintenanceTypeAttachment(
  key: { mtid: string },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.mtid}${parameters(dict)}`;
}

async function uploadMaintenanceTypeAttachment(
  key: { mtid: string },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { mtid: string }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.mtid}${parameters(dict)}`, {
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
  getMaintenanceType,
  addMaintenanceType,
  addMaintenanceTypeSafely,
  batchAddMaintenanceType,
  updateMaintenanceType,
  updateMaintenanceTypeSafely,
  batchUpdateMaintenanceType,
  deleteMaintenanceType,
  deleteMaintenanceTypeSafely,
  batchDeleteMaintenanceType,
  queryMaintenanceType,
  countMaintenanceType,
  downloadMaintenanceTypeAttachment,
  uploadMaintenanceTypeAttachment,
};
