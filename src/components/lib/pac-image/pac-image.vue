<template>
    <div class="pac-image">
        <div @click="expanded = true">
            <img v-for="(v, i) in size !== undefined? currentSources.slice(0, size) : currentSources"
                 :key="i.toString()" v-show="visibility"
                 :class="{round: shape==='round'}" :style="{'margin-left': i === 0? '0' : '4px'}"
                 :src="v" alt="" @click="expandedIndex = i"
                 @load="visibility = true"
                 @error="visibility = false"/>
            <span v-if="size !== undefined && size < currentSources.length" style="margin-left: 4px">等 {{currentSources.length}} 张</span>
        </div>
        <div v-if="expanded">
            <div ref="panel">
                <div>
                    <div @mousedown="startMove($event)" @mouseup="stopMove()">
                        <span>图片浏览</span>
                    </div>
                    <div>
                        <img src="" alt="" @click="expanded = false">
                    </div>
                </div>
                <div>
                    <img :class="{'has-previous': expandedIndex > 0}"
                         src="" alt="" @click="expandedIndex -= expandedIndex > 0? 1 : 0">
                    <img :class="{'has-next': expandedIndex < currentSources.length - 1}"
                         src="" alt="" @click="expandedIndex += expandedIndex < currentSources.length - 1? 1 : 0">
                </div>
                <div>
                    <img :src="currentSources[expandedIndex]" alt=""/>
                    <span style="margin-top: 4px;">{{expandedIndex + 1}} / {{currentSources.length}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component({name: 'pac-image'})
    export default class PacImage extends Vue {
        @Prop({type: Number, required: false})
        size?: number;

        @Prop({type: Function, required: true})
        sources!: () => Promise<Array<string>>;

        @Watch('sources')
        async onValuesChange(newVal: () => Promise<Array<string>>): Promise<void> {
            this.currentSources = await newVal();
        }

        currentSources: Array<string> = [];

        @Prop({
            validator: (value) => value === 'square' || value === 'round' || value === undefined,
            required: false,
            default: 'square'
        })
        shape!: 'square' | 'round';

        visibility = false;

        expanded = false;
        expandedIndex = 0;

        async created(): Promise<void> {
            this.currentSources = await this.sources();
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

<style lang="scss" scoped>
    @import "pac-image";
</style>