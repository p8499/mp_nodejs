<template>
    <div class="pac-value-picker">
        <div ref="panel">
            <div>
                <div @mousedown="startMove($event)" @mouseup="stopMove()">
                    <span>引用选择</span>
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
                <component :is="select" :multiSelect="multiSelect"
                           :selection="currentValue" @input:selection="currentValue = $event"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({name: 'pac-select-picker'})
    export default class PacSelectPicker<T> extends Vue {
        @Prop({type: String, required: true})
        select!: string;

        @Prop({type: Boolean, required: false, default: false})
        multiSelect!: boolean;

        @Prop({type: Array, required: false, default: () => []})
        value!: Array<T>;

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