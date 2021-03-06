<template>
    <pac-form name="角色列表" :url="url" :loading="loading" :progressModel="progressModel">
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
            <template v-slot:roid="data">
                <router-link :to="{path: `/role-update/${data.element.roid}`}">
                    {{data.element.roid}}
                </router-link>
            </template>
            <template v-slot:roname="data">{{data.element.roname}}</template>
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
    import {ROLE_SPEC} from "@/components/gen/spec/RoleSpec";
    import {Role} from "@/components/gen/bean/Role";
    import {batchDeleteRole, queryRole} from "@/components/gen/stub/RoleStub";
    import {parameters} from "@/components/gen/common";
    import {filterItemsModelToString, numberToString, sortModelToString, subtract} from "@/components/lib/pac-common";

    @Component({name: 'role-list'})
    export default class RoleList extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = ROLE_SPEC;
        tableModel = new PacTableModel('multiple').appendField(
            new PacTableFieldModel(this.spec.fields.roid.alias.toLowerCase(), this.spec.fields.roid.description, 120, true, true),
            new PacTableFieldModel(this.spec.fields.roname.alias.toLowerCase(), this.spec.fields.roname.description, 200, true, true));

        @Prop({type: Number, required: false, default: 50})
        initPageSize!: number;
        pageSize = this.initPageSize;

        @Prop({type: Number, required: false, default: 1})
        initPageNumber!: number;
        pageNumber = this.initPageNumber;

        @Prop({type: Object, required: false, default: () => new FilterItemsModel(ROLE_SPEC)})
        initFilterItemsModel!: FilterItemsModel;
        filterItemsModel = this.initFilterItemsModel;

        @Prop({type: Object, required: false, default: null})
        initSortModel!: SortModel | null;
        sortModel = this.initSortModel;

        list = new Array<Role>();
        selection = new Array<Role>();
        contentRange = new ContentRange();

        async created(): Promise<void> {
            await this.query();
            this.loading = false;
        }

        async query(): Promise<void> {
            const progress = this.progressModel.start();
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
                const list = await batchDeleteRole(this.selection.flatMap(v => v.roid !== null ? [v.roid] : []).map(v => Object({roid: v})));
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
                    this.selection = subtract(this.selection, success.map(v => new Role(v.key.roid)), ((v1, v2) => v1.roid === v2.roid));
                    await this.query();
                }
            }
        }

        add(): void {
            this.$router.push('/role-add');
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