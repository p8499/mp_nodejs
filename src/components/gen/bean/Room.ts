import { ROOM_SPEC } from '../spec/RoomSpec';
import { RoomMask } from '../mask/RoomMask';
import { Bean } from '../bean';


class Room implements Bean {
  constructor(public rmid: number|null = null, public rmserial: string|null = null, public rman8: number|null = null, public rmname: string|null = null, public rmcwid: number|null = null, public rmcwname: string|null = null, public rmwcmcu: string|null = null, public rmwcdl01: string|null = null) {
  }

  equals(target: Room, mask: RoomMask = new RoomMask(true, true, true, true, true, true, true, true)): boolean {
    return !(mask.getRmid() && !((this.rmid === null && target.rmid === null) || (this.rmid !== null && target.rmid !== null && this.rmid === target.rmid))) && !(mask.getRmserial() && !((this.rmserial === null && target.rmserial === null) || (this.rmserial !== null && target.rmserial !== null && this.rmserial === target.rmserial))) && !(mask.getRman8() && !((this.rman8 === null && target.rman8 === null) || (this.rman8 !== null && target.rman8 !== null && this.rman8 === target.rman8))) && !(mask.getRmname() && !((this.rmname === null && target.rmname === null) || (this.rmname !== null && target.rmname !== null && this.rmname === target.rmname))) && !(mask.getRmcwid() && !((this.rmcwid === null && target.rmcwid === null) || (this.rmcwid !== null && target.rmcwid !== null && this.rmcwid === target.rmcwid))) && !(mask.getRmcwname() && !((this.rmcwname === null && target.rmcwname === null) || (this.rmcwname !== null && target.rmcwname !== null && this.rmcwname === target.rmcwname))) && !(mask.getRmwcmcu() && !((this.rmwcmcu === null && target.rmwcmcu === null) || (this.rmwcmcu !== null && target.rmwcmcu !== null && this.rmwcmcu === target.rmwcmcu))) && !(mask.getRmwcdl01() && !((this.rmwcdl01 === null && target.rmwcdl01 === null) || (this.rmwcdl01 !== null && target.rmwcdl01 !== null && this.rmwcdl01 === target.rmwcdl01)));
  }

  copy(target: Room = new Room(), mask: RoomMask = new RoomMask(true, true, true, true, true, true, true, true)): Room {
    if (mask.getRmid()) { target.rmid = this.rmid; }
    if (mask.getRmserial()) { target.rmserial = this.rmserial; }
    if (mask.getRman8()) { target.rman8 = this.rman8; }
    if (mask.getRmname()) { target.rmname = this.rmname; }
    if (mask.getRmcwid()) { target.rmcwid = this.rmcwid; }
    if (mask.getRmcwname()) { target.rmcwname = this.rmcwname; }
    if (mask.getRmwcmcu()) { target.rmwcmcu = this.rmwcmcu; }
    if (mask.getRmwcdl01()) { target.rmwcdl01 = this.rmwcdl01; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.rmid !== null) { texts.push(`"rmid":${this.rmid}`); }
    if (this.rmserial !== null) { texts.push(`"rmserial":"${this.rmserial}"`); }
    if (this.rman8 !== null) { texts.push(`"rman8":${this.rman8}`); }
    if (this.rmname !== null) { texts.push(`"rmname":"${this.rmname}"`); }
    if (this.rmcwid !== null) { texts.push(`"rmcwid":${this.rmcwid}`); }
    if (this.rmcwname !== null) { texts.push(`"rmcwname":"${this.rmcwname}"`); }
    if (this.rmwcmcu !== null) { texts.push(`"rmwcmcu":"${this.rmwcmcu}"`); }
    if (this.rmwcdl01 !== null) { texts.push(`"rmwcdl01":"${this.rmwcdl01}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeRoom(str: string): Room {
  try {
    const obj = JSON.parse(str);
    return new Room(
      'rmid' in obj ? obj.rmid : null,
      'rmserial' in obj ? obj.rmserial : null,
      'rman8' in obj ? obj.rman8 : null,
      'rmname' in obj ? obj.rmname : null,
      'rmcwid' in obj ? obj.rmcwid : null,
      'rmcwname' in obj ? obj.rmcwname : null,
      'rmwcmcu' in obj ? obj.rmwcmcu : null,
      'rmwcdl01' in obj ? obj.rmwcdl01 : null,
    );
  } catch {
    throw Error('Error deserializing Room');
  }
}

function deserializeRoomList(str: string): Array<Room> {
  try {
    return JSON.parse(str).map((obj: any) => new Room(
      'rmid' in obj ? obj.rmid : null,
      'rmserial' in obj ? obj.rmserial : null,
      'rman8' in obj ? obj.rman8 : null,
      'rmname' in obj ? obj.rmname : null,
      'rmcwid' in obj ? obj.rmcwid : null,
      'rmcwname' in obj ? obj.rmcwname : null,
      'rmwcmcu' in obj ? obj.rmwcmcu : null,
      'rmwcdl01' in obj ? obj.rmwcdl01 : null,
    ));
  } catch {
    throw Error('Error deserializing RoomList');
  }
}

export {
  Room,
  deserializeRoom,
  deserializeRoomList,
};
