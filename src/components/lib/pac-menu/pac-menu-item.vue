<template>
    <li v-if="privilege" :disabled="false" @click="goto($event)">
        <span>{{me.title}}</span>
        <img src="" alt="" v-if="me.items.length > 0"/>
        <pac-menu-item-group :shown="me.expanded" :path="path" :items="me.items"
                             @toggle="$emit('toggle', $event)" @input="$emit('input', $event)"/>
    </li>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacMenuItemModel} from "@/components/lib/pac-menu/pac-menu-model";

    @Component({name: 'pac-menu-item'})
    export default class PacMenuItem extends Vue {
        @Prop({type: Array, required: true})
        path!: Array<PacMenuItemModel>;

        privilege = false;

        get me(): PacMenuItemModel {
            return this.path[this.path.length - 1];
        }

        goto(e: MouseEvent) {
            if (this.me.items.length > 0)
                this.$emit('toggle', this.path);
            else
                this.$emit('input', this.me.target);
            e.stopPropagation();
        }

        async created() {
            this.privilege = await this.me.privilege();
        }
    }
</script>

<style lang="scss">
</style>