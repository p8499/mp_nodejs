<template>
    <div class="pac-value-picker">
        <div ref="panel">
            <div>
                <div @mousedown="startMove($event)" @mouseup="stopMove()">
                    <span>代码选择</span>
                </div>
                <div>
                    <img src="" alt="" @click="$emit('close')">
                </div>
            </div>
            <div>
                <img src="" alt="" @click="submit()"
                     :style="{visibility: currentValue.length > 0? 'visible' : 'hidden'}"/>
            </div>
            <div>
                <pac-table :model="model" :list="values"
                           :selection="currentValue" @input:selection="currentValue = $event"
                           :compare="(e1, e2) => e1.value === e2.value" :paging="false">
                    <template v-slot:value="data">{{data.element.value}}</template>
                    <template v-slot:label="data">{{data.element.label}}</template>
                </pac-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";

    @Component({name: 'pac-value-picker'})
    export default class PacValuePicker extends Vue {
        @Prop({type: Boolean, required: false, default: false})
        multiSelect!: boolean;

        @Prop({type: Array, required: false, default: () => []})
        values!: Array<PacValueModel>;

        @Prop({type: Array, required: false, default: () => []})
        value!: Array<PacValueModel>;

        model = new PacTableModel(this.multiSelect ? 'multiple' : 'single')
            .appendField(new PacTableFieldModel('value', '值', 80, false, false))
            .appendField(new PacTableFieldModel('label', '描述', 160, false, false));

        currentValue = this.value;

        submit(): void {
            this.$emit('input', this.currentValue);
            this.$emit('close');
        }

        startOffsetLeft: number | undefined;
        startOffsetTop: number | undefined;
        startClientX: number | undefined;
        startClientY: number | undefined;

        startMove(e: MouseEvent): void {
            const panel = this.$refs['panel'] as HTMLElement;
            this.startOffsetLeft = panel.offsetLeft;
            this.startOffsetTop = panel.offsetTop;
            this.startClientX = e.clientX;
            this.startClientY = e.clientY;
            window.addEventListener('mousemove', this.move);
        }

        move(e: MouseEvent): void {
            if (this.startOffsetLeft !== undefined && this.startOffsetTop !== undefined && this.startClientX !== undefined && this.startClientY !== undefined) {
                const panel = this.$refs['panel'] as HTMLElement;
                panel.style.left = `${this.startOffsetLeft + e.clientX - this.startClientX}px`;
                panel.style.top = `${this.startOffsetTop + e.clientY - this.startClientY}px`;
            }
        }

        stopMove(): void {
            this.startOffsetLeft = undefined;
            this.startOffsetTop = undefined;
            this.startClientX = undefined;
            this.startClientY = undefined;
            window.removeEventListener('mousemove', this.move);
        }
    }
</script>

<style lang="scss">
    @import "pac-input";
</style>