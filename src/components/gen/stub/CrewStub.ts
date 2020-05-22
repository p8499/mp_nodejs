import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { CrewMask } from '../mask/CrewMask';
import { deserializeCrew, deserializeCrewList, Crew } from '../bean/Crew';

const PATH = 'api/crew';
const LIST_PATH = 'api/crew_list';
const ATTACHMENT_PATH = 'api/crew_attachment';

async function getCrew(
  key: { cwid: number },
  mask?: CrewMask,
): Promise<{ statusCode: number; crew: Crew }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.cwid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      crew: deserializeCrew(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addCrew(bean: Crew): Promise<{ statusCode: number; crew: (Crew) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      crew: deserializeCrew(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addCrewSafely(bean: Crew): Promise<{ statusCode: number; crew: (Crew) }> {
  try {
    return await addCrew(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      crew: bean,
    };
  }
}

async function batchAddCrew(beans: Array<Crew>): Promise<Array<{ statusCode: number; crew: (Crew) }>> {
  return await Promise.all(beans.map((v) => addCrewSafely(v)));
}

async function updateCrew(bean: Crew, mask?: CrewMask): Promise<{ statusCode: number; crew: (Crew) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.cwid !== null ? bean.cwid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      crew: deserializeCrew(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateCrewSafely(bean: Crew, mask?: CrewMask): Promise<{ statusCode: number; crew: (Crew) }> {
  try {
    return await updateCrew(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      crew: bean,
    };
  }
}

async function batchUpdateCrew(beans: Array<Crew>, mask?: CrewMask): Promise<Array<{ statusCode: number; crew: (Crew) }>> {
  return await Promise.all(beans.map((v) => updateCrewSafely(v)));
}

async function deleteCrew(key: { cwid: number }): Promise<{ statusCode: number; key: { cwid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.cwid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { cwid: key.cwid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteCrewSafely(
  key: { cwid: number },
): Promise<{ statusCode: number; key: { cwid: number } }> {
  try {
    return await deleteCrew(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteCrew(keys: Array<{ cwid: number } >): Promise<Array<{ statusCode: number; key: { cwid: number } }>> {
  return await Promise.all(keys.map((v) => deleteCrewSafely(v)));
}

async function queryCrew(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: CrewMask }): Promise<{ statusCode: number; list: Array<Crew>; contentRange: ContentRange }> {
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
      list: deserializeCrewList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countCrew(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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
  getCrew,
  addCrew,
  addCrewSafely,
  batchAddCrew,
  updateCrew,
  updateCrewSafely,
  batchUpdateCrew,
  deleteCrew,
  deleteCrewSafely,
  batchDeleteCrew,
  queryCrew,
  countCrew,
};
