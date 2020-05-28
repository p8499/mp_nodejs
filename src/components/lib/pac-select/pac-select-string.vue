<template>
    <div class="pac-select">
        <label :for="id">
            <span :class="{'no-label': label === null}">{{label}}</span>
        </label>
        <select :id="id" v-model="rawValue"
                :disabled="disabled" class="right" :class="{'error': message !== null}">
            <option v-if="!required" :value="uuid"/>
            <option v-for="v in currentValues" :key="v.value" :value="v.value">
                {{v.label}}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import {Prop, Vue, Watch} from "vue-property-decorator";
    import PacCommon from "@/components/lib/pac-common";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";
    import {PacErrorObj} from "@/components/lib/pac-errors/pac-errors-model";
    import {uuid} from "uuidv4";

    @Component({name: 'pac-select-string'})
    export default class PacSelectString extends Vue {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        label!: string | null;

        @Prop({type: Boolean, required: false, default: false})
        required!: boolean;

        @Prop({type: Boolean, required: true})
        disabled!: boolean;

        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        value!: string | null;

        @Watch('value')
        onValueChange(newVal: string | null): void {
            //外部更改
            if (newVal !== this.currentValue)
                this.rawValue = this.format(newVal);
        }

        @Prop({type: Function, required: false, default: async () => []})
        values!: () => Promise<Array<PacValueModel>>;

        @Watch('values')
        async onValuesChange(newVal: () => Promise<Array<PacValueModel>>): Promise<void> {
            this.currentValues = await newVal();
        }

        //本地存根，emit前先更新它，以识别是外部更改还是内部更改
        currentValue: string | null = this.value;

        //一旦实例创建后便一定是string
        rawValue: string | null = null;

        currentValues: Array<PacValueModel> = [];

        async created(): Promise<void> {
            this.currentValues = await this.values();
            this.rawValue = this.format(this.value);
        }

        id = PacCommon.nextInt().toString();

        message: string | null = null;

        uuid = uuid();

        format(value: string | null): string {
            return value === null ? this.uuid : value;
        }


        @Watch('rawValue')
        onRawValueChange(): void {
            this.check();
        }

        @Watch('required')
        onRequiredChange(): void {
            this.check();
        }

        @Watch('currentValues')
        onCurrentValuesChange(): void {
            this.check();
        }

        async check(): Promise<void> {
            if (this.rawValue === null)
                return;
            const value = this.currentValues.map(v => v.value).includes(this.rawValue) ? this.rawValue : null;
            //必须填入
            if (this.required && value === null) {
                this.emit(null, `${this.label !== null ? this.label : ''}必须选择`);
                return;
            }
            //成功
            this.emit(value, null);
        }

        emit(value: string | null, message: string | null): void {
            if (this.currentValue !== value) {
                this.currentValue = value;
                this.$emit('input', value);
            }
            if (this.message !== message) {
                this.message = message;
                this.$emit('input:error', new PacErrorObj(this.id, message));
            }
        }
    }
</script>

<style lang="scss">
    @import "pac-select";
</style>