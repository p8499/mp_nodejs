import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { RoleMask } from '../mask/RoleMask';
import { deserializeRole, deserializeRoleList, Role } from '../bean/Role';

const PATH = 'api/role';
const LIST_PATH = 'api/role_list';
const ATTACHMENT_PATH = 'api/role_attachment';

async function getRole(
  key: { roid: string },
  mask?: RoleMask,
): Promise<{ statusCode: number; role: Role }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.roid}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      role: deserializeRole(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addRole(bean: Role): Promise<{ statusCode: number; role: (Role) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.roid !== null ? bean.roid : ''}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      role: deserializeRole(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addRoleSafely(bean: Role): Promise<{ statusCode: number; role: (Role) }> {
  try {
    return await addRole(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      role: bean,
    };
  }
}

async function batchAddRole(beans: Array<Role>): Promise<Array<{ statusCode: number; role: (Role) }>> {
  return await Promise.all(beans.map((v) => addRoleSafely(v)));
}

async function updateRole(bean: Role, mask?: RoleMask): Promise<{ statusCode: number; role: (Role) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.roid !== null ? bean.roid : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      role: deserializeRole(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateRoleSafely(bean: Role, mask?: RoleMask): Promise<{ statusCode: number; role: (Role) }> {
  try {
    return await updateRole(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      role: bean,
    };
  }
}

async function batchUpdateRole(beans: Array<Role>, mask?: RoleMask): Promise<Array<{ statusCode: number; role: (Role) }>> {
  return await Promise.all(beans.map((v) => updateRoleSafely(v)));
}

async function deleteRole(key: { roid: string }): Promise<{ statusCode: number; key: { roid: string } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.roid}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { roid: key.roid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteRoleSafely(
  key: { roid: string },
): Promise<{ statusCode: number; key: { roid: string } }> {
  try {
    return await deleteRole(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteRole(keys: Array<{ roid: string } >): Promise<Array<{ statusCode: number; key: { roid: string } }>> {
  return await Promise.all(keys.map((v) => deleteRoleSafely(v)));
}

async function queryRole(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: RoleMask }): Promise<{ statusCode: number; list: Array<Role>; contentRange: ContentRange }> {
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
      list: deserializeRoleList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countRole(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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
  getRole,
  addRole,
  addRoleSafely,
  batchAddRole,
  updateRole,
  updateRoleSafely,
  batchUpdateRole,
  deleteRole,
  deleteRoleSafely,
  batchDeleteRole,
  queryRole,
  countRole,
};
