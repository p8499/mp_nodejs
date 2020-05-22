import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { InspectionTypeMask } from '../mask/InspectionTypeMask';
import { deserializeInspectionType, deserializeInspectionTypeList, InspectionType } from '../bean/InspectionType';

const PATH = 'api/inspectiontype';
const LIST_PATH = 'api/inspectiontype_list';
const ATTACHMENT_PATH = 'api/inspectiontype_attachment';

async function getInspectionType(
  key: { itid: string },
  mask?: InspectionTypeMask,
): Promise<{ statusCode: number; inspectionType: InspectionType }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.itid}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      inspectionType: deserializeInspectionType(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addInspectionType(bean: InspectionType): Promise<{ statusCode: number; inspectionType: (InspectionType) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.itid !== null ? bean.itid : ''}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      inspectionType: deserializeInspectionType(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addInspectionTypeSafely(bean: InspectionType): Promise<{ statusCode: number; inspectionType: (InspectionType) }> {
  try {
    return await addInspectionType(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      inspectionType: bean,
    };
  }
}

async function batchAddInspectionType(beans: Array<InspectionType>): Promise<Array<{ statusCode: number; inspectionType: (InspectionType) }>> {
  return await Promise.all(beans.map((v) => addInspectionTypeSafely(v)));
}

async function updateInspectionType(bean: InspectionType, mask?: InspectionTypeMask): Promise<{ statusCode: number; inspectionType: (InspectionType) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.itid !== null ? bean.itid : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      inspectionType: deserializeInspectionType(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateInspectionTypeSafely(bean: InspectionType, mask?: InspectionTypeMask): Promise<{ statusCode: number; inspectionType: (InspectionType) }> {
  try {
    return await updateInspectionType(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      inspectionType: bean,
    };
  }
}

async function batchUpdateInspectionType(beans: Array<InspectionType>, mask?: InspectionTypeMask): Promise<Array<{ statusCode: number; inspectionType: (InspectionType) }>> {
  return await Promise.all(beans.map((v) => updateInspectionTypeSafely(v)));
}

async function deleteInspectionType(key: { itid: string }): Promise<{ statusCode: number; key: { itid: string } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.itid}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { itid: key.itid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteInspectionTypeSafely(
  key: { itid: string },
): Promise<{ statusCode: number; key: { itid: string } }> {
  try {
    return await deleteInspectionType(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteInspectionType(keys: Array<{ itid: string } >): Promise<Array<{ statusCode: number; key: { itid: string } }>> {
  return await Promise.all(keys.map((v) => deleteInspectionTypeSafely(v)));
}

async function queryInspectionType(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: InspectionTypeMask }): Promise<{ statusCode: number; list: Array<InspectionType>; contentRange: ContentRange }> {
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
      list: deserializeInspectionTypeList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countInspectionType(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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
  getInspectionType,
  addInspectionType,
  addInspectionTypeSafely,
  batchAddInspectionType,
  updateInspectionType,
  updateInspectionTypeSafely,
  batchUpdateInspectionType,
  deleteInspectionType,
  deleteInspectionTypeSafely,
  batchDeleteInspectionType,
  queryInspectionType,
  countInspectionType,
};
