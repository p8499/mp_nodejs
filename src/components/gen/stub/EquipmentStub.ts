import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { EquipmentMask } from '../mask/EquipmentMask';
import { deserializeEquipment, deserializeEquipmentList, Equipment } from '../bean/Equipment';

const PATH = 'api/equipment';
const LIST_PATH = 'api/equipment_list';
const ATTACHMENT_PATH = 'api/equipment_attachment';

async function getEquipment(
  key: { eqid: number },
  mask?: EquipmentMask,
): Promise<{ statusCode: number; equipment: Equipment }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.eqid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      equipment: deserializeEquipment(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addEquipment(bean: Equipment): Promise<{ statusCode: number; equipment: (Equipment) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      equipment: deserializeEquipment(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addEquipmentSafely(bean: Equipment): Promise<{ statusCode: number; equipment: (Equipment) }> {
  try {
    return await addEquipment(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      equipment: bean,
    };
  }
}

async function batchAddEquipment(beans: Array<Equipment>): Promise<Array<{ statusCode: number; equipment: (Equipment) }>> {
  return await Promise.all(beans.map((v) => addEquipmentSafely(v)));
}

async function updateEquipment(bean: Equipment, mask?: EquipmentMask): Promise<{ statusCode: number; equipment: (Equipment) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.eqid !== null ? bean.eqid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      equipment: deserializeEquipment(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateEquipmentSafely(bean: Equipment, mask?: EquipmentMask): Promise<{ statusCode: number; equipment: (Equipment) }> {
  try {
    return await updateEquipment(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      equipment: bean,
    };
  }
}

async function batchUpdateEquipment(beans: Array<Equipment>, mask?: EquipmentMask): Promise<Array<{ statusCode: number; equipment: (Equipment) }>> {
  return await Promise.all(beans.map((v) => updateEquipmentSafely(v)));
}

async function deleteEquipment(key: { eqid: number }): Promise<{ statusCode: number; key: { eqid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.eqid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { eqid: key.eqid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteEquipmentSafely(
  key: { eqid: number },
): Promise<{ statusCode: number; key: { eqid: number } }> {
  try {
    return await deleteEquipment(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteEquipment(keys: Array<{ eqid: number } >): Promise<Array<{ statusCode: number; key: { eqid: number } }>> {
  return await Promise.all(keys.map((v) => deleteEquipmentSafely(v)));
}

async function queryEquipment(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: EquipmentMask }): Promise<{ statusCode: number; list: Array<Equipment>; contentRange: ContentRange }> {
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
      list: deserializeEquipmentList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countEquipment(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

// todo attachments
export {
  PATH,
  LIST_PATH,
  ATTACHMENT_PATH,
  getEquipment,
  addEquipment,
  addEquipmentSafely,
  batchAddEquipment,
  updateEquipment,
  updateEquipmentSafely,
  batchUpdateEquipment,
  deleteEquipment,
  deleteEquipmentSafely,
  batchDeleteEquipment,
  queryEquipment,
  countEquipment,
};
