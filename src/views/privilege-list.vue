<template>
    <pac-form name="权限列表" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <div>
            <pac-button text="新增" @input="add()"/>
            <pac-button style="margin-left: 8px;"
                        text="删除" @input="del()" v-if="selection.length > 0"/>
        </div>
        <pac-table style="margin-top: 14px; max-width: 100%; max-height: 480px;"
                   :model="tableModel" :list="list" :contentRange="contentRange"
                   :pageSize="pageSize" @input:pageSize="pageSize = $event"
                   @input:pageNumber="pageNumber = $event"
                   :filterItemsModel="filterItemsModel"
                   :sortModel="sortModel" @input:sortModel="sortModel = $event"
                   :selection="selection" @input:selection="selection = $event"
                   @refresh="query()">
            <template v-slot:prid="data">
                <router-link :to="{path: `/privilege-update/${data.element.prid}`}">
                    {{data.element.prid}}
                </router-link>
            </template>
            <template v-slot:prname="data">{{data.element.prname}}</template>
        </pac-table>
    </pac-form>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import Common from "@/common";
    import {PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {ContentRange} from "@/components/gen/range";
    import {PRIVILEGE_SPEC} from "@/components/gen/spec/PrivilegeSpec";
    import {Privilege} from "@/components/gen/bean/Privilege";
    import {batchDeletePrivilege, queryPrivilege} from "@/components/gen/stub/PrivilegeStub";
    import {parameters} from "@/components/gen/common";
    import {filterItemsModelToString, numberToString, sortModelToString, subtract} from "@/components/lib/pac-common";

    @Component({name: 'privilege-list'})
    export default class PrivilegeList extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = PRIVILEGE_SPEC;
        tableModel = new PacTableModel('multiple').appendField(
            new PacTableFieldModel(this.spec.fields.prid.alias.toLowerCase(), this.spec.fields.prid.description, 120, true, true),
            new PacTableFieldModel(this.spec.fields.prname.alias.toLowerCase(), this.spec.fields.prname.description, 200, true, true));

        @Prop({type: Number, required: false, default: 50})
        initPageSize!: number;
        pageSize = this.initPageSize;

        @Prop({type: Number, required: false, default: 1})
        initPageNumber!: number;
        pageNumber = this.initPageNumber;

        @Prop({type: Object, required: false, default: () => new FilterItemsModel(PRIVILEGE_SPEC)})
        initFilterItemsModel!: FilterItemsModel;
        filterItemsModel = this.initFilterItemsModel;

        @Prop({type: Object, required: false, default: null})
        initSortModel!: SortModel | null;
        sortModel = this.initSortModel;

        list = new Array<Privilege>();
        selection = new Array<Privilege>();
        contentRange = new ContentRange();

        async created(): Promise<void> {
            await this.query();
            this.loading = false;
        }

        async query(): Promise<void> {
            const progress = this.progressModel.start();
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
                this.errorsModel.set(new PacErrorObj('query', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async del(): Promise<void> {
            if (window.confirm(`是否删除${this.selection.length}条记录？`)) {
                const progress = this.progressModel.start();
                const list = await batchDeletePrivilege(this.selection.flatMap(v => v.prid !== null ? [v.prid] : []).map(v => Object({prid: v})));
                this.progressModel.stop(progress);
                const success = list.filter(v => v.statusCode < 400);
                const failure = list.filter(v => v.statusCode >= 400);
                if (success.length == 0 && failure.length == 1)
                    this.errorsModel.set(new PacErrorObj('del', {
                        subject: '远程服务器错误',
                        content: `远程服务器状态：${failure[0].statusCode}`
                    }));
                else if (failure.length > 0)
                    this.errorsModel.set(new PacErrorObj('del', `删除结果：${success.length}条成功，${failure.length}条失败`));
                if (success.length > 0) {
                    this.selection = subtract(this.selection, success.map(v => new Privilege(v.key.prid)), ((v1, v2) => v1.prid === v2.prid));
                    await this.query();
                }
            }
        }

        add(): void {
            this.$router.push('/privilege-add');
        }

        get url(): string {
            return `/${this.$route.name}${parameters(Object({
                filter: filterItemsModelToString(this.filterItemsModel),
                sort: sortModelToString(this.sortModel),
                'page-size': numberToString(this.pageSize),
                'page-number': numberToString(this.pageNumber)
            }))}`;
        }
    }
</script>

<style lang="scss" scoped>
</style>