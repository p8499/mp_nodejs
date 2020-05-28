import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { RoomMask } from '../mask/RoomMask';
import { deserializeRoom, deserializeRoomList, Room } from '../bean/Room';

const PATH = 'api/room';
const LIST_PATH = 'api/room_list';
const ATTACHMENT_PATH = 'api/room_attachment';

async function getRoom(
  key: { rmid: number },
  mask?: RoomMask,
): Promise<{ statusCode: number; room: Room }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.rmid.toString()}${parameters(dict)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      room: deserializeRoom(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addRoom(bean: Room): Promise<{ statusCode: number; room: (Room) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      room: deserializeRoom(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addRoomSafely(bean: Room): Promise<{ statusCode: number; room: (Room) }> {
  try {
    return await addRoom(bean);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      room: bean,
    };
  }
}

async function batchAddRoom(beans: Array<Room>): Promise<Array<{ statusCode: number; room: (Room) }>> {
  return await Promise.all(beans.map((v) => addRoomSafely(v)));
}

async function updateRoom(bean: Room, mask?: RoomMask): Promise<{ statusCode: number; room: (Room) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.rmid !== null ? bean.rmid.toString() : ''}${parameters(dict)}`, {
    method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString(),
  });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      room: deserializeRoom(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateRoomSafely(bean: Room, mask?: RoomMask): Promise<{ statusCode: number; room: (Room) }> {
  try {
    return await updateRoom(bean, mask);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      room: bean,
    };
  }
}

async function batchUpdateRoom(beans: Array<Room>, mask?: RoomMask): Promise<Array<{ statusCode: number; room: (Room) }>> {
  return await Promise.all(beans.map((v) => updateRoomSafely(v, mask)));
}

async function deleteRoom(key: { rmid: number }): Promise<{ statusCode: number; key: { rmid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.rmid.toString()}`, { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { rmid: key.rmid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteRoomSafely(
  key: { rmid: number },
): Promise<{ statusCode: number; key: { rmid: number } }> {
  try {
    return await deleteRoom(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteRoom(keys: Array<{ rmid: number } >): Promise<Array<{ statusCode: number; key: { rmid: number } }>> {
  return await Promise.all(keys.map((v) => deleteRoomSafely(v)));
}

async function queryRoom(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: RoomMask }): Promise<{ statusCode: number; list: Array<Room>; contentRange: ContentRange }> {
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
      list: deserializeRoomList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countRoom(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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

function downloadRoomAttachment(
  key: { rmid: number },
  name?: string, uuid?: string,
): string {
  const dict = Object();
  dict.name = name;
  dict.uuid = uuid;
  return `${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.rmid.toString()}${parameters(dict)}`;
}

async function uploadRoomAttachment(
  key: { rmid: number },
  buffer: ArrayBuffer, name?: string,
): Promise<{ statusCode: number; key: { rmid: number }; name?: string }> {
  const dict = Object();
  dict.name = name;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${ATTACHMENT_PATH}/${key.rmid.toString()}${parameters(dict)}`, {
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
  getRoom,
  addRoom,
  addRoomSafely,
  batchAddRoom,
  updateRoom,
  updateRoomSafely,
  batchUpdateRoom,
  deleteRoom,
  deleteRoomSafely,
  batchDeleteRoom,
  queryRoom,
  countRoom,
  downloadRoomAttachment,
  uploadRoomAttachment,
};
