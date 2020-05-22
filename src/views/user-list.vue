<template>
    <pac-form name="用户列表" :url="url" :loading="loading" :progressModel="progressModel">
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
            <template v-slot:usname="data">
                <router-link :to="{path: `user-update/${data.element.usid}`}">
                    {{data.element.usname}}
                </router-link>
            </template>
            <template v-slot:usan8="data">
                <div class="cell-right"> {{data.element.usan8}}</div>
            </template>
            <template v-slot:uscell="data">{{data.element.uscell}}</template>
            <template v-slot:usmail="data">{{data.element.usmail}}</template>
            <template v-slot:usstatus="data">{{spec.fields.usstatus.getLabel(data.element.usstatus)}}</template>
        </pac-table>
    </pac-form>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import Common from "@/common";
    import {USER_SPEC} from "@/components/gen/spec/UserSpec";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {User} from "@/components/gen/bean/User";
    import {ContentRange} from "@/components/gen/range";
    import {batchDeleteUser, queryUser} from "@/components/gen/stub/UserStub";
    import {parameters} from "@/components/gen/common";
    import {filterItemsModelToString, numberToString, sortModelToString, subtract} from "@/components/lib/pac-common";

    @Component({name: 'user-list'})
    export default class UserList extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = USER_SPEC;
        tableModel = new PacTableModel('multiple').appendField(
            new PacTableFieldModel(this.spec.fields.usname.alias.toLowerCase(), this.spec.fields.usname.description, 200, true, true),
            new PacTableFieldModel(this.spec.fields.usan8.alias.toLowerCase(), this.spec.fields.usan8.description, 120, true, true),
            new PacTableFieldModel(this.spec.fields.uscell.alias.toLowerCase(), this.spec.fields.uscell.description, 160, true, true),
            new PacTableFieldModel(this.spec.fields.usmail.alias.toLowerCase(), this.spec.fields.usmail.description, 320, true, true),
            new PacTableFieldModel(this.spec.fields.usstatus.alias.toLowerCase(), this.spec.fields.usstatus.description, 80, true, true));

        @Prop({type: Number, required: false, default: 50})
        initPageSize!: number;
        pageSize = this.initPageSize;

        @Prop({type: Number, required: false, default: 1})
        initPageNumber!: number;
        pageNumber = this.initPageNumber;

        @Prop({type: Object, required: false, default: () => new FilterItemsModel(USER_SPEC)})
        initFilterItemsModel!: FilterItemsModel;
        filterItemsModel = this.initFilterItemsModel;

        @Prop({type: Object, required: false, default: null})
        initSortModel!: SortModel | null;
        sortModel = this.initSortModel;

        list = new Array<User>();
        selection = new Array<User>();
        contentRange = new ContentRange();

        async created(): Promise<void> {
            await this.query();
            this.loading = false;
        }

        async query(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {list, contentRange} = await queryUser({
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
                const list = await batchDeleteUser(this.selection.flatMap(v => v.usid !== null ? [v.usid] : []).map(v => Object({usid: v})));
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
                    this.selection = subtract(this.selection, success.map(v => new User(v.key.usid)), ((v1, v2) => v1.usid === v2.usid));
                    await this.query();
                }
            }
        }

        add(): void {
            this.$router.push('user-add');
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
    .cell-right {
        width: 100%;
        height: fit-content;
        vertical-align: center;
        text-align: right;
    }
</style>