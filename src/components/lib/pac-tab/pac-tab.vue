<template>
    <div class="pac-tab">
        <div>
            <div ref="heads" @scroll="calcOffset()">
                <div :class="[i === selectedTab? 'pac-tab-selected' : '', disabledTabs.includes(i)? 'pac-tab-disabled' : '']"
                     v-for="(tab, i) in tabs" :key="`head-${i.toString()}`"
                     @click="select(i)">
                    <span>{{tab}}</span>
                </div>
            </div>
            <div>
                <img src="" alt="" :style="{visibility: offsetLeft > 0? 'visible' : 'hidden'}"
                     @click="scroll(-offsetLeft)"/>
                <img src="" alt="" :style="{visibility: offsetRight > 0? 'visible' : 'hidden'}"
                     @click="scroll(offsetRight)"/>
            </div>
        </div>
        <div>
            <div v-for="(tab, i) in tabs" :key="`content-${i.toString()}`"
                 :style="{display: i === selectedTab? 'flex' : 'none'}">
                <slot :name="i.toString()"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({name: 'pac-tab'})
    export default class PacTab extends Vue {
        @Prop({type: Array, required: true})
        tabs!: Array<string>;

        @Prop({type: Number, required: true})
        selectedTab!: number;

        @Prop({type: Array, required: false, default: () => new Array<number>()})
        disabledTabs!: Array<number>;

        select(tab: number) {
            this.calcOffsetLeft();
            this.calcOffsetRight();
            if (tab !== this.selectedTab && !this.disabledTabs.includes(tab))
                this.$emit('input:selectedTab', tab);
        }

        offsetLeft = 0;

        calcOffsetLeft(): void {
            const heads = this.$refs['heads'] as HTMLElement;
            const children = heads.children;
            //当前scroll距离
            const scroll = heads.scrollLeft;
            //完全/部分隐藏的head的总长
            let widthOfHidden = 0;
            //完全/部分隐藏的head的index
            let indexOfHeadden = -1;
            for (let i = 0; i < children.length && scroll - widthOfHidden > 0; i++) {
                widthOfHidden += (children[i] as HTMLElement).offsetWidth;
                indexOfHeadden = i;
            }
            if (indexOfHeadden > -1)
                this.offsetLeft = (children[indexOfHeadden] as HTMLElement).offsetWidth - (widthOfHidden - scroll);
            else
                this.offsetLeft = 0;
        }

        offsetRight = 0;

        calcOffsetRight(): void {
            const heads = this.$refs['heads'] as HTMLElement;
            const children = heads.children;
            //当前scroll距离
            const scroll = heads.scrollWidth - heads.clientWidth - heads.scrollLeft;
            //完全/部分隐藏的head的总长
            let widthOfHidden = 0;
            //完全/部分隐藏的head的index
            let indexOfHeadden = children.length;
            for (let i = children.length - 1; i > -1 && scroll - widthOfHidden > 0; i--) {
                widthOfHidden += (children[i] as HTMLElement).offsetWidth;
                indexOfHeadden = i;
            }
            if (indexOfHeadden < children.length)
                this.offsetRight = (children[indexOfHeadden] as HTMLElement).offsetWidth - (widthOfHidden - scroll);
            else
                this.offsetRight = 0;
        }

        calcOffset(): void {
            this.calcOffsetLeft();
            this.calcOffsetRight();
        }

        scroll(x: number): void {
            const heads = this.$refs['heads'] as HTMLElement;
            heads.scrollBy(x, 0);
        }

        created() {
            window.addEventListener('resize', this.calcOffset);
            //把selectedTab重置到首个不禁用tab
            if (this.disabledTabs.includes(this.selectedTab))
                this.$emit('input:selectedTab', this.tabs.findIndex((v, i) => !this.disabledTabs.includes(i)));
        }

        mounted() {
            this.calcOffset();
        }

        destroyed() {
            window.removeEventListener('resize', this.calcOffset);
        }
    }
</script>

<style lang="scss">
    @import "pac-tab";
</style>