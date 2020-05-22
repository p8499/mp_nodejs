<template>
    <div class="pac-input">
        <label :for="id">
            <span :class="{'no-label': label === null}">{{label}}</span>
        </label>
        <input :id="id" v-model.lazy="rawValue" :disabled="disabled"
               class="right" :class="{'error': message !== null}"/>
        <img style="margin-left: 2px" src="" alt="" class="datetime"
             :style="{display: !disabled ? 'block' : 'none', visibility: pickerShown? 'hidden' : 'visible'}"
             @click="pickerShown = !pickerShown"/>
        <pac-datetime-picker precision="datetime" :value="value === null? new Date() : value" @input="pick($event)"
                             v-if="pickerShown && select === null" @close="pickerShown = false"/>
        <pac-select-picker :multi-select="false" :select="select"
                           :value="valueSelect" @input="pick($event[0])"
                           v-if="pickerShown && select !== null" @close="pickerShown = false"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Watch} from "vue-property-decorator";
    import PacInputCommon from "@/components/lib/pac-input/pac-input-common";
    import PacCommon from "@/components/lib/pac-common";
    import {PacErrorObj} from "@/components/lib/pac-errors/pac-errors-model";

    @Component({name: 'pac-input-datetime'})
    export default class PacInputDatetime extends PacInputCommon {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        label!: string | null;

        @Prop({type: Boolean, required: false, default: false})
        required!: boolean;

        @Prop({type: Boolean, required: true})
        disabled!: boolean;

        @Prop({type: Date, required: true})
        min!: Date;

        @Prop({type: Date, required: true})
        max!: Date;

        @Prop({validator: (value) => value instanceof Date || value === null, required: false, default: null})
        value!: Date | null;

        @Watch('value')
        onValueChange(newVal: Date | null): void {
            //外部更改
            if (newVal !== this.currentValue)
                this.rawValue = this.format(newVal);
        }

        //select可触发另一种选择
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        select!: string | null;

        get valueSelect(): Array<Date> {
            return this.value !== null ? [this.value] : [];
        }

        @Prop({type: Function, required: true})
        validate!: (value: Date | null) => Promise<string | null>;

        //本地存根，emit前先更新它，以识别是外部更改还是内部更改
        currentValue: Date | null = this.value;

        //一旦实例创建后便一定是string
        rawValue: string | null = null;

        created(): void {
            this.rawValue = this.format(this.value);
        }

        id = PacCommon.nextInt().toString();

        message: string | null = null;

        format(value: Date | null): string {
            return value !== null ? this.datetimeToString(value) : '';
        }

        pickerShown = false;

        pick(date: Date) {
            this.rawValue = this.datetimeToString(date);
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

        @Watch('min')
        onMinChange(): void {
            this.check();
        }

        @Watch('max')
        onMaxChange(): void {
            this.check();
        }

        @Watch('rawValue')
        async check(): Promise<void> {
            if (this.rawValue === null)
                return;
            //必须填入
            if (this.required && this.rawValue === '') {
                this.emit(null, `${this.label !== null ? this.label : ''}必须填入`);
                return;
            }
            //检测日期时间格式不正确
            if (this.rawValue !== '' && !this.recognizeDatetime(this.rawValue)) {
                this.emit(null, `${this.label !== null ? this.label : ''}日期格式不正确`);
                return
            }
            //日期时间规整化
            const normalized = this.rawValue !== '' ? this.normalizeDatetime(this.rawValue) : null;
            if (normalized !== this.rawValue) {
                this.rawValue = normalized;
                return;
            }
            //检测日期意义不正确
            if (this.rawValue !== '' && !this.validateDatetime(this.rawValue)) {
                this.emit(null, `${this.label !== null ? this.label : ''}日期格式不正确`);
                return
            }
            //检测超出值范围
            const date = this.rawValue !== '' ? this.stringToDatetime(this.rawValue) : null;
            if (date !== null && (date.getTime() < this.min.getTime() || date.getTime() > this.max.getTime())) {
                this.emit(null, `${this.label !== null ? this.label : ''}数值超出区间范围`);
                return
            }
            //自定义检查
            const message = await this.validate(date);
            if (message !== null) {
                this.emit(null, message);
                return;
            }
            //成功
            this.emit(date, null);
        }

        emit(value: Date | null, message: string | null): void {
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