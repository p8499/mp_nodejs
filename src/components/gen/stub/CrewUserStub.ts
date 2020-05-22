import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { CrewUserMask } from '../mask/CrewUserMask';
import { deserializeCrewUser, deserializeCrewUserList, CrewUser } from '../bean/CrewUser';

const PATH = 'api/crewuser';
const LIST_PATH = 'api/crewuser_list';
const ATTACHMENT_PATH = 'api/crewuser_attachment';

async function getCrewUser(
  key: { cuid: number },
  mask?: CrewUserMask,
): Promise<{ statusCode: number; crewUser: CrewUser }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.cuid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      crewUser: deserializeCrewUser(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addCrewUser(bean: CrewUser): Promise<{ statusCode: number; crewUser: (CrewUser) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      crewUser: deserializeCrewUser(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addCrewUserSafely(bean: CrewUser): Promise<{ statusCode: number; crewUser: (CrewUser) }> {
  try {
    return await addCrewUser(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      crewUser: bean,
    };
  }
}

async function batchAddCrewUser(beans: Array<CrewUser>): Promise<Array<{ statusCode: number; crewUser: (CrewUser) }>> {
  return await Promise.all(beans.map((v) => addCrewUserSafely(v)));
}

async function updateCrewUser(bean: CrewUser, mask?: CrewUserMask): Promise<{ statusCode: number; crewUser: (CrewUser) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.cuid !== null ? bean.cuid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      crewUser: deserializeCrewUser(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateCrewUserSafely(bean: CrewUser, mask?: CrewUserMask): Promise<{ statusCode: number; crewUser: (CrewUser) }> {
  try {
    return await updateCrewUser(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      crewUser: bean,
    };
  }
}

async function batchUpdateCrewUser(beans: Array<CrewUser>, mask?: CrewUserMask): Promise<Array<{ statusCode: number; crewUser: (CrewUser) }>> {
  return await Promise.all(beans.map((v) => updateCrewUserSafely(v)));
}

async function deleteCrewUser(key: { cuid: number }): Promise<{ statusCode: number; key: { cuid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.cuid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { cuid: key.cuid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteCrewUserSafely(
  key: { cuid: number },
): Promise<{ statusCode: number; key: { cuid: number } }> {
  try {
    return await deleteCrewUser(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteCrewUser(keys: Array<{ cuid: number } >): Promise<Array<{ statusCode: number; key: { cuid: number } }>> {
  return await Promise.all(keys.map((v) => deleteCrewUserSafely(v)));
}

async function queryCrewUser(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: CrewUserMask }): Promise<{ statusCode: number; list: Array<CrewUser>; contentRange: ContentRange }> {
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
      list: deserializeCrewUserList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countCrewUser(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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
  getCrewUser,
  addCrewUser,
  addCrewUserSafely,
  batchAddCrewUser,
  updateCrewUser,
  updateCrewUserSafely,
  batchUpdateCrewUser,
  deleteCrewUser,
  deleteCrewUserSafely,
  batchDeleteCrewUser,
  queryCrewUser,
  countCrewUser,
};
