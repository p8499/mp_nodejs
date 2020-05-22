<template>
    <ul :style="{display: shown ? 'block' : 'none'}">
        <pac-menu-item v-for='(item) in items' :key='item.id'
                       :path="[...path, item]" @toggle="$emit('toggle', $event)" @input="$emit('input', $event)"/>
    </ul>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacMenuItemModel} from "@/components/lib/pac-menu/pac-menu-model";

    @Component({name: 'pac-menu-item-group'})
    export default class PacMenuItemGroup extends Vue {
        @Prop({type: Boolean, required: false, default: false})
        shown!: boolean;

        @Prop({type: Array, required: true})
        path!: Array<PacMenuItemModel>;

        @Prop({type: Array, required: true})
        items!: Array<PacMenuItemModel>;

        get parent(): PacMenuItemModel {
            return this.path[this.path.length];
        }
    }
</script>

<style lang="scss">
</style>