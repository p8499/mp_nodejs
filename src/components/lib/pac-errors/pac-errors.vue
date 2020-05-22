<template>
    <div class="pac-errors" v-if="value.errors.length > 0">
        <div @click="expanded = !expanded">
            <img src="" alt="" :class="{expanded: expanded}"/>
            <span style="margin-left: 12px;">页面中含 {{value.errors.length}} 条错误提示</span>
        </div>
        <div v-if="expanded">
            <div v-for="(v, i) in value.errors" :key="i">
                <div>
                    <img src="" alt="" @click="v.expanded = !v.expanded"/>
                    <div>
                        <span style="margin-left: 24px;"
                              @click="v.expanded = !v.expanded">{{v.message.subject}}</span>
                    </div>
                    <span v-if="exists(v.id)"
                          @click="$emit('input:focus', v)">Goto Error</span>
                </div>
                <div v-if="v.message.content !== null" :style="{display: v.expanded? 'block' : 'none'}">
                    <span style="margin-left: 33px;">{{v.message.content}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";

    @Component({name: 'pac-errors'})
    export default class PacInputDatetime extends Vue {
        @Prop({type: Object, required: true})
        value!: PacErrorsModel;

        expanded = true;

        exists(id: string) {
            return document.getElementById(id) !== null;
        }
    }
</script>

<style lang="scss">
    @import "pac-errors";
</style>