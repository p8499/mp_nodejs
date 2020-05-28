<template>
    <div class="pac-textarea">
        <label :for="id">
            <span :class="{'no-label': label === null}">{{label}}</span>
        </label>
        <textarea ref="textarea" :id="id" v-model.lazy="rawValue" :maxLength="length"
                  :disabled="disabled"
                  :class="{'error': message !== null}"
                  @input="resetHeight()"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Watch} from "vue-property-decorator";
    import PacInputCommon from "@/components/lib/pac-input/pac-input-common";
    import PacCommon from "@/components/lib/pac-common";
    import {PacErrorObj} from "@/components/lib/pac-errors/pac-errors-model";

    @Component({name: 'pac-textarea-string'})
    export default class PacTextareaString extends PacInputCommon {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        label!: string | null;

        @Prop({type: Boolean, required: false, default: false})
        required!: boolean;

        @Prop({type: Boolean, required: true})
        disabled!: boolean;

        @Prop({type: Number, required: true})
        length!: number;

        @Prop({validator: (value) => value === 'null' || value === 'blank', required: true})
        nullOrBlank!: string;

        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        value!: string | null;

        @Watch('value')
        onValueChange(newVal: string | null): void {
            //外部更改
            if (newVal !== this.currentValue)
                this.rawValue = this.format(newVal);
        }


        @Prop({type: Function, required: true})
        validate!: (value: string | null) => Promise<string | null>;

        //本地存根，emit前先更新它，以识别是外部更改还是内部更改
        currentValue: string | null = this.value;

        //一旦实例创建后便一定是string
        rawValue: string | null = null;

        created(): void {
            this.rawValue = this.format(this.value);
        }

        id = PacCommon.nextInt().toString();

        message: string | null = null;

        format(value: string | null): string {
            return value !== null ? value : '';
        }

        //check的相关属性
        @Watch('rawValue')
        onRawValueChange(): void {
            this.resetHeight();
            this.check();
        }

        @Watch('required')
        onRequiredChange(): void {
            this.check();
        }

        @Watch('nullOrBlank')
        onNullOrBlankChange(): void {
            this.check();
        }

        @Watch('validate')
        onValidateChange(): void {
            this.check();
        }

        async check(): Promise<void> {
            //必须填入
            if (this.required && this.rawValue === '') {
                this.emit(null, `${this.label !== null ? this.label : ''}必须填入`);
                return;
            }
            const value = this.rawValue === '' && this.nullOrBlank === 'null' ? null : this.rawValue;
            //自定义检查
            const message = await this.validate(value);
            if (message !== null) {
                this.emit(null, message);
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

        destroyed(): void {
            this.$emit('input:error', new PacErrorObj(this.id, null));
        }

        resetHeight() {
            const textarea = this.$refs['textarea'] as HTMLElement;
            const paddingVertical = textarea.offsetHeight - textarea.clientHeight;
            textarea.style.height = `${textarea.scrollHeight - paddingVertical}px`;
        }
    }
</script>
<style lang="scss">
    @import "pac-textarea";
</style>