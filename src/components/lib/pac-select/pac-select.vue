<template>
    <pac-select-number v-if="['Integer','Double'].includes(spec.javaType)"
                       :label="label === undefined? spec.description : label"
                       :required="required === undefined? spec.notNull : required"
                       :disabled="disabled"
                       :value="value" @input="$emit('input', $event)"
                       @input:error="$emit('input:error', $event)"
                       :values="() => values"/>
    <pac-select-string v-else-if="['String'].includes(spec.javaType)"
                       :label="label === undefined? spec.description : label"
                       :required="required === undefined? spec.notNull : required"
                       :disabled="disabled"
                       :value="value" @input="$emit('input', $event)"
                       @input:error="$emit('input:error', $event)"
                       :values="() => values"/>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {FieldSpec} from "@/components/gen/spec";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";
    import {formatDate, formatDateTime} from "@/components/gen/dateFormatter";

    @Component({name: 'pac-select'})
    export default class PacSelect extends Vue {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false})
        label?: string | null;

        @Prop({type: Object, required: true})
        spec!: FieldSpec;

        @Prop({type: Boolean, required: false,default:undefined})
        required?: boolean;

        @Prop({type: Boolean, required: false, default: false})
        disabled!: boolean;

        @Prop({
            validator: (value) => typeof (value) === 'number' || typeof (value) === 'string' || value instanceof Date || value === null,
            required: true
        })
        value!: number | string | Date | null;

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