import {Component} from "vue-property-decorator";
import PacCommon, {trimLeft} from "@/components/lib/pac-common";

function recognizeNumber(raw: string): boolean {
    return /^[+-]?[0-9]+\.[0-9]*$/.test(raw)
        || /^[+-]?[0-9]*\.[0-9]+$/.test(raw)
        || /^[+-]?[0-9]+$/.test(raw);
}

function normalizeNumber(raw: string, fraction: number): string {
    const posPos = raw.indexOf('+');
    const negPos = raw.indexOf('-');
    const sgnPos = posPos > -1 ? posPos : negPos > -1 ? negPos : -1;
    const dotPos = raw.indexOf('.');
    const sgn = negPos > -1 ? '-' : '';
    const int = dotPos > -1 ? raw.substring(sgnPos + 1, dotPos) : raw.substring(sgnPos + 1);
    const fra = dotPos > -1 ? raw.substring(dotPos + 1) : '';
    //整数段
    let intNormalized = trimLeft(int, '0');
    intNormalized = intNormalized !== '' ? intNormalized : '0';
    //小数段
    const fraNormalized = fra.length > fraction ? fra.substring(0, fraction) : `${fra}${'0'.repeat(fraction - fra.length)}`;
    //整合
    return `${intNormalized !== '0' || !fraNormalized.match('^0*$') ? sgn : ''}${intNormalized}${fraNormalized !== '' ? '.' : ''}${fraNormalized}`;
}

function recognizeDate(raw: string): boolean {
    return /^[0-9]{8}$/.test(raw)
        || /^[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}$/.test(raw);
}

function normalizeDate(raw: string): string {
    //补齐斜杠
    const slashed = raw.indexOf('/') > -1 ? raw : `${raw.substr(0, 4)}/${raw.substr(4, 2)}/${raw.substr(6, 2)}`;
    //补足月日
    const sl1Pos = slashed.indexOf('/');
    const sl2Pos = slashed.indexOf('/', sl1Pos + 1);
    const yea = slashed.substring(0, sl1Pos);
    const mon = slashed.substring(sl1Pos + 1, sl2Pos);
    const dte = slashed.substring(sl2Pos + 1);
    return `${yea}/${mon.padStart(2, '0')}/${dte.padStart(2, '0')}`;
}

function validateDate(raw: string): boolean {
    const yeaInt = parseInt(raw.substr(0, 4));
    const monInt = parseInt(raw.substr(5, 2));
    const dteInt = parseInt(raw.substr(8, 2));
    return monInt === 1 && dteInt >= 1 && dteInt <= 31 ||
        monInt === 2 && (yeaInt % 4 == 0 && yeaInt % 100 != 0 || yeaInt % 400 == 0) && dteInt >= 1 && dteInt <= 29 ||
        monInt === 2 && !(yeaInt % 4 == 0 && yeaInt % 100 != 0 || yeaInt % 400 == 0) && dteInt >= 1 && dteInt <= 28 ||
        monInt === 3 && dteInt >= 1 && dteInt <= 31 ||
        monInt === 4 && dteInt >= 1 && dteInt <= 30 ||
        monInt === 5 && dteInt >= 1 && dteInt <= 31 ||
        monInt === 6 && dteInt >= 1 && dteInt <= 30 ||
        monInt === 7 && dteInt >= 1 && dteInt <= 31 ||
        monInt === 8 && dteInt >= 1 && dteInt <= 31 ||
        monInt === 9 && dteInt >= 1 && dteInt <= 30 ||
        monInt === 10 && dteInt >= 1 && dteInt <= 31 ||
        monInt === 11 && dteInt >= 1 && dteInt <= 30 ||
        monInt === 12 && dteInt >= 1 && dteInt <= 31;
}

function recognizeTime(raw: string): boolean {
    return /^$/.test(raw)
        || /^[0-9]{1,6}$/.test(raw)
        || /^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/.test(raw)
        || /^[0-9]{1,2}:[0-9]{1,2}:$/.test(raw)
        || /^[0-9]{1,2}:[0-9]{1,2}$/.test(raw)
        || /^[0-9]{1,2}:$/.test(raw);
}

function normalizeTime(raw: string): string {
    const co1Pos = raw.indexOf(':');
    const co2Pos = raw.indexOf(':', co1Pos + 1);
    const hou = co1Pos > -1 ? raw.substring(0, co1Pos)
        : raw.length < 1 ? '0'
            : raw.length % 2 === 0 ? raw.substr(0, 2) : raw.substr(0, 1);
    const min = co1Pos > -1 && co2Pos > -1 ? raw.substring(co1Pos + 1, co2Pos)
        : co1Pos > -1 ? raw.substring(co1Pos + 1)
            : raw.length < 3 ? '0'
                : raw.length % 2 === 0 ? raw.substr(2, 2) : raw.substr(1, 2);
    const sec = co2Pos > -1 ? raw.substring(co2Pos + 1)
        : raw.length < 5 ? '0'
            : raw.length % 2 === 0 ? raw.substr(4, 2) : raw.substr(3, 2);
    return `${hou.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
}

function validateTime(raw: string): boolean {
    const houInt = parseInt(raw.substr(0, 2));
    const minInt = parseInt(raw.substr(3, 2));
    const secInt = parseInt(raw.substr(6, 2));
    return houInt < 24 && minInt < 60 && secInt < 60;
}

function recognizeDatetime(raw: string): boolean {
    if (raw.indexOf(' ') > -1) {
        const parts = raw.split(' ');
        return parts.length === 2 && recognizeDate(parts[0]) && recognizeTime(parts[1]);
    } else {
        return raw.length >= 8 && recognizeDate(raw.substr(0, 8)) && recognizeTime(raw.substr(8));
    }
}


function normalizeDatetime(raw: string): string {
    if (raw.indexOf(' ') > -1) {
        const parts = raw.split(' ');
        return `${normalizeDate(parts[0])} ${normalizeTime(parts[1])}`;
    } else {
        return `${normalizeDate(raw.substr(0, 8))} ${normalizeTime(raw.substr(8))}`;
    }
}


function validateDatetime(raw: string): boolean {
    if (raw.indexOf(' ') > -1) {
        const parts = raw.split(' ');
        return validateDate(parts[0]) && validateTime(parts[1]);
    } else {
        return validateDate(raw.substr(0, 8)) && validateDate(raw.substr(8));
    }
}

function dateToString(date: Date): string {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dte = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${dte}`;
}

function stringToDate(str: string): Date {
    /^(\d{4})\/(\d{2})\/(\d{2})$/.exec(str);
    return new Date(parseInt(RegExp.$1), parseInt(RegExp.$2) - 1, parseInt(RegExp.$3), 0, 0, 0, 0);
}

function datetimeToString(date: Date): string {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const dte = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}/${month}/${dte} ${hour}:${minute}:${second}`;
}

function stringToDatetime(str: string): Date {
    /^(\d{4})\/(\d{2})\/(\d{2})[ ](\d{2}):(\d{2}):(\d{2})$/.exec(str);
    return new Date(parseInt(RegExp.$1), parseInt(RegExp.$2) - 1, parseInt(RegExp.$3), parseInt(RegExp.$4), parseInt(RegExp.$5), parseInt(RegExp.$6), 0);
}

@Component({name: 'pac-input-common'})
export default class PacInputCommon extends PacCommon {
    recognizeNumber = recognizeNumber;
    normalizeNumber = normalizeNumber;
    recognizeDate = recognizeDate;
    normalizeDate = normalizeDate;
    validateDate = validateDate;
    recognizeTime = recognizeTime;
    normalizeTime = normalizeTime;
    validateTime = validateTime;
    recognizeDatetime = recognizeDatetime;
    normalizeDatetime = normalizeDatetime;
    validateDatetime = validateDatetime;
    dateToString = dateToString;
    stringToDate = stringToDate;
    datetimeToString = datetimeToString;
    stringToDatetime = stringToDatetime;
}
export {
    recognizeNumber,
    normalizeNumber,
    recognizeDate,
    normalizeDate,
    validateDate,
    recognizeTime,
    normalizeTime,
    validateTime,
    recognizeDatetime,
    normalizeDatetime,
    validateDatetime,
    dateToString,
    stringToDate,
    datetimeToString,
    stringToDatetime,
}