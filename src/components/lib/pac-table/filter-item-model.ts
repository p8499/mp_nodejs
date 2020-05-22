import {
    FilterConditionExpr,
    FilterExpr,
    FilterLogicExpr,
    FilterOperandExpr,
    OP_AND,
    OP_CONTAIN,
    OP_DATE,
    OP_DATEFIELD,
    OP_DATETIME,
    OP_DATETIMEFIELD,
    OP_ENDWITH,
    OP_EQUAL,
    OP_EXISTS,
    OP_FIELD,
    OP_GREATER,
    OP_GREATEREQUAL,
    OP_ISEMPTY,
    OP_LESS,
    OP_LESSEQUAL,
    OP_NOT,
    OP_NUMBER,
    OP_OR,
    OP_STARTWITH,
    OP_STRING
} from "../../gen/filter";
import {formatDate, formatDateTime, parseDate, parseDateTime} from "../../gen/dateFormatter";
import {BeanSpec} from "../../gen/spec";

class FilterItemModel {
    constructor(public spec: BeanSpec, public operand1: string | null = null, public not: boolean = false, public operator: string | null = null, public operand2: number | string | Date | Array<number | string | Date> | null = null) {
    }

    get isOperand1Completed(): boolean {
        return typeof (this.operand1) === 'string';
    }

    get isOperatorCompleted(): boolean {
        return typeof (this.operator) === 'string';
    }

    get isOperand2Completed(): boolean {
        switch (this.operator) {
            case 'isEmpty':
                return this.operand2 === null;
            case 'between':
                return Array.isArray(this.operand2) && this.operand2.length === 2 && this.operand2.every((value) => {
                    if (['Integer', 'Double'].includes(this.spec.fields[this.operand1 as string].javaType))
                        return typeof (value) === "number";
                    else if (['String'].includes(this.spec.fields[this.operand1 as string].javaType))
                        return typeof (value) === "string";
                    else if (['java.util.Date'].includes(this.spec.fields[this.operand1 as string].javaType))
                        return value instanceof Date;
                    else
                        return false;
                });
            case 'in':
                return Array.isArray(this.operand2) && this.operand2.length > 0 && this.operand2.every((value) => {
                    if (['Integer', 'Double'].includes(this.spec.fields[this.operand1 as string].javaType))
                        return typeof (value) === "number";
                    else if (['String'].includes(this.spec.fields[this.operand1 as string].javaType))
                        return typeof (value) === "string";
                    else if (['java.util.Date'].includes(this.spec.fields[this.operand1 as string].javaType))
                        return value instanceof Date;
                    else
                        return false;
                });
            default:
                return this.operand2 !== null;
        }
    }

    get isCompleted(): boolean {
        return this.isOperand1Completed && this.isOperatorCompleted && this.isOperand2Completed;
    }

    get expr(): FilterExpr | undefined {
        if (!this.isCompleted)
            return undefined;
        else if (['Integer', 'Double'].includes(this.spec.fields[this.operand1 as string].javaType) && !('values' in this.spec.fields[this.operand1 as string])) {
            if (['less', 'lessEqual', 'equal', 'greaterEqual', 'greater'].includes(this.operator as string)) {
                const expr = new FilterConditionExpr(this.operator as string, new FilterOperandExpr(OP_FIELD, this.operand1 as string), new FilterOperandExpr(OP_NUMBER, (this.operand2 as number).toString()));
                return this.not ? expr.not() : expr;
            } else if (['between'].includes(this.operator as string)) {
                const expr = new FilterLogicExpr(OP_AND).geNumber(this.operand1 as string, (this.operand2 as Array<number>)[0]).leNumber(this.operand1 as string, (this.operand2 as Array<number>)[1]);
                return this.not ? expr.not() : expr;
            } else if (['isEmpty'].includes(this.operator as string)) {
                const expr = new FilterConditionExpr(OP_ISEMPTY, new FilterOperandExpr(OP_FIELD, this.operand1 as string));
                return this.not ? expr.not() : expr;
            } else
                return undefined;
        } else if (['String'].includes(this.spec.fields[this.operand1 as string].javaType) && !('values' in this.spec.fields[this.operand1 as string])) {
            if (['contain', 'equal', 'startWith', 'endWith'].includes(this.operator as string)) {
                const expr = new FilterConditionExpr(this.operator as string, new FilterOperandExpr(OP_FIELD, this.operand1 as string), new FilterOperandExpr(OP_STRING, this.operand2 as string));
                return this.not ? expr.not() : expr;
            } else if (['isEmpty'].includes(this.operator as string)) {
                const expr = new FilterConditionExpr(OP_ISEMPTY, new FilterOperandExpr(OP_FIELD, this.operand1 as string));
                return this.not ? expr.not() : expr;
            } else
                return undefined;
        } else if (['java.util.Date'].includes(this.spec.fields[this.operand1 as string].javaType) && this.spec.fields[this.operand1 as string].datePrecision === 'date') {
            if (['less', 'lessEqual', 'equal', 'greaterEqual', 'greater'].includes(this.operator as string)) {
                const expr = new FilterConditionExpr(this.operator as string, new FilterOperandExpr(OP_DATEFIELD, this.operand1 as string), new FilterOperandExpr(OP_DATE, formatDate(this.operand2 as Date)));
                return this.not ? expr.not() : expr;
            } else if (['between'].includes(this.operator as string)) {
                const expr = new FilterLogicExpr(OP_AND).geDate(this.operand1 as string, (this.operand2 as Array<Date>)[0]).leDate(this.operand1 as string, (this.operand2 as Array<Date>)[1]);
                return this.not ? expr.not() : expr;
            } else if (['isEmpty'].includes(this.operator as string)) {
                const expr = new FilterConditionExpr(OP_ISEMPTY, new FilterOperandExpr(OP_FIELD, this.operand1 as string));
                return this.not ? expr.not() : expr;
            } else
                return undefined;
        } else if (['java.util.Date'].includes(this.spec.fields[this.operand1 as string].javaType) && this.spec.fields[this.operand1 as string].datePrecision === 'datetime') {
            if (['less', 'lessEqual', 'equal', 'greaterEqual', 'greater'].includes(this.operator as string)) {
                const expr = new FilterConditionExpr(this.operator as string, new FilterOperandExpr(OP_DATETIMEFIELD, this.operand1 as string), new FilterOperandExpr(OP_DATETIME, formatDateTime(this.operand2 as Date)));
                return this.not ? expr.not() : expr;
            } else if (['between'].includes(this.operator as string)) {
                const expr = new FilterLogicExpr(OP_AND).geDateTime(this.operand1 as string, (this.operand2 as Array<Date>)[0]).leDateTime(this.operand1 as string, (this.operand2 as Array<Date>)[1]);
                return this.not ? expr.not() : expr;
            } else if (['isEmpty'].includes(this.operator as string)) {
                const expr = new FilterConditionExpr(OP_ISEMPTY, new FilterOperandExpr(OP_FIELD, this.operand1 as string));
                return this.not ? expr.not() : expr;
            } else
                return undefined;
        } else if (['Integer', 'Double'].includes(this.spec.fields[this.operand1 as string].javaType) && 'values' in this.spec.fields[this.operand1 as string]) {
            if (['in'].includes(this.operator as string)) {
                const expr = new FilterLogicExpr(OP_OR);
                for (const v of this.operand2 as Array<number>)
                    expr.equalsNumber(this.operand1 as string, v);
                return this.not ? expr.not() : expr;
            } else if (['isEmpty'].includes(this.operator as string)) {
                const expr = new FilterConditionExpr(OP_ISEMPTY, new FilterOperandExpr(OP_FIELD, this.operand1 as string));
                return this.not ? expr.not() : expr;
            } else
                return undefined;
        } else if (['String'].includes(this.spec.fields[this.operand1 as string].javaType) && 'values' in this.spec.fields[this.operand1 as string]) {
            if (['in'].includes(this.operator as string)) {
                const expr = new FilterLogicExpr(OP_OR);
                for (const v of this.operand2 as Array<string>)
                    expr.equalsString(this.operand1 as string, v);
                return this.not ? expr.not() : expr;
            } else if (['isEmpty'].includes(this.operator as string)) {
                const expr = new FilterConditionExpr(OP_ISEMPTY, new FilterOperandExpr(OP_FIELD, this.operand1 as string));
                return this.not ? expr.not() : expr;
            } else
                return undefined;
        } else
            return undefined;
    }
}

function filterExprToItemModel(expr: FilterExpr, spec: BeanSpec): FilterItemModel {
    let operand1 = "",
        not = false,
        operator = "",
        operand2: number | string | Date | Array<number | string | Date> | null = null;
    const parse = (op: string, data: string): number | string | Date => {
        switch (op) {
            case OP_NUMBER:
                return parseFloat(data);
            case OP_STRING:
                return data;
            case OP_DATE:
                return parseDate(data);
            case OP_DATETIME:
                return parseDateTime(data);
            default:
                return data;
        }
    };
    const parse0 = (expr: FilterExpr, n: boolean): boolean => {
        if (expr instanceof FilterConditionExpr
            && [OP_ISEMPTY].includes(expr.op)
            && [OP_FIELD].includes((expr.data[0] as FilterOperandExpr).op)) {
            operand1 = (expr.data[0] as FilterOperandExpr).data;
            not = n;
            operator = expr.op;
            operand2 = null;
            return true;
        } else return false;
    };
    const parse1 = (expr: FilterExpr, n: boolean): boolean => {
        if (expr instanceof FilterConditionExpr
            && [OP_EQUAL, OP_GREATER, OP_LESS, OP_GREATEREQUAL, OP_LESSEQUAL, OP_CONTAIN, OP_STARTWITH, OP_ENDWITH, OP_EXISTS].includes(expr.op)
            && [OP_FIELD, OP_DATEFIELD, OP_DATETIMEFIELD].includes((expr.data[0] as FilterOperandExpr).op)
            && [OP_NUMBER, OP_STRING, OP_DATE, OP_DATETIME].includes((expr.data[1] as FilterOperandExpr).op)) {
            operand1 = (expr.data[0] as FilterOperandExpr).data;
            not = n;
            operator = expr.op;
            operand2 = parse((expr.data[1] as FilterOperandExpr).op, (expr.data[1] as FilterOperandExpr).data);
            return true;
        } else return false;
    };
    const parse2In = (expr: FilterExpr, n: boolean): boolean => {
        if (expr instanceof FilterLogicExpr
            && [OP_OR].includes(expr.op)
            && expr.data.every((condition) => condition instanceof FilterConditionExpr
                && condition.op === OP_EQUAL
                && [OP_FIELD].includes((condition.data[0] as FilterOperandExpr).op)
                && (condition.data[0] as FilterOperandExpr).op === ((expr.data[0] as FilterConditionExpr).data[0] as FilterOperandExpr).op
                && (condition.data[0] as FilterOperandExpr).data === ((expr.data[0] as FilterConditionExpr).data[0] as FilterOperandExpr).data
                && [OP_NUMBER, OP_STRING].includes((condition.data[1] as FilterOperandExpr).op))) {
            operand1 = ((expr.data[0] as FilterConditionExpr).data[0] as FilterOperandExpr).data;
            not = n;
            operator = 'in';
            operand2 = expr.data.map((value) => parse(((value as FilterConditionExpr).data[1] as FilterOperandExpr).op, ((value as FilterConditionExpr).data[1] as FilterOperandExpr).data));
            return true;
        } else return false;
    };
    const parse2Between = function (expr: FilterExpr, n: boolean): boolean {
        if (expr instanceof FilterLogicExpr
            && [OP_AND].includes(expr.op)
            && expr.data.length === 2
            && (expr.data[0] as FilterConditionExpr).op === OP_GREATEREQUAL
            && (expr.data[1] as FilterConditionExpr).op === OP_LESSEQUAL
            && [OP_DATEFIELD, OP_DATETIMEFIELD].includes(((expr.data[0] as FilterConditionExpr).data[0] as FilterOperandExpr).op)
            && ((expr.data[0] as FilterConditionExpr).data[0] as FilterOperandExpr).op === ((expr.data[1] as FilterConditionExpr).data[0] as FilterOperandExpr).op
            && [OP_DATE, OP_DATETIME].includes(((expr.data[0] as FilterConditionExpr).data[1] as FilterOperandExpr).op)
            && ((expr.data[0] as FilterConditionExpr).data[1] as FilterOperandExpr).op === ((expr.data[1] as FilterConditionExpr).data[1] as FilterOperandExpr).op) {
            operand1 = ((expr.data[0] as FilterConditionExpr).data[0] as FilterOperandExpr).data;
            not = n;
            operator = 'between';
            operand2 = [
                parse(((expr.data[0] as FilterConditionExpr).data[1] as FilterOperandExpr).op, ((expr.data[0] as FilterConditionExpr).data[1] as FilterOperandExpr).data),
                parse(((expr.data[1] as FilterConditionExpr).data[1] as FilterOperandExpr).op, ((expr.data[1] as FilterConditionExpr).data[1] as FilterOperandExpr).data)];
            return true;
        } else return false;
    };
    const parseNot = function (expr: FilterExpr): boolean {
        return expr instanceof FilterLogicExpr
            && [OP_NOT].includes(expr.op)
            && (parse0(expr.data[0], true) || parse1(expr.data[0], true) || parse2In(expr.data[0], true) || parse2Between(expr.data[0], true));
    };
    if (parse0(expr, false) || parse1(expr, false) || parse2In(expr, false) || parse2Between(expr, false) || parseNot(expr))
        return new FilterItemModel(spec, operand1, not, operator, operand2);
    else
        return new FilterItemModel(spec, null, false, null, null);
}

export {
    FilterItemModel,
    filterExprToItemModel
}