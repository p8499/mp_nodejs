<template>
    <pac-input v-if="type === 'single'" v-model="operand21"
               :label="null" :spec="spec" :required="true"/>
    <div v-else-if="type === 'range'">
        <pac-input v-model="operand22a" :label="null" :spec="spec" :required="true"/>
        <pac-input v-model="operand22b" :label="null" :spec="spec" :required="true"
                   style="margin-top: 4px;"/>
    </div>
    <pac-input-list v-else-if="type === 'list'" v-model="operand2n"
                    :label="null" :spec="spec" :required="true" :minSize="1"/>

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {FieldSpec} from "@/components/gen/spec";

    @Component({name: 'pac-table-filter-item-operand2'})
    export default class PacTableFilterItemOperand2 extends Vue {
        @Prop({
            validator: (value) => ['single', 'range', 'list'].includes(value),
            required: true
        })
        type!: string;

        @Prop({type: Object, required: true})
        spec!: FieldSpec;

        @Prop({
            validator: (value) => typeof (value) === 'number' || typeof (value) === 'string' || value instanceof Date || Array.isArray(value) || value === null,
            required: true
        })
        value!: number | string | Date | Array<number | string | Date> | null;

        @Watch('value')
        onValueChange(newVal: number | string | Date | Array<number | string | Date> | null): void {
            //外部更改
            if (newVal !== this.currentValue) {
                this.operand21 = this.formatOperand21(newVal);
                this.operand22a = this.formatOperand22a(newVal);
                this.operand22b = this.formatOperand22b(newVal);
                this.operand2n = this.formatOperand2n(newVal);
            }
        }

        //本地存根，emit前先更新它，以识别是外部更改还是内部更改
        currentValue: number | string | Date | Array<number | string | Date> | null = this.value;

        operand21: number | string | Date | null = this.formatOperand21(this.value);
        operand22a: number | string | Date | null = this.formatOperand22a(this.value);
        operand22b: number | string | Date | null = this.formatOperand22b(this.value);
        operand2n: Array<number | string | Date> = this.formatOperand2n(this.value);

        @Watch('operand21')
        onOperand21Change(newVal: number | string | Date | null): void {
            if (this.type === 'single')
                this.emit(newVal);
        }

        @Watch('operand22a')
        onOperand22aChange(newVal: number | string | Date | null): void {
            if (this.type === 'range' && newVal !== null && this.operand22b !== null)
                this.emit([newVal, this.operand22b]);
        }

        @Watch('operand22b')
        onOperand22bChange(newVal: number | string | Date | null): void {
            if (this.type === 'range' && this.operand22a !== null && newVal !== null)
                this.emit([this.operand22a, newVal]);
        }

        @Watch('operand2n')
        onOperand2nChange(newVal: Array<number | string | Date>): void {
            if (this.type === 'list')
                this.emit(newVal);
        }

        emit(value: number | string | Date | Array<number | string | Date> | null): void {
            this.currentValue = value;
            this.$emit('input', value);
        }

        formatOperand21(value: number | string | Date | Array<number | string | Date> | null): number | string | Date | null {
            if (this.type === 'single')
                return value !== null && !Array.isArray(value) ? value : null;
            else
                return null;
        }

        formatOperand22a(value: number | string | Date | Array<number | string | Date> | null): number | string | Date | null {
            if (this.type === 'range')
                return Array.isArray(value) ? value[0] : null;
            else
                return null;
        }

        formatOperand22b(value: number | string | Date | Array<number | string | Date> | null): number | string | Date | null {
            if (this.type === 'range')
                return Array.isArray(value) ? value[1] : null;
            else
                return null;
        }

        formatOperand2n(value: number | string | Date | Array<number | string | Date> | null): Array<number | string | Date> {
            if (this.type === 'list')
                return Array.isArray(value) ? value : [];
            else
                return [];
        }
    }
</script>

<style scoped>

</style>