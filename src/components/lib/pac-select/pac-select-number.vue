<template>
    <div class="pac-select">
        <label :for="id">
            <span :class="{'no-label': label === null}">{{label}}</span>
        </label>
        <select :id="id" :value="value" @input="select($event.target.value)"
                :disabled="disabled" class="right" :class="{'error': message !== null}">
            <option v-for="v in values" :key="v.value" :value="v.value">{{v.label}}</option>
        </select>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import {Prop, Vue} from "vue-property-decorator";
    import PacCommon from "@/components/lib/pac-common";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";
    import {PacErrorObj} from "@/components/lib/pac-errors/pac-errors-model";

    @Component({name: 'pac-select-Number'})
    export default class PacSelectNumber extends Vue {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        label!: string | null;

        @Prop({type: Boolean, required: false, default: false})
        required!: boolean;

        @Prop({type: Boolean, required: true})
        disabled!: boolean;

        @Prop({validator: (value) => typeof (value) === 'number' || value === null, required: false, default: null})
        value!: number | null;

        @Prop({type: Array, required: false, default: () => []})
        values!: Array<PacValueModel>;

        id = PacCommon.nextInt().toString();

        message: string | null = null;

        select(value: string | null): void {
            if (value !== null)
                this.emit(parseFloat(value), null);
            else
                this.emit(null, `${this.label !== null ? this.label : ''}必须选择`);
        }

        emit(value: number | null, message: string | null): void {
            this.message = message;
            this.$emit('input', value);
            this.$emit('input:error', new PacErrorObj(this.id, message));
        }
    }
</script>

<style lang="scss">
    @import "pac-select";
</style>