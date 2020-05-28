import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { WorkCenterMask } from '../mask/WorkCenterMask';
import { deserializeWorkCenter, deserializeWorkCenterList, WorkCenter } from '../bean/WorkCenter';

const PATH = 'api/workcenter';
const LIST_PATH = 'api/workcenter_list';
const ATTACHMENT_PATH = 'api/workcenter_attachment';

async function getWorkCenter(
  key: { wcmcu: string },
  mask?: WorkCenterMask,
): Promise<{ statusCode: number; workCenter: WorkCenter }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.wcmcu}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      workCenter: deserializeWorkCenter(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addWorkCenter(bean: WorkCenter): Promise<{ statusCode: number; workCenter: (WorkCenter) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.wcmcu !== null ? bean.wcmcu : ''}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      workCenter: deserializeWorkCenter(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addWorkCenterSafely(bean: WorkCenter): Promise<{ statusCode: number; workCenter: (WorkCenter) }> {
  try {
    return await addWorkCenter(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      workCenter: bean,
    };
  }
}

async function batchAddWorkCenter(beans: Array<WorkCenter>): Promise<Array<{ statusCode: number; workCenter: (WorkCenter) }>> {
  return await Promise.all(beans.map((v) => addWorkCenterSafely(v)));
}

async function updateWorkCenter(bean: WorkCenter, mask?: WorkCenterMask): Promise<{ statusCode: number; workCenter: (WorkCenter) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.wcmcu !== null ? bean.wcmcu : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      workCenter: deserializeWorkCenter(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateWorkCenterSafely(bean: WorkCenter, mask?: WorkCenterMask): Promise<{ statusCode: number; workCenter: (WorkCenter) }> {
  try {
    return await updateWorkCenter(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      workCenter: bean,
    };
  }
}

async function batchUpdateWorkCenter(beans: Array<WorkCenter>, mask?: WorkCenterMask): Promise<Array<{ statusCode: number; workCenter: (WorkCenter) }>> {
  return await Promise.all(beans.map((v) => updateWorkCenterSafely(v, mask)));
}

async function deleteWorkCenter(key: { wcmcu: string }): Promise<{ statusCode: number; key: { wcmcu: string } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.wcmcu}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { wcmcu: key.wcmcu },
    };
  }
  throw new ServerError(response.status);
}

async function deleteWorkCenterSafely(
  key: { wcmcu: string },
): Promise<{ statusCode: number; key: { wcmcu: string } }> {
  try {
    return await deleteWorkCenter(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteWorkCenter(keys: Array<{ wcmcu: string } >): Promise<Array<{ statusCode: number; key: { wcmcu: string } }>> {
  return await Promise.all(keys.map((v) => deleteWorkCenterSafely(v)));
}

async function queryWorkCenter(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: WorkCenterMask }): Promise<{ statusCode: number; list: Array<WorkCenter>; contentRange: ContentRange }> {
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
      list: deserializeWorkCenterList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countWorkCenter(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

function downloadWorkCenterAttachment(
  key: { wcmcu: string },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.wcmcu}${parameters(dict)}`;
}

async function uploadWorkCenterAttachment(
  key: { wcmcu: string },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { wcmcu: string }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.wcmcu}${parameters(dict)}`, {
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
  getWorkCenter,
  addWorkCenter,
  addWorkCenterSafely,
  batchAddWorkCenter,
  updateWorkCenter,
  updateWorkCenterSafely,
  batchUpdateWorkCenter,
  deleteWorkCenter,
  deleteWorkCenterSafely,
  batchDeleteWorkCenter,
  queryWorkCenter,
  countWorkCenter,
  downloadWorkCenterAttachment,
  uploadWorkCenterAttachment,
};
