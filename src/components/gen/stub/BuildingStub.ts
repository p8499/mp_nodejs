import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { BuildingMask } from '../mask/BuildingMask';
import { deserializeBuilding, deserializeBuildingList, Building } from '../bean/Building';

const PATH = 'api/building';
const LIST_PATH = 'api/building_list';
const ATTACHMENT_PATH = 'api/building_attachment';

async function getBuilding(
  key: { mcmcu: string },
  mask?: BuildingMask,
): Promise<{ statusCode: number; building: Building }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.mcmcu}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      building: deserializeBuilding(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addBuilding(bean: Building): Promise<{ statusCode: number; building: (Building) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.mcmcu !== null ? bean.mcmcu : ''}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      building: deserializeBuilding(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addBuildingSafely(bean: Building): Promise<{ statusCode: number; building: (Building) }> {
  try {
    return await addBuilding(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      building: bean,
    };
  }
}

async function batchAddBuilding(beans: Array<Building>): Promise<Array<{ statusCode: number; building: (Building) }>> {
  return await Promise.all(beans.map((v) => addBuildingSafely(v)));
}

async function updateBuilding(bean: Building, mask?: BuildingMask): Promise<{ statusCode: number; building: (Building) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.mcmcu !== null ? bean.mcmcu : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      building: deserializeBuilding(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateBuildingSafely(bean: Building, mask?: BuildingMask): Promise<{ statusCode: number; building: (Building) }> {
  try {
    return await updateBuilding(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      building: bean,
    };
  }
}

async function batchUpdateBuilding(beans: Array<Building>, mask?: BuildingMask): Promise<Array<{ statusCode: number; building: (Building) }>> {
  return await Promise.all(beans.map((v) => updateBuildingSafely(v, mask)));
}

async function deleteBuilding(key: { mcmcu: string }): Promise<{ statusCode: number; key: { mcmcu: string } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.mcmcu}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { mcmcu: key.mcmcu },
    };
  }
  throw new ServerError(response.status);
}

async function deleteBuildingSafely(
  key: { mcmcu: string },
): Promise<{ statusCode: number; key: { mcmcu: string } }> {
  try {
    return await deleteBuilding(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteBuilding(keys: Array<{ mcmcu: string } >): Promise<Array<{ statusCode: number; key: { mcmcu: string } }>> {
  return await Promise.all(keys.map((v) => deleteBuildingSafely(v)));
}

async function queryBuilding(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: BuildingMask }): Promise<{ statusCode: number; list: Array<Building>; contentRange: ContentRange }> {
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
      list: deserializeBuildingList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countBuilding(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

function downloadBuildingAttachment(
  key: { mcmcu: string },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.mcmcu}${parameters(dict)}`;
}

async function uploadBuildingAttachment(
  key: { mcmcu: string },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { mcmcu: string }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.mcmcu}${parameters(dict)}`, {
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
  getBuilding,
  addBuilding,
  addBuildingSafely,
  batchAddBuilding,
  updateBuilding,
  updateBuildingSafely,
  batchUpdateBuilding,
  deleteBuilding,
  deleteBuildingSafely,
  batchDeleteBuilding,
  queryBuilding,
  countBuilding,
  downloadBuildingAttachment,
  uploadBuildingAttachment,
};
