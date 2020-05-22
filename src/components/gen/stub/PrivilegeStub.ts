import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { PrivilegeMask } from '../mask/PrivilegeMask';
import { deserializePrivilege, deserializePrivilegeList, Privilege } from '../bean/Privilege';

const PATH = 'api/privilege';
const LIST_PATH = 'api/privilege_list';
const ATTACHMENT_PATH = 'api/privilege_attachment';

async function getPrivilege(
  key: { prid: string },
  mask?: PrivilegeMask,
): Promise<{ statusCode: number; privilege: Privilege }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.prid}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      privilege: deserializePrivilege(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addPrivilege(bean: Privilege): Promise<{ statusCode: number; privilege: (Privilege) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.prid !== null ? bean.prid : ''}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      privilege: deserializePrivilege(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addPrivilegeSafely(bean: Privilege): Promise<{ statusCode: number; privilege: (Privilege) }> {
  try {
    return await addPrivilege(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      privilege: bean,
    };
  }
}

async function batchAddPrivilege(beans: Array<Privilege>): Promise<Array<{ statusCode: number; privilege: (Privilege) }>> {
  return await Promise.all(beans.map((v) => addPrivilegeSafely(v)));
}

async function updatePrivilege(bean: Privilege, mask?: PrivilegeMask): Promise<{ statusCode: number; privilege: (Privilege) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.prid !== null ? bean.prid : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      privilege: deserializePrivilege(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updatePrivilegeSafely(bean: Privilege, mask?: PrivilegeMask): Promise<{ statusCode: number; privilege: (Privilege) }> {
  try {
    return await updatePrivilege(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      privilege: bean,
    };
  }
}

async function batchUpdatePrivilege(beans: Array<Privilege>, mask?: PrivilegeMask): Promise<Array<{ statusCode: number; privilege: (Privilege) }>> {
  return await Promise.all(beans.map((v) => updatePrivilegeSafely(v)));
}

async function deletePrivilege(key: { prid: string }): Promise<{ statusCode: number; key: { prid: string } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.prid}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { prid: key.prid },
    };
  }
  throw new ServerError(response.status);
}

async function deletePrivilegeSafely(
  key: { prid: string },
): Promise<{ statusCode: number; key: { prid: string } }> {
  try {
    return await deletePrivilege(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeletePrivilege(keys: Array<{ prid: string } >): Promise<Array<{ statusCode: number; key: { prid: string } }>> {
  return await Promise.all(keys.map((v) => deletePrivilegeSafely(v)));
}

async function queryPrivilege(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: PrivilegeMask }): Promise<{ statusCode: number; list: Array<Privilege>; contentRange: ContentRange }> {
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
      list: deserializePrivilegeList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countPrivilege(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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
  getPrivilege,
  addPrivilege,
  addPrivilegeSafely,
  batchAddPrivilege,
  updatePrivilege,
  updatePrivilegeSafely,
  batchUpdatePrivilege,
  deletePrivilege,
  deletePrivilegeSafely,
  batchDeletePrivilege,
  queryPrivilege,
  countPrivilege,
};
