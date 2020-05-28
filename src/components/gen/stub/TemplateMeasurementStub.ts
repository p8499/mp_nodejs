import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { TemplateMeasurementMask } from '../mask/TemplateMeasurementMask';
import { deserializeTemplateMeasurement, deserializeTemplateMeasurementList, TemplateMeasurement } from '../bean/TemplateMeasurement';

const PATH = 'api/templatemeasurement';
const LIST_PATH = 'api/templatemeasurement_list';
const ATTACHMENT_PATH = 'api/templatemeasurement_attachment';

async function getTemplateMeasurement(
  key: { tsid: number },
  mask?: TemplateMeasurementMask,
): Promise<{ statusCode: number; templateMeasurement: TemplateMeasurement }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.tsid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      templateMeasurement: deserializeTemplateMeasurement(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addTemplateMeasurement(bean: TemplateMeasurement): Promise<{ statusCode: number; templateMeasurement: (TemplateMeasurement) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      templateMeasurement: deserializeTemplateMeasurement(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addTemplateMeasurementSafely(bean: TemplateMeasurement): Promise<{ statusCode: number; templateMeasurement: (TemplateMeasurement) }> {
  try {
    return await addTemplateMeasurement(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      templateMeasurement: bean,
    };
  }
}

async function batchAddTemplateMeasurement(beans: Array<TemplateMeasurement>): Promise<Array<{ statusCode: number; templateMeasurement: (TemplateMeasurement) }>> {
  return await Promise.all(beans.map((v) => addTemplateMeasurementSafely(v)));
}

async function updateTemplateMeasurement(bean: TemplateMeasurement, mask?: TemplateMeasurementMask): Promise<{ statusCode: number; templateMeasurement: (TemplateMeasurement) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.tsid !== null ? bean.tsid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      templateMeasurement: deserializeTemplateMeasurement(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateTemplateMeasurementSafely(bean: TemplateMeasurement, mask?: TemplateMeasurementMask): Promise<{ statusCode: number; templateMeasurement: (TemplateMeasurement) }> {
  try {
    return await updateTemplateMeasurement(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      templateMeasurement: bean,
    };
  }
}

async function batchUpdateTemplateMeasurement(beans: Array<TemplateMeasurement>, mask?: TemplateMeasurementMask): Promise<Array<{ statusCode: number; templateMeasurement: (TemplateMeasurement) }>> {
  return await Promise.all(beans.map((v) => updateTemplateMeasurementSafely(v, mask)));
}

async function deleteTemplateMeasurement(key: { tsid: number }): Promise<{ statusCode: number; key: { tsid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.tsid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { tsid: key.tsid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteTemplateMeasurementSafely(
  key: { tsid: number },
): Promise<{ statusCode: number; key: { tsid: number } }> {
  try {
    return await deleteTemplateMeasurement(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteTemplateMeasurement(keys: Array<{ tsid: number } >): Promise<Array<{ statusCode: number; key: { tsid: number } }>> {
  return await Promise.all(keys.map((v) => deleteTemplateMeasurementSafely(v)));
}

async function queryTemplateMeasurement(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: TemplateMeasurementMask }): Promise<{ statusCode: number; list: Array<TemplateMeasurement>; contentRange: ContentRange }> {
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
      list: deserializeTemplateMeasurementList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countTemplateMeasurement(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

function downloadTemplateMeasurementAttachment(
  key: { tsid: number },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.tsid.toString()}${parameters(dict)}`;
}

async function uploadTemplateMeasurementAttachment(
  key: { tsid: number },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { tsid: number }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.tsid.toString()}${parameters(dict)}`, {
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
  getTemplateMeasurement,
  addTemplateMeasurement,
  addTemplateMeasurementSafely,
  batchAddTemplateMeasurement,
  updateTemplateMeasurement,
  updateTemplateMeasurementSafely,
  batchUpdateTemplateMeasurement,
  deleteTemplateMeasurement,
  deleteTemplateMeasurementSafely,
  batchDeleteTemplateMeasurement,
  queryTemplateMeasurement,
  countTemplateMeasurement,
  downloadTemplateMeasurementAttachment,
  uploadTemplateMeasurementAttachment,
};
