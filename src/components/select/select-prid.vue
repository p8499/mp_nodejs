<template>
    <pac-table style="max-width: 100%; max-height: 360px;"
               :model="tableModel" :list="list" :contentRange="contentRange"
               :pageSize="pageSize" @input:pageSize="pageSize = $event"
               @input:pageNumber="pageNumber = $event"
               :filterItemsModel="filterItemsModel"
               :sortModel="sortModel" @input:sortModel="sortModel = $event"
               :selection="selection.map(v => bean(v))"
               @input:selection="$emit('input:selection', $event.map(v => v.prid))"
               @refresh="query()"
               :compare="(e1, e2) => e1.prid === e2.prid">
        <template v-slot:prid="data">
            {{data.element.prid}}
        </template>
        <template v-slot:prname="data">
            {{data.element.prname}}
        </template>
    </pac-table>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {ContentRange} from "@/components/gen/range";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {Privilege} from "@/components/gen/bean/Privilege";
    import {queryPrivilege} from "@/components/gen/stub/PrivilegeStub";
    import {PRIVILEGE_SPEC} from "@/components/gen/spec/PrivilegeSpec";

    @Component({name: 'select-prid'})
    export default class SelectPrid extends Vue {
        @Prop({type: Boolean, required: false, default: false})
        multiSelect!: boolean;
        tableModel = new PacTableModel(this.multiSelect ? 'multiple' : 'single')
            .appendField(new PacTableFieldModel(PRIVILEGE_SPEC.fields.prid.alias.toLowerCase(), PRIVILEGE_SPEC.fields.prid.description, 120, true, true))
            .appendField(new PacTableFieldModel(PRIVILEGE_SPEC.fields.prname.alias.toLowerCase(), PRIVILEGE_SPEC.fields.prname.description, 200, true, true));
        pageSize = 50;
        pageNumber = 1;
        filterItemsModel = new FilterItemsModel(PRIVILEGE_SPEC);
        sortModel: SortModel | null = null;
        contentRange = new ContentRange();
        list = new Array<Privilege>();

        @Prop({type: Array, required: false, default: () => []})
        selection !: Array<string>;

        created(): void {
            this.query();
        }

        async query(): Promise<void> {
            try {
                const {list, contentRange} = await queryPrivilege({
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

        bean(prid: string): Privilege {
            return new Privilege(prid);
        }
    }
</script>
<style lang="scss" scoped>

</style>