import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { UserRoleMask } from '../mask/UserRoleMask';
import { deserializeUserRole, deserializeUserRoleList, UserRole } from '../bean/UserRole';

const PATH = 'api/userrole';
const LIST_PATH = 'api/userrole_list';
const ATTACHMENT_PATH = 'api/userrole_attachment';

async function getUserRole(
  key: { urid: number },
  mask?: UserRoleMask,
): Promise<{ statusCode: number; userRole: UserRole }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.urid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      userRole: deserializeUserRole(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addUserRole(bean: UserRole): Promise<{ statusCode: number; userRole: (UserRole) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      userRole: deserializeUserRole(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addUserRoleSafely(bean: UserRole): Promise<{ statusCode: number; userRole: (UserRole) }> {
  try {
    return await addUserRole(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      userRole: bean,
    };
  }
}

async function batchAddUserRole(beans: Array<UserRole>): Promise<Array<{ statusCode: number; userRole: (UserRole) }>> {
  return await Promise.all(beans.map((v) => addUserRoleSafely(v)));
}

async function updateUserRole(bean: UserRole, mask?: UserRoleMask): Promise<{ statusCode: number; userRole: (UserRole) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.urid !== null ? bean.urid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      userRole: deserializeUserRole(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateUserRoleSafely(bean: UserRole, mask?: UserRoleMask): Promise<{ statusCode: number; userRole: (UserRole) }> {
  try {
    return await updateUserRole(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      userRole: bean,
    };
  }
}

async function batchUpdateUserRole(beans: Array<UserRole>, mask?: UserRoleMask): Promise<Array<{ statusCode: number; userRole: (UserRole) }>> {
  return await Promise.all(beans.map((v) => updateUserRoleSafely(v)));
}

async function deleteUserRole(key: { urid: number }): Promise<{ statusCode: number; key: { urid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.urid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { urid: key.urid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteUserRoleSafely(
  key: { urid: number },
): Promise<{ statusCode: number; key: { urid: number } }> {
  try {
    return await deleteUserRole(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteUserRole(keys: Array<{ urid: number } >): Promise<Array<{ statusCode: number; key: { urid: number } }>> {
  return await Promise.all(keys.map((v) => deleteUserRoleSafely(v)));
}

async function queryUserRole(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: UserRoleMask }): Promise<{ statusCode: number; list: Array<UserRole>; contentRange: ContentRange }> {
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
      list: deserializeUserRoleList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countUserRole(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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
  getUserRole,
  addUserRole,
  addUserRoleSafely,
  batchAddUserRole,
  updateUserRole,
  updateUserRoleSafely,
  batchUpdateUserRole,
  deleteUserRole,
  deleteUserRoleSafely,
  batchDeleteUserRole,
  queryUserRole,
  countUserRole,
};
