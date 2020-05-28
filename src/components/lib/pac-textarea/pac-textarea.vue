<template>
    <pac-textarea-string if="['String'].includes(spec.javaType)"
                         :label="label === undefined? spec.description : label"
                         :required="required === undefined? spec.notNull : required"
                         :disabled="disabled" :length="spec.lengthString"
                         :nullOrBlank="nullOrBlank === undefined? (required === undefined? spec.notNull : required)? 'blank' : 'null' : nullOrBlank"
                         :value="value" @input="$emit('input', $event)"
                         @input:error="$emit('input:error', $event)"
                         :validate="validate"/>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {FieldSpec} from "../../gen/spec";

    @Component({name: 'pac-textarea'})
    export default class PacTextarea extends Vue {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false})
        label?: string | null;

        @Prop({type: Object, required: true})
        spec!: FieldSpec;

        @Prop({type: Boolean, required: false, default: undefined})
        required?: boolean;

        @Prop({type: Boolean, required: false, default: false})
        disabled!: boolean;

        @Prop({
            validator: (value) => value === 'null' || value === 'blank',
            required: false
        })
        nullOrBlank?: string;

        @Prop({
            validator: (value) => typeof (value) === 'string' || value === null,
            required: true
        })
        value!: number | string | Date | null;

        @Prop({type: Function, required: false, default: async () => null})
        validate!: (value: number | string | Date | null) => Promise<string | null>;
    }
</script>

<style lang="scss">
</style>