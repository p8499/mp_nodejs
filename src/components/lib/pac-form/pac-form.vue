<template>
    <div class="pac-form">
        <div>
            <div>
                <span style="margin-left: 16px;">{{name}}</span>
            </div>
            <div>
                <div v-show="progressModel.items.length > 0" style="margin-right: 6px;"/>
                <img src="" alt="" style="margin-right: 6px;" @click="showUrl()"/>
                <img src="" alt="" style="margin-right: 6px;" v-if="hasPrevious"
                     @click="$router.back()"/>
            </div>
        </div>
        <div v-if="loading" class="loading">
            <img src="" alt=""/>
            <span>Loading</span>
        </div>
        <div v-else>
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {HTML_BASE_URL} from "@/components/gen/common";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";

    @Component({name: 'pac-form'})
    export default class PacForm extends Vue {
        @Prop({type: String, required: true})
        name!: string;

        @Prop({type: String, required: true})
        url!: string;

        @Prop({type: Boolean, required: true})
        loading!: boolean;

        @Prop({type: Object, required: true})
        progressModel!: PacProgressModel;

        baseUrl = HTML_BASE_URL;

        get hasPrevious(): boolean {
            return window.history.length > 0;
        }

        showUrl(): void {
            window.alert(this.baseUrl + this.url);
        }
    }
</script>

<style lang="scss">
    @import "pac-form";
</style>