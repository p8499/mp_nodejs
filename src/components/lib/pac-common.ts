import {Component, Vue} from "vue-property-decorator";
import {decode, encode} from "universal-base64";
import {filterExprToItemsModel, FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
import {BeanSpec} from "@/components/gen/spec";
import {deserializeFilterExpr, FilterLogicExpr} from "@/components/gen/filter";
import {orderByExprToModel, SortModel} from "@/components/lib/pac-table/sort-model";
import {deserializeOrderByExpr, OrderByExpr} from "@/components/gen/order";

function trimLeft(str: string, char: string): string {
    let dPos = 0;
    for (let i = 0; i < str.length; i++)
        if (str[i] !== char) {
            dPos = i;
            break;
        }
    return str.substring(dPos);
}

function unique<T>(arr: Array<T>): Array<T> {
    const newArr = [];
    for (let i = 0; i < arr.length; i++)
        if (newArr.indexOf(arr[i]) === -1)
            newArr.push(arr[i]);
    return newArr;
}

function intersect<T>(arr1: Array<T>, arr2: Array<T>, compare: (v1: T, v2: T) => boolean = (v1, v2) => v1 === v2): Array<T> {
    return arr1.filter(v => arr2.findIndex(v2 => compare(v2, v)) > -1);
}

function union<T>(arr1: Array<T>, arr2: Array<T>, compare: (v1: T, v2: T) => boolean = (v1, v2) => v1 === v2): Array<T> {
    return [...arr1, ...arr2.filter(v => arr1.findIndex(v1 => compare(v1, v)) === -1)];
}

function subtract<T>(arr1: Array<T>, arr2: Array<T>, compare: (v1: T, v2: T) => boolean = (v1, v2) => v1 === v2): Array<T> {
    return arr1.filter(v => arr2.findIndex(v2 => compare(v2, v)) === -1);
}

function u2<U1, U2, R>(arr1: Array<U1>, arr2: Array<U2>, formular: (v1: U1, v2: U2) => R): Array<R> {
    const result = new Array<R>();
    for (let i = 0; i < arr1.length && i < arr2.length; i++)
        result.push(formular(arr1[i], arr2[i]));
    return result;
}

function u2a<U1, U2, R>(arr1: Array<U1>, arr2: Array<U2>, formular: (v1: U1, v2: U2 | undefined) => R): Array<R> {
    const result = new Array<R>();
    for (let i = 0; i < arr1.length; i++)
        result.push(formular(arr1[i], arr2[i]));
    return result;

}

function coalesce(...values: Array<any>): any {
    for (const value of values)
        if (value !== undefined)
            return value;
    return undefined;
}

function elvis<T>(obj: any, func: (obj: any) => T): T | undefined {
    if (obj !== undefined)
        return func(obj);
    else
        return undefined;
}

function filterItemsModelToString(model: FilterItemsModel | null | undefined): string | undefined {
    const expr = model?.expr;
    return expr instanceof FilterLogicExpr ? encode(expr.toString()) : undefined;
}

function stringToFilterItemsModel(spec: BeanSpec, str?: string): FilterItemsModel | undefined {
    if (typeof (str) === 'string')
        return filterExprToItemsModel(deserializeFilterExpr(decode(str)) as FilterLogicExpr, spec);
}

function sortModelToString(model: SortModel | null | undefined): string | undefined {
    return model instanceof SortModel ? model.expr.only().toString() : undefined;
}

function stringToSortModel(str?: string): SortModel | undefined {
    if (typeof (str) === 'string')
        return orderByExprToModel(deserializeOrderByExpr(str) as OrderByExpr)
}

function numberToString(num: number): string {
    return num.toString();
}

function stringToNumber(str?: string): number | undefined {
    if (typeof (str) === 'string')
        return parseInt(str);
}

@Component({name: 'pac-common'})
export default class PacCommon extends Vue {
    private static _nextInt = 0;

    static nextInt(): number {
        return PacCommon._nextInt++;
    }

    trimLeft = trimLeft;
    unique = unique;
    intersect = intersect;
    union = union;
    subtract = subtract;
    u2 = u2;
    u2a = u2a;
    coalesce = coalesce;
    elvis = elvis;
    filterItemsModelToString = filterItemsModelToString;
    stringToFilterItemsModel = stringToFilterItemsModel;
    sortModelToString = sortModelToString;
    stringToSortModel = stringToSortModel;
    numberToString = numberToString;
    stringToNumber = stringToNumber;
}
export {
    trimLeft,
    unique,
    intersect,
    union,
    subtract,
    u2,
    u2a,
    coalesce,
    elvis,
    filterItemsModelToString,
    stringToFilterItemsModel,
    sortModelToString,
    stringToSortModel,
    numberToString,
    stringToNumber
}