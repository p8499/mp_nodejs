<template>
    <pac-table style="max-width: 100%; max-height: 360px;"
               :model="tableModel" :list="list" :contentRange="contentRange"
               :pageSize="pageSize" @input:pageSize="pageSize = $event"
               @input:pageNumber="pageNumber = $event"
               :filterItemsModel="filterItemsModel"
               :sortModel="sortModel" @input:sortModel="sortModel = $event"
               :selection="selection.map(v => bean(v))"
               @input:selection="$emit('input:selection', $event.map(v => v.roid))"
               @refresh="query()"
               :compare="(e1, e2) => e1.roid === e2.roid">
        <template v-slot:roid="data">
            <div class="cell-right">{{data.element.roid}}</div>
        </template>
        <template v-slot:roname="data">
            {{data.element.roname}}
        </template>
    </pac-table>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {ContentRange} from "@/components/gen/range";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {Role} from "@/components/gen/bean/Role";
    import {queryRole} from "@/components/gen/stub/RoleStub";
    import {ROLE_SPEC} from "@/components/gen/spec/RoleSpec";

    @Component({name: 'select-roid'})
    export default class SelectRoid extends Vue {
        @Prop({type: Boolean, required: false, default: false})
        multiSelect!: boolean;
        tableModel = new PacTableModel(this.multiSelect ? 'multiple' : 'single')
            .appendField(new PacTableFieldModel(ROLE_SPEC.fields.roid.alias.toLowerCase(), ROLE_SPEC.fields.roid.description, 120, true, true))
            .appendField(new PacTableFieldModel(ROLE_SPEC.fields.roname.alias.toLowerCase(), ROLE_SPEC.fields.roname.description, 200, true, true));
        pageSize = 50;
        pageNumber = 1;
        filterItemsModel = new FilterItemsModel(ROLE_SPEC);
        sortModel: SortModel | null = null;
        contentRange = new ContentRange();
        list = new Array<Role>();

        @Prop({type: Array, required: false, default: () => []})
        selection !: Array<string>;

        created(): void {
            this.query();
        }

        async query(): Promise<void> {
            try {
                const {list, contentRange} = await queryRole({
                    filter: this.filterItemsModel.expr,
                    orderBy: this.sortModel?.expr?.only(),
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                });
                this.list = list;
                this.contentRange = contentRange;
            } catch (e) {
                console.error(e);
            }
        }

        bean(roid: string): Role {
            return new Role(roid);
        }
    }
</script>
<style lang="scss" scoped>
    .cell-right {
        width: 100%;
        height: fit-content;
        vertical-align: center;
        text-align: right;
    }
</style>