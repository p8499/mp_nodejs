<template>
    <pac-table style="max-width: 100%; max-height: 360px;"
               :model="tableModel" :list="list" :contentRange="contentRange"
               :pageSize="pageSize" @input:pageSize="pageSize = $event"
               @input:pageNumber="pageNumber = $event"
               :filterItemsModel="filterItemsModel"
               :sortModel="sortModel" @input:sortModel="sortModel = $event"
               :selection="selection.map(v => bean(v))"
               @input:selection="$emit('input:selection', $event.map(v => v.itid))"
               @refresh="query()"
               :compare="(e1, e2) => e1.itid === e2.itid">
        <template v-slot:itid="data">
            {{data.element.itid}}
        </template>
        <template v-slot:itname="data">
            {{data.element.itname}}
        </template>
    </pac-table>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {ContentRange} from "@/components/gen/range";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {InspectionType} from "@/components/gen/bean/InspectionType";
    import {queryInspectionType} from "@/components/gen/stub/InspectionTypeStub";
    import {INSPECTIONTYPE_SPEC} from "@/components/gen/spec/InspectionTypeSpec";

    @Component({name: 'select-itid'})
    export default class SelectItid extends Vue {
        @Prop({type: Boolean, required: false, default: false})
        multiSelect!: boolean;
        tableModel = new PacTableModel(this.multiSelect ? 'multiple' : 'single')
            .appendField(new PacTableFieldModel(INSPECTIONTYPE_SPEC.fields.itid.alias.toLowerCase(), INSPECTIONTYPE_SPEC.fields.itid.description, 120, true, true))
            .appendField(new PacTableFieldModel(INSPECTIONTYPE_SPEC.fields.itname.alias.toLowerCase(), INSPECTIONTYPE_SPEC.fields.itname.description, 120, true, true));
        pageSize = 50;
        pageNumber = 1;
        filterItemsModel = new FilterItemsModel(INSPECTIONTYPE_SPEC);
        sortModel: SortModel | null = null;
        contentRange = new ContentRange();
        list = new Array<InspectionType>();

        @Prop({type: Array, required: false, default: () => []})
        selection !: Array<string>;

        created(): void {
            this.query();
        }

        async query(): Promise<void> {
            try {
                const {list, contentRange} = await queryInspectionType({
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

        bean(itid: string): InspectionType {
            return new InspectionType(itid);
        }
    }
</script>
<style lang="scss" scoped>

</style>