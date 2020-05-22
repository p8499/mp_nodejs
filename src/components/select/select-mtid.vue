<template>
    <pac-table style="max-width: 100%; max-height: 360px;"
               :model="tableModel" :list="list" :contentRange="contentRange"
               :pageSize="pageSize" @input:pageSize="pageSize = $event"
               @input:pageNumber="pageNumber = $event"
               :filterItemsModel="filterItemsModel"
               :sortModel="sortModel" @input:sortModel="sortModel = $event"
               :selection="selection.map(v => bean(v))"
               @input:selection="$emit('input:selection', $event.map(v => v.mtid))"
               @refresh="query()"
               :compare="(e1, e2) => e1.mtid === e2.mtid">
        <template v-slot:mtid="data">
            {{data.element.mtid}}
        </template>
        <template v-slot:mtname="data">
            {{data.element.mtname}}
        </template>
    </pac-table>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {ContentRange} from "@/components/gen/range";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {MaintenanceType} from "@/components/gen/bean/MaintenanceType";
    import {queryMaintenanceType} from "@/components/gen/stub/MaintenanceTypeStub";
    import {MAINTENANCETYPE_SPEC} from "@/components/gen/spec/MaintenanceTypeSpec";

    @Component({name: 'select-mtid'})
    export default class SelectMtid extends Vue {
        @Prop({type: Boolean, required: false, default: false})
        multiSelect!: boolean;
        tableModel = new PacTableModel(this.multiSelect ? 'multiple' : 'single')
            .appendField(new PacTableFieldModel(MAINTENANCETYPE_SPEC.fields.mtid.alias.toLowerCase(), MAINTENANCETYPE_SPEC.fields.mtid.description, 120, true, true))
            .appendField(new PacTableFieldModel(MAINTENANCETYPE_SPEC.fields.mtname.alias.toLowerCase(), MAINTENANCETYPE_SPEC.fields.mtname.description, 120, true, true));
        pageSize = 50;
        pageNumber = 1;
        filterItemsModel = new FilterItemsModel(MAINTENANCETYPE_SPEC);
        sortModel: SortModel | null = null;
        contentRange = new ContentRange();
        list = new Array<MaintenanceType>();

        @Prop({type: Array, required: false, default: () => []})
        selection !: Array<string>;

        created(): void {
            this.query();
        }

        async query(): Promise<void> {
            try {
                const {list, contentRange} = await queryMaintenanceType({
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

        bean(mtid: string): MaintenanceType {
            return new MaintenanceType(mtid);
        }
    }
</script>
<style lang="scss" scoped>

</style>