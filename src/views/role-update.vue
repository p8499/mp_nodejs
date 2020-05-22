<template>
    <pac-form name="角色修改" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event, focusTab)"/>
        <pac-tab style="width: 100%;" :tabs="tabs"
                 :selectedTab="selectedTab" @input:selectedTab="selectedTab = $event">
            <template v-slot:0>
                <pac-input :spec="roleSpec.fields.roid" :disabled="true"
                           v-model="role.roid" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-input style="margin-top: 14px"
                           :spec="roleSpec.fields.roname"
                           v-model="role.roname" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-button style="margin-top: 14px;"
                            text="更改" @input="update()"/>
            </template>
            <template v-slot:1>
                <div>
                    <pac-button text="新增" @input="privilegeSelect = true"/>
                    <pac-button style="margin-left: 8px;"
                                text="删除" @input="delRolePrivilege()" v-if="rolePrivilegeSelection.length > 0"/>
                </div>
                <pac-select-picker :multi-select="true" select="select-prid"
                                   :value="rolePrivilegeList.map(v => v.rpprid)"
                                   @input="addRolePrivilege(subtract($event, rolePrivilegeList.map(v => v.rpprid)))"
                                   v-if="privilegeSelect" @close="privilegeSelect = false"/>
                <pac-table style="margin-top: 14px; max-width: 100%; max-height: 480px;"
                           :model="rolePrivilegeTableModel" :list="rolePrivilegeList"
                           :contentRange="rolePrivilegeContentRange"
                           :pageSize="rolePrivilegePageSize"
                           @input:pageSize="rolePrivilegePageSize = $event"
                           @input:pageNumber="rolePrivilegePageNumber = $event"
                           :filterItemsModel="rolePrivilegeFilterItemsModel"
                           :sortModel="rolePrivilegeSortModel" @input:sortModel="rolePrivilegeSortModel = $event"
                           :selection="rolePrivilegeSelection" @input:selection="rolePrivilegeSelection = $event"
                           @refresh="queryRolePrivilege()">
                    <template v-slot:rpprid="data">{{data.element.rpprid}}</template>
                    <template v-slot:rpprname="data">{{data.element.rpprname}}</template>
                </pac-table>
            </template>
        </pac-tab>
    </pac-form>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import Common from "@/common";
    import {PacErrorModel, PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {ROLE_SPEC} from "@/components/gen/spec/RoleSpec";
    import {Role} from "@/components/gen/bean/Role";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {ContentRange} from "@/components/gen/range";
    import {ROLEPRIVILEGE_SPEC} from "@/components/gen/spec/RolePrivilegeSpec";
    import {RolePrivilege} from "@/components/gen/bean/RolePrivilege";
    import {getRole, updateRole} from "@/components/gen/stub/RoleStub";
    import {parameters} from "@/components/gen/common";
    import {
        batchAddRolePrivilege,
        batchDeleteRolePrivilege,
        queryRolePrivilege
    } from "@/components/gen/stub/RolePrivilegeStub";
    import {FilterLogicExpr} from "@/components/gen/filter";
    import {subtract} from "@/components/lib/pac-common";

    @Component({name: 'role-update'})
    export default class RoleUpdate extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();
        tabs: Array<string> = ['基本信息', '拥有权限'];
        selectedTab = 0;
        subtract = subtract;

        roleSpec = ROLE_SPEC;
        @Prop({type: String, required: true})
        initRoid!: string;
        roid = this.initRoid;
        role = new Role();

        rolePrivilegeSpec = ROLEPRIVILEGE_SPEC;
        rolePrivilegeTableModel = new PacTableModel('multiple').appendField(
            new PacTableFieldModel(this.rolePrivilegeSpec.fields.rpprid.alias.toLowerCase(), this.rolePrivilegeSpec.fields.rpprid.description, 120, true, true),
            new PacTableFieldModel(this.rolePrivilegeSpec.fields.rpprname.alias.toLowerCase(), this.rolePrivilegeSpec.fields.rpprname.description, 200, true, true));
        rolePrivilegeList = new Array<RolePrivilege>();
        rolePrivilegeSelection = new Array<RolePrivilege>();
        rolePrivilegePageSize = 50;
        rolePrivilegePageNumber = 1;
        rolePrivilegeFilterItemsModel = new FilterItemsModel(this.rolePrivilegeSpec);
        rolePrivilegeSortModel: SortModel | null = null;
        rolePrivilegeContentRange = new ContentRange();
        privilegeSelect = false;

        async created(): Promise<void> {
            await this.get();
            await this.queryRolePrivilege();
            this.loading = false;
        }

        async get(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {role} = await getRole({roid: this.roid});
                this.role = role;
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('get', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async update(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {role} = await updateRole(this.role);
                this.role = role;
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('update', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async queryRolePrivilege(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {list, contentRange} = await queryRolePrivilege({
                    filter: this.rolePrivilegeFilterItemsModel.expr !== undefined ?
                        this.rolePrivilegeFilterItemsModel.expr.equalsString(this.rolePrivilegeSpec.fields.rproid.alias, this.roid) :
                        new FilterLogicExpr().equalsString(this.rolePrivilegeSpec.fields.rproid.alias, this.roid),
                    orderBy: this.rolePrivilegeSortModel?.expr?.only(),
                    pageSize: this.rolePrivilegePageSize,
                    pageNumber: this.rolePrivilegePageNumber
                });
                this.rolePrivilegeList = list;
                this.rolePrivilegeContentRange = contentRange;
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('queryRolePrivilege', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async addRolePrivilege(prids: Array<string>): Promise<void> {
            const progress = this.progressModel.start();
            const list = await batchAddRolePrivilege(prids.map(v => new RolePrivilege(null, this.roid, v, null, null)));
            this.progressModel.stop(progress);
            const success = list.filter(v => v.statusCode < 400);
            const failure = list.filter(v => v.statusCode >= 400);
            if (success.length == 0 && failure.length == 1)
                this.errorsModel.set(new PacErrorObj('addRolePrivilege', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${failure[0].statusCode}`
                }));
            else if (failure.length > 0)
                this.errorsModel.set(new PacErrorObj('del', `新增结果：${success.length}条成功，${failure.length}条失败`));
            if (success.length > 0)
                this.queryRolePrivilege();
        }

        async delRolePrivilege(): Promise<void> {
            if (window.confirm(`是否删除${this.rolePrivilegeSelection.length}条记录？`)) {
                const progress = this.progressModel.start();
                const list = await batchDeleteRolePrivilege(this.rolePrivilegeSelection.flatMap(v => v.rpid !== null ? [v.rpid] : []).map(v => Object({rpid: v})));
                this.progressModel.stop(progress);
                const success = list.filter(v => v.statusCode < 400);
                const failure = list.filter(v => v.statusCode >= 400);
                if (success.length == 0 && failure.length == 1)
                    this.errorsModel.set(new PacErrorObj('delRolePrivilege', {
                        subject: '远程服务器错误',
                        content: `远程服务器状态：${failure[0].statusCode}`
                    }));
                else if (failure.length > 0)
                    this.errorsModel.set(new PacErrorObj('delRolePrivilege', `删除结果：${success.length}条成功，${failure.length}条失败`));
                if (success.length > 0) {
                    this.rolePrivilegeSelection = subtract(this.rolePrivilegeSelection, success.map(v => new RolePrivilege(v.key.rpid)), ((v1, v2) => v1.rpid === v2.rpid));
                    await this.queryRolePrivilege();
                }
            }
        }

        get url(): string {
            return `/${this.$route.name}${parameters(Object({
                roid: this.roid
            }))}`;
        }

        focusTab(error: PacErrorModel) {
            if (error.paths.length > 0)
                this.selectedTab = parseInt(error.paths[0]);
        }
    }
</script>

<style lang="scss" scoped>
</style>