<template>
    <div class="pac-menu">
        <pac-menu-item-group :shown="shown" :path="[]" :items="value"
                             @toggle="toggle($event)" @input="$emit('input', $event)"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacMenuItemModel} from "@/components/lib/pac-menu/pac-menu-model";

    @Component({name: 'pac-menu'})
    export default class PacMenu extends Vue {
        @Prop({type: Boolean, required: false, default: false})
        shown!: boolean;

        @Prop({type: Array, required: true})
        value!: Array<PacMenuItemModel>;

        expandedPath: Array<PacMenuItemModel> = [];

        toggle(path: Array<PacMenuItemModel>) {
            if (this.expandedPath.indexOf(path[path.length - 1]) > -1)
                path = path.slice(0, path.length - 1);
            this.expandedPath.forEach(value => value.expanded = path.indexOf(value) > 1);
            path.forEach(value => value.expanded = true);
            this.expandedPath = path;
        }
    }
</script>

<style lang="scss">
    @import "pac-menu";
</style>