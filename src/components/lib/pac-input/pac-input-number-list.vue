<template>
    <div class="pac-input-list">
        <div>
            <label :for="id">
                <span :class="{'no-label': label === null}">{{label}}</span>
            </label>
            <input :id="id" v-model.lazy="rawValue" :disabled="disabled"
                   class="right" :class="{'error': message !== null}"/>
            <img style="margin-left: 2px" src="" alt=""
                 :style="{display: !disabled && (select !== null || values.length > 0) ? 'block' : 'none', visibility: pickerShown? 'hidden' : 'visible'}"
                 @click="pickerShown = !pickerShown"/>
            <pac-value-picker :multi-select="true" :values="values"
                              :value="valueModel" @input="pickModel($event)"
                              v-if="pickerShown && (select === null && values.length > 0)"
                              @close="pickerShown = false"/>
            <pac-select-picker :multi-select="true" :select="select"
                               :value="valueSelect" @input="pickSelect($event)"
                               v-if="pickerShown && select !== null" @close="pickerShown = false"/>
        </div>
        <div :style="{'margin-left': label !== null? '120px' : ''}">
            <div v-for="(v, i) in value" :key="i">
                <input class="right" :value="v.toFixed(fraction)" disabled tabindex="-1"/>
                <img style="margin-left: 1px;" src="" alt="" :style="{visibility: !disabled? 'visible' : 'hidden'}"
                     @click="rawValue = [...value.slice(0,i), ...value.slice(i+1)].join(separator)"/>
                <span v-if="values.length > 0" style="margin-left: 6px">{{description(v)}}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Watch} from "vue-property-decorator";
    import PacInputCommon from "@/components/lib/pac-input/pac-input-common";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";
    import PacCommon from "@/components/lib/pac-common";
    import {PacErrorObj} from "@/components/lib/pac-errors/pac-errors-model";

    @Component({name: 'pac-input-number-list'})
    export default class PacInputNumberList extends PacInputCommon {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        label!: string | null;

        @Prop({type: Boolean, required: true})
        disabled!: boolean;

        @Prop({type: Number, required: true})
        min!: number;

        @Prop({type: Number, required: true})
        max!: number;

        @Prop({type: Number, required: true})
        fraction!: number;

        @Prop({type: Number, required: true})
        minSize!: number;

        @Prop({type: Number, required: true})
        maxSize!: number;

        @Prop({type: Array, required: true})
        value!: Array<number>;

        @Watch('value')
        onValueChange(newVal: Array<number>): void {
            //外部更改，不可仅更改某个element,必须整体赋值
            if (newVal !== this.currentValue)
                this.rawValue = this.format(newVal);
        }

        //select或values都可触发选择
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        select!: string | null;

        get valueSelect(): Array<number> {
            return this.value;
        }

        @Prop({type: Array, required: false, default: () => []})
        values!: Array<PacValueModel>;

        get valueModel() {
            return this.value.map(v => new PacValueModel(v.toString()));
        }

        @Prop({type: String, required: false, default: ','})
        separator!: string;

        @Prop({type: Function, required: true})
        validate!: (value: Array<number>) => Promise<string | null>;

        //本地存根，emit前先更新它，以识别是外部更改还是内部更改
        currentValue: Array<number> = this.value;

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

        format(value: Array<number>): string {
            return value.join(this.separator);
        }

        pickerShown = false;

        pickModel(val: Array<PacValueModel>): void {
            this.rawValue = val.map(v => v.value).join(this.separator);
        }

        pickSelect(val: Array<number>): void {
            this.rawValue = val.join(this.separator);
        }

        //check的相关属性
        @Watch('rawValue')
        onRawValueChange(): void {
            this.check();
        }

        @Watch('separator')
        onSeparatorChange(): void {
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

        @Watch('minSize')
        onMinSizeChange(): void {
            this.check();
        }

        @Watch('maxSize')
        onMaxSizeChange(): void {
            this.check();
        }

        @Watch('validate')
        onValidateChange(): void {
            this.check();
        }

        async check(): Promise<void> {
            if (this.rawValue === null)
                return;
            //检测数字格式不正确
            const sections = this.rawValue.split(this.separator).filter(v => v !== '');
            for (const section of sections)
                if (!this.recognizeNumber(section)) {
                    this.emit([], `${this.label !== null ? this.label : ''}数字格式不正确`);
                    return;
                }
            //数字规整化
            const normalized = sections.map(section => this.normalizeNumber(section, this.fraction)).join(this.separator);
            if (normalized !== this.rawValue) {
                this.rawValue = normalized;
                return;
            }
            //检测超出值范围
            const value = sections.map(v => parseFloat(v));
            for (const v of value) {
                if (v < this.min || v > this.max) {
                    this.emit([], `${this.label !== null ? this.label : ''}数值超出区间范围`);
                    return;
                }
            }
            //枚举
            if (this.values.length > 0)
                for (const v of value)
                    if (this.values.findIndex(v2 => v2.value === v.toString()) === -1) {
                        this.emit([], `${this.label !== null ? this.label : ''}不合法的值`);
                        return;
                    }
            //检测个数不正
            if (value.length < this.minSize) {
                this.emit([], `${this.label !== null ? this.label : ''}至少${this.minSize}个值`);
                return;
            } else if (value.length > this.maxSize) {
                this.emit([], `${this.label !== null ? this.label : ''}至多${this.maxSize}个值`);
                return;
            }
            //自定义检查
            const message = await this.validate(value);
            if (message !== null) {
                this.emit([], message);
                return;
            }
            //成功
            this.emit(value, null);
        }

        emit(value: Array<number>, message: string | null): void {
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