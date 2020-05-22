<template>
    <div class="pac-table-filter-item">
        <select :style="{display: operand1Fixed? 'none' : 'block'}" style="margin-right: 4px;"
                :value="value.operand1"
                @input="changeOperand1($event.target.value !== ''? $event.target.value : null)">
            <option value="">Please select</option>
            <option v-for="(v, i) in value.spec.fields" :key="i" :value="i">{{v.description}}</option>
        </select>
        <div style="margin-right: 4px;" :class="{not: value.not}" tabindex="0"
             @keydown.space="emit({not: !value.not})"
             @click="emit({not: !value.not})">
            <span>Not</span>
        </div>
        <select v-if="value.isOperand1Completed" style="margin-right: 4px;"
                :value="value.operator"
                @input="changeOperator(value.operand1, $event.target.value !== ''? $event.target.value : null)">
            <option value="">Please select</option>
            <option v-if="['Integer', 'Double', 'java.util.Date'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="less">&lt;
            </option>
            <option v-if="['Integer', 'Double', 'java.util.Date'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="lessEqual">&lt;=
            </option>
            <option v-if="['Integer', 'Double', 'java.util.Date'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="equal">=
            </option>
            <option v-if="['Integer', 'Double', 'java.util.Date'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="greaterEqual">&gt;=
            </option>
            <option v-if="['Integer', 'Double', 'java.util.Date'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="greater">&gt;
            </option>
            <option v-if="['Integer', 'Double', 'java.util.Date'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="between">Between
            </option>
            <option v-if="['Integer', 'Double', 'java.util.Date'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="isEmpty">Empty
            </option>
            <option v-if="['String'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="contain">Inclusive of
            </option>
            <option v-if="['String'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="equal">Equivalent to
            </option>
            <option v-if="['String'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="startWith">Starting with
            </option>
            <option v-if="['String'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="endWith">Ending with
            </option>
            <option v-if="['String'].includes(value.spec.fields[value.operand1].javaType) && value.spec.fields[value.operand1].values === undefined"
                    value="isEmpty">Empty
            </option>
            <option v-if="value.spec.fields[value.operand1].values !== undefined"
                    value="in">in
            </option>
            <option v-if="value.spec.fields[value.operand1].values !== undefined"
                    value="isEmpty">Empty
            </option>
        </select>
        <pac-table-filter-item-operand2 v-if="value.isOperatorCompleted && type(value.operator) !== null" ref="operand2"
                                        :type="type(value.operator)"
                                        :spec="value.spec.fields[value.operand1]"
                                        :value="value.operand2"
                                        @input="changeOperand2($event)"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {FilterItemModel} from "./filter-item-model";

    @Component({name: 'pac-table-filter-item'})
    export default class PacTableFilterItem extends Vue {
        @Prop({type: Object, required: true})
        value!: FilterItemModel;

        @Prop({type: Boolean, required: false, default: false})
        operand1Fixed!: boolean;

        type(operator: string): string | null {
            if (['less', 'lessEqual', 'equal', 'greaterEqual', 'greater', 'contain', 'equal', 'startWith', 'endWith'].includes(operator))
                return 'single';
            else if (['between'].includes(operator))
                return 'range';
            else if (['in'].includes(operator))
                return 'list';
            else
                return null;
        }

        changeOperand1(operand1: string | null): void {
            const operator = this.calcOperator(operand1, this.value.operator);
            const operand2 = operator !== null ? this.calcOperand2(operand1, operator, this.value.operand2) : null;
            this.emit({operand1, operator, operand2});
        }

        changeOperator(operand1: string | null, operator: string | null): void {
            const operand2 = this.calcOperand2(operand1, operator, this.value.operand2);
            this.emit({operator, operand2});
        }

        changeOperand2(operand2: number | string | Date | Array<number | string | Date> | null): void {
            this.emit({operand2});
        }

        /*根据operand1求operator*/
        calcOperator(operand1: string | null, operator: string | null): string | null {
            if (operand1 !== null)
                if (['Integer', 'Double'].includes(this.value.spec.fields[operand1].javaType) && !('values' in this.value.spec.fields[operand1])) {
                    if (operator !== null && ['less', 'lessEqual', 'equal', 'greaterEqual', 'greater', 'between', 'isEmpty'].includes(operator))
                        return operator;
                    else {
                        return null;
                    }
                } else if (['String'].includes(this.value.spec.fields[operand1].javaType) && !('values' in this.value.spec.fields[operand1])) {
                    if (operator !== null && ['contain', 'equal', 'startWith', 'endWith', 'isEmpty'].includes(operator))
                        return operator;
                    else {
                        return null;
                    }
                } else if (['java.util.Date'].includes(this.value.spec.fields[operand1].javaType)) {
                    if (operator !== null && ['less', 'lessEqual', 'equal', 'greaterEqual', 'greater', 'between', 'isEmpty'].includes(operator))
                        return operator;
                    else {
                        return null;
                    }
                } else if ('values' in this.value.spec.fields[operand1]) {
                    if (operator !== null && ['in', 'isEmpty'].includes(operator))
                        return operator;
                    else {
                        return null;
                    }
                } else
                    return null;
            else
                return null;
        }

        /*根据operand1, operator求operand2*/
        calcOperand2(operand1: string | null, operator: string | null, operand2: number | string | Date | Array<number | string | Date> | null): number | string | Date | Array<number | string | Date> | null {
            if (operand1 !== null && operator !== null)
                if (['Integer'].includes(this.value.spec.fields[operand1].javaType) && !('values' in this.value.spec.fields[operand1])) {
                    if (['less', 'lessEqual', 'equal', 'greaterEqual', 'greater'].includes(operator)) {
                        if (typeof (operand2) === 'number')
                            return Number.isInteger(operand2) ? operand2 : Math.floor(operand2);
                        else
                            return null;
                    } else
                        return null;
                } else if (['Double'].includes(this.value.spec.fields[operand1].javaType) && !('values' in this.value.spec.fields[operand1])) {
                    if (['less', 'lessEqual', 'equal', 'greaterEqual', 'greater'].includes(operator)) {
                        if (typeof (operand2) === 'number')
                            return operand2;
                        else
                            return null;
                    } else
                        return null;
                } else if (['String'].includes(this.value.spec.fields[operand1].javaType) && !('values' in this.value.spec.fields[operand1])) {
                    if (['contain', 'equal', 'startWith', 'endWith', 'isEmpty'].includes(operator)) {
                        if (typeof (operand2) === 'string')
                            return operand2;
                        else
                            return null;
                    } else
                        return null;
                } else if (['java.util.Date'].includes(this.value.spec.fields[operand1].javaType) && this.value.spec.fields[operand1].datePrecision === 'date') {
                    if (['less', 'lessEqual', 'equal', 'greaterEqual', 'greater'].includes(operator)) {
                        if (operand2 instanceof Date)
                            return new Date(operand2.getFullYear(), operand2.getMonth(), operand2.getDate());
                        else if (Array.isArray(operand2) && operand2.length === 2 && operand2.every((value) => value instanceof Date))
                            return new Date((operand2[0] as Date).getFullYear(), (operand2[0] as Date).getMonth(), (operand2[0] as Date).getDate());
                        else
                            return null;
                    } else if (['between'].includes(operator)) {
                        if (Array.isArray(operand2) && operand2.length === 2 && operand2.every((value) => value instanceof Date))
                            return [new Date((operand2[0] as Date).getFullYear(), (operand2[0] as Date).getMonth(), (operand2[0] as Date).getDate()), new Date((operand2[1] as Date).getFullYear(), (operand2[1] as Date).getMonth(), (operand2[1] as Date).getDate())];
                        else if (operand2 instanceof Date)
                            return [new Date(operand2.getFullYear(), operand2.getMonth(), operand2.getDate()), new Date(operand2.getFullYear(), operand2.getMonth(), operand2.getDate())];
                        else
                            return null;
                    } else
                        return null;
                } else if (['java.util.Date'].includes(this.value.spec.fields[operand1].javaType) && this.value.spec.fields[operand1].datePrecision === 'datetime') {
                    if (['less', 'lessEqual', 'equal', 'greaterEqual', 'greater'].includes(operator)) {
                        if (operand2 instanceof Date)
                            return operand2;
                        else if (Array.isArray(operand2) && operand2.length === 2 && operand2.every((value) => value instanceof Date))
                            return operand2[0];
                        else
                            return null;
                    } else if (['between'].includes(operator)) {
                        if (Array.isArray(operand2) && operand2.length === 2 && operand2.every((value) => value instanceof Date))
                            return operand2;
                        else if (operand2 instanceof Date)
                            return [operand2, operand2];
                        else
                            return null;
                    } else
                        return null;
                } else if ('values' in this.value.spec.fields[operand1]) {
                    if (['in'].includes(operator)) {
                        return null;
                    } else
                        return null;
                } else
                    return null;
            else
                return null;
        }

        emit(payload: { operand1?: string | null; not?: boolean; operator?: string | null; operand2?: number | string | Date | Array<number | string | Date> | null }): void {
            const model = new FilterItemModel(this.value.spec,
                payload.operand1 === undefined ? this.value.operand1 : payload.operand1,
                payload.not === undefined ? this.value.not : payload.not,
                payload.operator === undefined ? this.value.operator : payload.operator,
                payload.operand2 === undefined ? this.value.operand2 : payload.operand2);
            this.$emit('input', model);
        }
    }
</script>

<style scoped>
    @import "pac-table.scss";
</style>
