import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { RolePrivilegeMask } from '../mask/RolePrivilegeMask';
import { deserializeRolePrivilege, deserializeRolePrivilegeList, RolePrivilege } from '../bean/RolePrivilege';

const PATH = 'api/roleprivilege';
const LIST_PATH = 'api/roleprivilege_list';
const ATTACHMENT_PATH = 'api/roleprivilege_attachment';

async function getRolePrivilege(
  key: { rpid: number },
  mask?: RolePrivilegeMask,
): Promise<{ statusCode: number; rolePrivilege: RolePrivilege }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.rpid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      rolePrivilege: deserializeRolePrivilege(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addRolePrivilege(bean: RolePrivilege): Promise<{ statusCode: number; rolePrivilege: (RolePrivilege) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      rolePrivilege: deserializeRolePrivilege(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addRolePrivilegeSafely(bean: RolePrivilege): Promise<{ statusCode: number; rolePrivilege: (RolePrivilege) }> {
  try {
    return await addRolePrivilege(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      rolePrivilege: bean,
    };
  }
}

async function batchAddRolePrivilege(beans: Array<RolePrivilege>): Promise<Array<{ statusCode: number; rolePrivilege: (RolePrivilege) }>> {
  return await Promise.all(beans.map((v) => addRolePrivilegeSafely(v)));
}

async function updateRolePrivilege(bean: RolePrivilege, mask?: RolePrivilegeMask): Promise<{ statusCode: number; rolePrivilege: (RolePrivilege) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.rpid !== null ? bean.rpid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      rolePrivilege: deserializeRolePrivilege(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateRolePrivilegeSafely(bean: RolePrivilege, mask?: RolePrivilegeMask): Promise<{ statusCode: number; rolePrivilege: (RolePrivilege) }> {
  try {
    return await updateRolePrivilege(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      rolePrivilege: bean,
    };
  }
}

async function batchUpdateRolePrivilege(beans: Array<RolePrivilege>, mask?: RolePrivilegeMask): Promise<Array<{ statusCode: number; rolePrivilege: (RolePrivilege) }>> {
  return await Promise.all(beans.map((v) => updateRolePrivilegeSafely(v)));
}

async function deleteRolePrivilege(key: { rpid: number }): Promise<{ statusCode: number; key: { rpid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.rpid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { rpid: key.rpid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteRolePrivilegeSafely(
  key: { rpid: number },
): Promise<{ statusCode: number; key: { rpid: number } }> {
  try {
    return await deleteRolePrivilege(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteRolePrivilege(keys: Array<{ rpid: number } >): Promise<Array<{ statusCode: number; key: { rpid: number } }>> {
  return await Promise.all(keys.map((v) => deleteRolePrivilegeSafely(v)));
}

async function queryRolePrivilege(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: RolePrivilegeMask }): Promise<{ statusCode: number; list: Array<RolePrivilege>; contentRange: ContentRange }> {
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
      list: deserializeRolePrivilegeList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countRolePrivilege(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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
  getRolePrivilege,
  addRolePrivilege,
  addRolePrivilegeSafely,
  batchAddRolePrivilege,
  updateRolePrivilege,
  updateRolePrivilegeSafely,
  batchUpdateRolePrivilege,
  deleteRolePrivilege,
  deleteRolePrivilegeSafely,
  batchDeleteRolePrivilege,
  queryRolePrivilege,
  countRolePrivilege,
};
