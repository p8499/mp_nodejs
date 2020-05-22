<template>
    <pac-table style="max-width: 100%; max-height: 360px;"
               :model="tableModel" :list="list" :contentRange="contentRange"
               :pageSize="pageSize" @input:pageSize="pageSize = $event"
               @input:pageNumber="pageNumber = $event"
               :filterItemsModel="filterItemsModel"
               :sortModel="sortModel" @input:sortModel="sortModel = $event"
               :selection="selection.map(v => bean(v))"
               @input:selection="$emit('input:selection', $event.map(v => v.cwid))"
               @refresh="query()"
               :compare="(e1, e2) => e1.cwid === e2.cwid">
        <template v-slot:cwwcmcu="data">
            {{data.element.cwwcmcu}}
        </template>
        <template v-slot:cwwcdl01="data">
            {{data.element.cwwcdl01}}
        </template>
        <template v-slot:cwname="data">
            {{data.element.cwname}}
        </template>
    </pac-table>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {ContentRange} from "@/components/gen/range";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {Crew} from "@/components/gen/bean/Crew";
    import {queryCrew} from "@/components/gen/stub/CrewStub";
    import {CREW_SPEC} from "@/components/gen/spec/CrewSpec";

    @Component({name: 'select-cwid'})
    export default class SelectCwid extends Vue {
        @Prop({type: Boolean, required: false, default: false})
        multiSelect!: boolean;
        tableModel = new PacTableModel(this.multiSelect ? 'multiple' : 'single')
            .appendField(new PacTableFieldModel(CREW_SPEC.fields.cwwcmcu.alias.toLowerCase(), CREW_SPEC.fields.cwwcmcu.description, 100, true, true))
            .appendField(new PacTableFieldModel(CREW_SPEC.fields.cwwcdl01.alias.toLowerCase(), CREW_SPEC.fields.cwwcdl01.description, 100, true, true))
            .appendField(new PacTableFieldModel(CREW_SPEC.fields.cwname.alias.toLowerCase(), CREW_SPEC.fields.cwname.description, 100, true, true));
        pageSize = 50;
        pageNumber = 1;
        filterItemsModel = new FilterItemsModel(CREW_SPEC);
        sortModel: SortModel | null = null;
        contentRange = new ContentRange();
        list = new Array<Crew>();

        @Prop({type: Array, required: false, default: () => []})
        selection !: Array<number>;

        created(): void {
            this.query();
        }

        async query(): Promise<void> {
            try {
                const {list, contentRange} = await queryCrew({
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

        bean(cwid: number): Crew {
            return new Crew(cwid);
        }
    }
</script>
<style lang="scss" scoped>

</style>