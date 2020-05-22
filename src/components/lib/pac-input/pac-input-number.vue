<template>
    <div class="pac-input">
        <label :for="id">
            <span :class="{'no-label': label === null}">{{label}}</span>
        </label>
        <input :id="id" v-model.lazy="rawValue" :disabled="disabled"
               class="right" :class="{'error': message !== null}"/>
        <img style="margin-left: 2px" src="" alt=""
             :style="{display: !disabled && (select !== null || values.length > 0)? 'block' : 'none', visibility: pickerShown? 'hidden' : 'visible'}"
             @click="pickerShown = !pickerShown"/>
        <span v-if="values.length > 0 && value !== null" style="margin-left: 6px">{{description(value)}}</span>
        <pac-value-picker :multi-select="false" :values="values"
                          :value="valueModel" @input="pickModel($event[0])"
                          v-if="pickerShown && (select === null && values.length > 0)" @close="pickerShown = false"/>
        <pac-select-picker :multi-select="false" :select="select"
                           :value="valueSelect" @input="pickSelect($event[0])"
                           v-if="pickerShown && select !== null" @close="pickerShown = false"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Watch} from "vue-property-decorator";
    import PacInputCommon from "@/components/lib/pac-input/pac-input-common";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";
    import PacCommon from "@/components/lib/pac-common";
    import {PacErrorObj} from "@/components/lib/pac-errors/pac-errors-model";

    @Component({name: 'pac-input-number'})
    export default class PacInputNumber extends PacInputCommon {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        label!: string | null;

        @Prop({type: Boolean, required: false, default: false})
        required!: boolean;

        @Prop({type: Boolean, required: true})
        disabled!: boolean;

        @Prop({type: Number, required: true})
        min!: number;

        @Prop({type: Number, required: true})
        max!: number;

        @Prop({type: Number, required: true})
        fraction!: number;

        @Prop({validator: (value) => typeof (value) === 'number' || value === null, required: false, default: null})
        value!: number | null;

        @Watch('value')
        onValueChange(newVal: number | null): void {
            //外部更改
            if (newVal !== this.currentValue)
                this.rawValue = this.format(newVal);
        }

        //select或values都可触发选择
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        select!: string | null;

        get valueSelect(): Array<number> {
            return this.value !== null ? [this.value] : [];
        }

        @Prop({type: Array, required: false, default: () => []})
        values!: Array<PacValueModel>;

        get valueModel(): Array<PacValueModel> {
            return this.value !== null ? [new PacValueModel(this.value.toString())] : [];
        }

        @Prop({type: Function, required: true})
        validate!: (value: number | null) => Promise<string | null>;

        //本地存根，emit前先更新它，以识别是外部更改还是内部更改
        currentValue: number | null = this.value;

        //一旦实例创建后便一定是string
        rawValue: string | null = null;

        created(): void {
            this.rawValue = this.format(this.value);
        }

        description(v: number): string | null {
            const valueModel = this.values.find(v2 => v2.value === v.toString());
            return valueModel === undefined ? null : valueModel.label;
        }

        id = PacCommon.nextInt().toString();

        message: string | null = null;

        format(value: number | null): string {
            return value !== null ? value.toString() : '';
        }

        pickerShown = false;

        pickModel(val: PacValueModel): void {
            this.rawValue = val.value;
        }

        pickSelect(val: number): void {
            this.rawValue = val.toString();
        }

        //check的相关属性
        @Watch('rawValue')
        onRawValueChange(): void {
            this.check();
        }

        @Watch('required')
        onRequiredChange(): void {
            this.check();
        }

        @Watch('fraction')
        onFractionChange(): void {
            this.check();
        }

        @Watch('min')
        onMinChange(): void {
            this.check();
        }

        @Watch('max')
        onMaxChange(): void {
            this.check();
        }

        @Watch('values')
        onValuesChange(): void {
            this.check();
        }

        @Watch('validate')
        onValidateChange(): void {
            this.check();
        }

        async check(): Promise<void> {
            if (this.rawValue === null)
                return;
            //必须填入
            if (this.required && this.rawValue === '') {
                this.emit(null, `${this.label !== null ? this.label : ''}必须填入`);
                return;
            }
            //检测数字格式不正确
            if (this.rawValue !== '' && !this.recognizeNumber(this.rawValue)) {
                this.emit(null, `${this.label !== null ? this.label : ''}数字格式不正确`);
                return;
            }
            //数字规整化
            const normalized = this.rawValue !== '' ? this.normalizeNumber(this.rawValue, this.fraction) : '';
            if (normalized !== this.rawValue) {
                this.rawValue = normalized;
                return;
            }
            //检测超出值范围
            const value = this.rawValue !== '' ? parseFloat(this.rawValue) : null;
            if (value !== null && (value < this.min || value > this.max)) {
                this.emit(value, `${this.label !== null ? this.label : ''}数值超出区间范围`);
                return;
            }
            //枚举
            if (value !== null && (this.values.length > 0 && this.values.findIndex(v => v.value === value.toString()) === -1)) {
                this.emit(null, `${this.label !== null ? this.label : ''}不合法的值`);
                return;
            }
            //自定义检查
            const message = await this.validate(value);
            if (message !== null) {
                this.emit(null, message);
                return;
            }
            //成功
            this.emit(value, null);
        }

        emit(value: number | null, message: string | null): void {
            if (this.currentValue !== value) {
                this.currentValue = value;
                this.$emit('input', value);
            }
            if (this.message !== message) {
                this.message = message;
                this.$emit('input:error', new PacErrorObj(this.id, message));
            }
        }

        destroyed(): void {
            this.$emit('input:error', new PacErrorObj(this.id, null));
        }
    }
</script>

<style lang="scss">
    @import "pac-input";
</style>