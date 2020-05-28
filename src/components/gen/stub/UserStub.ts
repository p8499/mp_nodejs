import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { UserMask } from '../mask/UserMask';
import { deserializeUser, deserializeUserList, User } from '../bean/User';

const PATH = 'api/user';
const LIST_PATH = 'api/user_list';
const ATTACHMENT_PATH = 'api/user_attachment';

async function getUser(
  key: { usid: number },
  mask?: UserMask,
): Promise<{ statusCode: number; user: User }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.usid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      user: deserializeUser(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addUser(bean: User): Promise<{ statusCode: number; user: (User) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      user: deserializeUser(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addUserSafely(bean: User): Promise<{ statusCode: number; user: (User) }> {
  try {
    return await addUser(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      user: bean,
    };
  }
}

async function batchAddUser(beans: Array<User>): Promise<Array<{ statusCode: number; user: (User) }>> {
  return await Promise.all(beans.map((v) => addUserSafely(v)));
}

async function updateUser(bean: User, mask?: UserMask): Promise<{ statusCode: number; user: (User) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.usid !== null ? bean.usid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      user: deserializeUser(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateUserSafely(bean: User, mask?: UserMask): Promise<{ statusCode: number; user: (User) }> {
  try {
    return await updateUser(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      user: bean,
    };
  }
}

async function batchUpdateUser(beans: Array<User>, mask?: UserMask): Promise<Array<{ statusCode: number; user: (User) }>> {
  return await Promise.all(beans.map((v) => updateUserSafely(v, mask)));
}

async function deleteUser(key: { usid: number }): Promise<{ statusCode: number; key: { usid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.usid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { usid: key.usid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteUserSafely(
  key: { usid: number },
): Promise<{ statusCode: number; key: { usid: number } }> {
  try {
    return await deleteUser(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteUser(keys: Array<{ usid: number } >): Promise<Array<{ statusCode: number; key: { usid: number } }>> {
  return await Promise.all(keys.map((v) => deleteUserSafely(v)));
}

async function queryUser(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: UserMask }): Promise<{ statusCode: number; list: Array<User>; contentRange: ContentRange }> {
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
      list: deserializeUserList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countUser(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

function downloadUserAttachment(
  key: { usid: number },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.usid.toString()}${parameters(dict)}`;
}

async function uploadUserAttachment(
  key: { usid: number },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { usid: number }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.usid.toString()}${parameters(dict)}`, {
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
  getUser,
  addUser,
  addUserSafely,
  batchAddUser,
  updateUser,
  updateUserSafely,
  batchUpdateUser,
  deleteUser,
  deleteUserSafely,
  batchDeleteUser,
  queryUser,
  countUser,
  downloadUserAttachment,
  uploadUserAttachment,
};
