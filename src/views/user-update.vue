<template>
    <pac-form name="用户修改" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event, focusTab)"/>
        <pac-tab style="width: 100%;" :tabs="tabs"
                 :selectedTab="selectedTab" @input:selectedTab="selectedTab = $event">
            <template v-slot:0>
                <pac-input :spec="userSpec.fields.usstatus"
                           v-model="user.usstatus" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-input style="margin-top: 14px" :spec="userSpec.fields.usname"
                           v-model="user.usname" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-input style="margin-top: 14px" :spec="userSpec.fields.usan8"
                           v-model="user.usan8" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-input style="margin-top: 14px" :spec="userSpec.fields.uscell"
                           v-model="user.uscell" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-input style="margin-top: 14px" :spec="userSpec.fields.usmail"
                           v-model="user.usmail" @input:error="errorsModel.set($event.setPath('0'))"/>
                <div style="margin-top: 14px;">
                    <pac-button text="更改" @input="update()"/>
                    <pac-button style="margin-left: 8px;" text="重置密码" @input="reset()"/>
                </div>
            </template>
            <template v-slot:1>
                <div>
                    <pac-button text="新增" @input="roleSelect = true"/>
                    <pac-button style="margin-left: 8px;"
                                text="删除" @input="delUserRole()" v-if="userRoleSelection.length > 0"/>
                </div>
                <pac-select-picker :multi-select="true" select="select-roid"
                                   :value="userRoleList.map(v => v.urroid)"
                                   @input="addUserRole(subtract($event, userRoleList.map(v => v.urroid)))"
                                   v-if="roleSelect" @close="roleSelect = false"/>
                <pac-table style="margin-top: 14px; max-width: 100%; max-height: 480px;"
                           :model="userRoleTableModel" :list="userRoleList"
                           :contentRange="userRoleContentRange"
                           :pageSize="userRolePageSize"
                           @input:pageSize="userRolePageSize = $event"
                           @input:pageNumber="userRolePageNumber = $event"
                           :filterItemsModel="userRoleFilterItemsModel"
                           :sortModel="userRoleSortModel" @input:sortModel="userRoleSortModel = $event"
                           :selection="userRoleSelection" @input:selection="userRoleSelection = $event"
                           @refresh="queryUserRole()">
                    <template v-slot:urroid="data">{{data.element.urroid}}</template>
                    <template v-slot:urroname="data">{{data.element.urroname}}</template>
                </pac-table>
            </template>
            <template v-slot:2>
                <div>
                    <pac-button text="新增" @input="crewSelect = true"/>
                    <pac-button style="margin-left: 8px;"
                                text="删除" @input="delCrewUser()" v-if="crewUserSelection.length > 0"/>
                </div>
                <pac-select-picker :multi-select="true" select="select-cwid"
                                   :value="crewUserList.map(v => v.cucwid)"
                                   @input="addCrewUser(subtract($event, crewUserList.map(v => v.cucwid)))"
                                   v-if="crewSelect" @close="crewSelect = false"/>
                <pac-table style="margin-top: 14px; max-width: 100%; max-height: 480px;"
                           :model="crewUserTableModel" :list="crewUserList"
                           :contentRange="crewUserContentRange"
                           :pageSize="crewUserPageSize"
                           @input:pageSize="crewUserPageSize = $event"
                           @input:pageNumber="crewUserPageNumber = $event"
                           :filterItemsModel="crewUserFilterItemsModel"
                           :sortModel="crewUserSortModel" @input:sortModel="crewUserSortModel = $event"
                           :selection="crewUserSelection" @input:selection="crewUserSelection = $event"
                           @refresh="queryCrewUser()">
                    <template v-slot:cuwcmcu="data">{{data.element.cuwcmcu}}</template>
                    <template v-slot:cuwcdl01="data">{{data.element.cuwcdl01}}</template>
                    <template v-slot:cucwname="data">{{data.element.cucwname}}</template>
                </pac-table>
            </template>
        </pac-tab>
    </pac-form>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {PacErrorModel, PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import Common from "@/common";
    import {USER_SPEC} from "@/components/gen/spec/UserSpec";
    import {User} from '@/components/gen/bean/User';
    import {USERROLE_SPEC} from "@/components/gen/spec/UserRoleSpec";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {UserRole} from "@/components/gen/bean/UserRole";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {ContentRange} from "@/components/gen/range";
    import {subtract} from '@/components/lib/pac-common';
    import {CREWUSER_SPEC} from "@/components/gen/spec/CrewUserSpec";
    import {CrewUser} from "@/components/gen/bean/CrewUser";
    import {getUser, updateUser} from "@/components/gen/stub/UserStub";
    import {FilterLogicExpr} from "@/components/gen/filter";
    import {batchAddCrewUser, batchDeleteCrewUser, queryCrewUser} from '@/components/gen/stub/CrewUserStub';
    import {batchAddUserRole, batchDeleteUserRole, queryUserRole} from '@/components/gen/stub/UserRoleStub';
    import {parameters} from "@/components/gen/common";
    import {reset} from "@/components/stub-ex/UserStubEx";

    @Component({name: 'user-update'})
    export default class UserUpdate extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();
        tabs: Array<string> = ['基本信息', '拥有角色', '所属班组'];
        selectedTab = 0;
        subtract = subtract;

        userSpec = USER_SPEC;
        @Prop({type: Number, required: true})
        initUsid!: number;
        usid = this.initUsid;
        user = new User();

        userRoleSpec = USERROLE_SPEC;
        userRoleTableModel = new PacTableModel('multiple').appendField(
            new PacTableFieldModel(this.userRoleSpec.fields.urroid.alias.toLowerCase(), this.userRoleSpec.fields.urroid.description, 120, true, true),
            new PacTableFieldModel(this.userRoleSpec.fields.urroname.alias.toLowerCase(), this.userRoleSpec.fields.urroname.description, 200, true, true));
        userRoleList = new Array<UserRole>();
        userRoleSelection = new Array<UserRole>();
        userRolePageSize = 50;
        userRolePageNumber = 1;
        userRoleFilterItemsModel = new FilterItemsModel(this.userRoleSpec);
        userRoleSortModel: SortModel | null = null;
        userRoleContentRange = new ContentRange();
        roleSelect = false;

        crewUserSpec = CREWUSER_SPEC;
        crewUserTableModel = new PacTableModel('multiple').appendField(
            new PacTableFieldModel(this.crewUserSpec.fields.cuwcmcu.alias.toLowerCase(), this.crewUserSpec.fields.cuwcmcu.description, 120, true, true),
            new PacTableFieldModel(this.crewUserSpec.fields.cuwcdl01.alias.toLowerCase(), this.crewUserSpec.fields.cuwcdl01.description, 240, true, true),
            new PacTableFieldModel(this.crewUserSpec.fields.cucwname.alias.toLowerCase(), this.crewUserSpec.fields.cucwname.description, 200, true, true));
        crewUserList = new Array<CrewUser>();
        crewUserSelection = new Array<CrewUser>();
        crewUserPageSize = 50;
        crewUserPageNumber = 1;
        crewUserFilterItemsModel = new FilterItemsModel(this.crewUserSpec);
        crewUserSortModel: SortModel | null = null;
        crewUserContentRange = new ContentRange();
        crewSelect = false;

        async created(): Promise<void> {
            await this.get();
            await this.queryUserRole();
            await this.queryCrewUser();
            this.loading = false;
        }

        async get(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {user} = await getUser({usid: this.usid});
                this.user = user;
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
                const {user} = await updateUser(this.user);
                this.user = user;
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('update', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async reset(): Promise<void> {
            if (window.confirm(`是否重置${this.user.usname}的密码？`)) {
                const progress = this.progressModel.start();
                try {
                    await reset(this.usid);
                } catch (e) {
                    this.errorsModel.set(new PacErrorObj('reset', {
                        subject: '远程服务器错误',
                        content: `远程服务器状态：${e.statusCode}`
                    }));
                } finally {
                    this.progressModel.stop(progress);
                }
            }
        }

        async queryUserRole(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {list, contentRange} = await queryUserRole({
                    filter: this.userRoleFilterItemsModel.expr !== undefined ?
                        this.userRoleFilterItemsModel.expr.equalsNumber(this.userRoleSpec.fields.urusid.alias, this.usid) :
                        new FilterLogicExpr().equalsNumber(this.userRoleSpec.fields.urusid.alias, this.usid),
                    orderBy: this.userRoleSortModel?.expr?.only(),
                    pageSize: this.userRolePageSize,
                    pageNumber: this.userRolePageNumber
                });
                this.userRoleList = list;
                this.userRoleContentRange = contentRange;
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('queryUserRole', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async addUserRole(roids: Array<string>): Promise<void> {
            const progress = this.progressModel.start();
            const list = await batchAddUserRole(roids.map(v => new UserRole(null, this.usid, v, null, null)));
            this.progressModel.stop(progress);
            const success = list.filter(v => v.statusCode < 400);
            const failure = list.filter(v => v.statusCode >= 400);
            if (success.length == 0 && failure.length == 1)
                this.errorsModel.set(new PacErrorObj('addUserRole', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${failure[0].statusCode}`
                }));
            else if (failure.length > 0)
                this.errorsModel.set(new PacErrorObj('addUserRole', `新增结果：${success.length}条成功，${failure.length}条失败`));
            if (success.length > 0)
                this.queryUserRole();
        }

        async delUserRole(): Promise<void> {
            if (window.confirm(`是否删除${this.userRoleSelection.length}条记录？`)) {
                const progress = this.progressModel.start();
                const list = await batchDeleteUserRole(this.userRoleSelection.flatMap(v => v.urid !== null ? [v.urid] : []).map(v => Object({urid: v})));
                this.progressModel.stop(progress);
                const success = list.filter(v => v.statusCode < 400);
                const failure = list.filter(v => v.statusCode >= 400);
                if (success.length == 0 && failure.length == 1)
                    this.errorsModel.set(new PacErrorObj('delUserRole', {
                        subject: '远程服务器错误',
                        content: `远程服务器状态：${failure[0].statusCode}`
                    }));
                else if (failure.length > 0)
                    this.errorsModel.set(new PacErrorObj('delUserRole', `删除结果：${success.length}条成功，${failure.length}条失败`));
                if (success.length > 0) {
                    this.userRoleSelection = subtract(this.userRoleSelection, success.map(v => new UserRole(v.key.urid)), ((v1, v2) => v1.urid === v2.urid));
                    await this.queryUserRole();
                }
            }
        }

        async queryCrewUser(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {list, contentRange} = await queryCrewUser({
                    filter: this.crewUserFilterItemsModel.expr !== undefined ?
                        this.crewUserFilterItemsModel.expr.equalsNumber(this.crewUserSpec.fields.cuusid.alias, this.usid) :
                        new FilterLogicExpr().equalsNumber(this.crewUserSpec.fields.cuusid.alias, this.usid),
                    orderBy: this.crewUserSortModel?.expr?.only(),
                    pageSize: this.crewUserPageSize,
                    pageNumber: this.crewUserPageNumber
                });
                this.crewUserList = list;
                this.crewUserContentRange = contentRange;
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('queryCrewUser', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async addCrewUser(cwids: Array<number>): Promise<void> {
            const progress = this.progressModel.start();
            const list = await batchAddCrewUser(cwids.map(v => new CrewUser(null, v, null, null, null, this.usid)));
            this.progressModel.stop(progress);
            const success = list.filter(v => v.statusCode < 400);
            const failure = list.filter(v => v.statusCode >= 400);
            if (success.length == 0 && failure.length == 1)
                this.errorsModel.set(new PacErrorObj('addCrewUser', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${failure[0].statusCode}`
                }));
            else if (failure.length > 0)
                this.errorsModel.set(new PacErrorObj('addCrewUser', `新增结果：${success.length}条成功，${failure.length}条失败`));
            if (success.length > 0)
                this.queryCrewUser();
        }

        async delCrewUser(): Promise<void> {
            if (window.confirm(`是否删除${this.crewUserSelection.length}条记录？`)) {
                const progress = this.progressModel.start();
                const list = await batchDeleteCrewUser(this.crewUserSelection.flatMap(v => v.cuid !== null ? [v.cuid] : []).map(v => Object({cuid: v})));
                this.progressModel.stop(progress);
                const success = list.filter(v => v.statusCode < 400);
                const failure = list.filter(v => v.statusCode >= 400);
                if (success.length == 0 && failure.length == 1)
                    this.errorsModel.set(new PacErrorObj('delCrewUser', {
                        subject: '远程服务器错误',
                        content: `远程服务器状态：${failure[0].statusCode}`
                    }));
                else if (failure.length > 0)
                    this.errorsModel.set(new PacErrorObj('delCrewUser', `删除结果：${success.length}条成功，${failure.length}条失败`));
                if (success.length > 0) {
                    this.crewUserSelection = subtract(this.crewUserSelection, success.map(v => new CrewUser(v.key.cuid)), ((v1, v2) => v1.cuid === v2.cuid));
                    await this.queryCrewUser();
                }
            }
        }

        get url(): string {
            return `/${this.$route.name}${parameters(Object({
                usid: this.usid
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