<template>
    <pac-input-number-list v-if="['Integer','Double'].includes(spec.javaType)" ref="inner"
                           :label="label === undefined? spec.description : label"
                           :disabled="disabled" :fraction="spec.lengthFraction"
                           :min="min === undefined? spec.min : min" :max="max === undefined? spec.max : max"
                           :minSize="minSize" :maxSize="maxSize"
                           :value="value" @input="$emit('input', $event)"
                           @input:error="$emit('input:error', $event)"
                           :select="spec.select === undefined || suppressSelect? null : spec.select"
                           :values="values" :separator="separator" :validate="validate"/>
    <pac-input-string-list v-else-if="['String'].includes(spec.javaType)" ref="inner"
                           :label="label === undefined? spec.description : label"
                           :disabled="disabled" :length="spec.lengthString"
                           :minSize="minSize" :maxSize="maxSize"
                           :value="value" @input="$emit('input', $event)"
                           @input:error="$emit('input:error', $event)"
                           :select="spec.select === undefined || suppressSelect? null : spec.select"
                           :values="values" :separator="separator" :validate="validate"/>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import {Prop, Vue} from "vue-property-decorator";
    import {FieldSpec} from "@/components/gen/spec";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";
    import {formatDate, formatDateTime} from "@/components/gen/dateFormatter";

    @Component({name: 'pac-input-list'})
    export default class PacInputList extends Vue {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false})
        label?: string | null;

        @Prop({type: Object, required: true})
        spec!: FieldSpec;

        @Prop({type: Boolean, required: false, default: false})
        disabled!: boolean;

        @Prop({type: [Number, Date], required: false})
        min?: number | Date;

        @Prop({type: [Number, Date], required: false})
        max?: number | Date;

        @Prop({type: String, required: false, default: ','})
        separator!: string;

        @Prop({type: Number, required: false, default: 0})
        minSize!: number;

        @Prop({type: Number, required: false, default: 99})
        maxSize!: number;

        @Prop({type: Boolean, required: false, default: false})
        suppressSelect!: boolean;

        @Prop({
            validator: (value) => Array.isArray(value),
            required: true
        })
        value!: Array<number | string | Date>;

        @Prop({type: Function, required: false, default: async () => null})
        validate!: (value: Array<number | string | Date>) => Promise<string | null>;

        get values(): Array<PacValueModel> {
            const values = this.spec.values;
            if (values !== undefined)
                return Object.keys(values).map(code => {
                    const value = values[code].value;
                    let valueStr = '';
                    if (typeof (value) === 'number') valueStr = value.toString();
                    else if (typeof (value) === 'string') valueStr = value;
                    else if (this.spec.datePrecision === 'date') valueStr = formatDate(value);
                    else valueStr = formatDateTime(value);
                    return new PacValueModel(valueStr, values[code].label);
                });
            else
                return [];
        }
    }
</script>

<style lang="scss">

</style>