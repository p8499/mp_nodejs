import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { BranchMask } from '../mask/BranchMask';
import { deserializeBranch, deserializeBranchList, Branch } from '../bean/Branch';

const PATH = 'api/branch';
const LIST_PATH = 'api/branch_list';
const ATTACHMENT_PATH = 'api/branch_attachment';

async function getBranch(
  key: { bpmcu: string },
  mask?: BranchMask,
): Promise<{ statusCode: number; branch: Branch }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.bpmcu}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      branch: deserializeBranch(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addBranch(bean: Branch): Promise<{ statusCode: number; branch: (Branch) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.bpmcu !== null ? bean.bpmcu : ''}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      branch: deserializeBranch(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addBranchSafely(bean: Branch): Promise<{ statusCode: number; branch: (Branch) }> {
  try {
    return await addBranch(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      branch: bean,
    };
  }
}

async function batchAddBranch(beans: Array<Branch>): Promise<Array<{ statusCode: number; branch: (Branch) }>> {
  return await Promise.all(beans.map((v) => addBranchSafely(v)));
}

async function updateBranch(bean: Branch, mask?: BranchMask): Promise<{ statusCode: number; branch: (Branch) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.bpmcu !== null ? bean.bpmcu : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      branch: deserializeBranch(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateBranchSafely(bean: Branch, mask?: BranchMask): Promise<{ statusCode: number; branch: (Branch) }> {
  try {
    return await updateBranch(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      branch: bean,
    };
  }
}

async function batchUpdateBranch(beans: Array<Branch>, mask?: BranchMask): Promise<Array<{ statusCode: number; branch: (Branch) }>> {
  return await Promise.all(beans.map((v) => updateBranchSafely(v, mask)));
}

async function deleteBranch(key: { bpmcu: string }): Promise<{ statusCode: number; key: { bpmcu: string } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.bpmcu}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { bpmcu: key.bpmcu },
    };
  }
  throw new ServerError(response.status);
}

async function deleteBranchSafely(
  key: { bpmcu: string },
): Promise<{ statusCode: number; key: { bpmcu: string } }> {
  try {
    return await deleteBranch(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteBranch(keys: Array<{ bpmcu: string } >): Promise<Array<{ statusCode: number; key: { bpmcu: string } }>> {
  return await Promise.all(keys.map((v) => deleteBranchSafely(v)));
}

async function queryBranch(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: BranchMask }): Promise<{ statusCode: number; list: Array<Branch>; contentRange: ContentRange }> {
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
      list: deserializeBranchList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countBranch(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

function downloadBranchAttachment(
  key: { bpmcu: string },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.bpmcu}${parameters(dict)}`;
}

async function uploadBranchAttachment(
  key: { bpmcu: string },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { bpmcu: string }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.bpmcu}${parameters(dict)}`, {
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
  getBranch,
  addBranch,
  addBranchSafely,
  batchAddBranch,
  updateBranch,
  updateBranchSafely,
  batchUpdateBranch,
  deleteBranch,
  deleteBranchSafely,
  batchDeleteBranch,
  queryBranch,
  countBranch,
  downloadBranchAttachment,
  uploadBranchAttachment,
};
