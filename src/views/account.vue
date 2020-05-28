<template>
    <pac-form name="账户设置" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event, focusTab)"/>
        <pac-tab style="width: 100%;" :tabs="tabs"
                 :selectedTab="selectedTab" @input:selectedTab="selectedTab = $event">
            <template v-slot:0>
                <pac-input :spec="userSpec.fields.usname"
                           v-model="user.usname" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-input style="margin-top: 14px" :spec="userSpec.fields.usan8"
                           v-model="user.usan8" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-input style="margin-top: 14px" :spec="userSpec.fields.uscell"
                           v-model="user.uscell" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-input style="margin-top: 14px" :spec="userSpec.fields.usmail"
                           v-model="user.usmail" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-button style="margin-top: 14px"
                            text="更改" @input="update()"/>
            </template>
            <template v-slot:1>
                <img :src="downloadUserAttachment(currentUser, undefined, imageUuid)" alt=""/>
                <pac-file-raw style="margin-top: 14px"
                              label="上传头像" :type="['image', 'audio']" :multiple="false" :disabled="false"
                              @upload="uploadUserAttachment($event[0])"/>
            </template>
            <template v-slot:2>
                <pac-input-string label="输入原密码" :required="false" :disabled="false" :password="true"
                                  :length="16" nullOrBlank="blank" v-model="old"
                                  @input:error="errorsModel.set($event.setPath('2'))"
                                  :validate="async () => null"/>
                <pac-input-string style="margin-top: 14px"
                                  label="输入新密码" :required="false" :disabled="false" :password="true"
                                  :length="16" nullOrBlank="blank" v-model="new1"
                                  @input:error="errorsModel.set($event.setPath('2'))"
                                  :validate="async () => null"/>
                <pac-input-string style="margin-top: 14px"
                                  label="再次输入新密码" :required="false" :disabled="false" :password="true"
                                  :length="16" nullOrBlank="blank" v-model="new2"
                                  @input:error="errorsModel.set($event.setPath('2'))"
                                  :validate="async () => null"/>
                <pac-button style="margin-top: 14px"
                            text="更改" @input="password()"/>
            </template>
            <template v-slot:3>
                <pac-table style="max-width: 100%; max-height: 480px;"
                           :model="userRoleTableModel" :list="userRoleList" :contentRange="userRoleContentRange"
                           :pageSize="userRolePageSize" @input:pageSize="userRolePageSize = $event"
                           @input:pageNumber="userRolePageNumber = $event"
                           :filterItemsModel="userRoleFilterItemsModel"
                           :sortModel="userRoleSortModel" @input:sortModel="userRoleSortModel = $event"
                           :selection="userRoleSelection" @input:selection="userRoleSelection = $event"
                           @refresh="queryUserRole()">
                    <template v-slot:urroid="data">{{data.element.urroid}}</template>
                    <template v-slot:urroname="data">{{data.element.urroname}}</template>
                </pac-table>
            </template>
            <template v-slot:4>
                <pac-table style="max-width: 100%; max-height: 480px;"
                           :model="crewUserTableModel" :list="crewUserList" :contentRange="crewUserContentRange"
                           :pageSize="crewUserPageSize" @input:pageSize="crewUserPageSize = $event"
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
    import {Component} from "vue-property-decorator";
    import {PacErrorModel, PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import {User} from "@/components/gen/bean/User";
    import {downloadUserAttachment, getUser, updateUser, uploadUserAttachment} from "@/components/gen/stub/UserStub";
    import Common from "@/common";
    import {UserRole} from "@/components/gen/bean/UserRole";
    import {queryUserRole} from "@/components/gen/stub/UserRoleStub";
    import {USERROLE_SPEC} from "@/components/gen/spec/UserRoleSpec";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {ContentRange} from "@/components/gen/range";
    import {USER_SPEC} from "@/components/gen/spec/UserSpec";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {CREWUSER_SPEC} from "@/components/gen/spec/CrewUserSpec";
    import {CrewUser} from "@/components/gen/bean/CrewUser";
    import {password} from "@/components/stub-ex/UserStubEx";
    import {FilterLogicExpr} from "@/components/gen/filter";
    import {queryCrewUser} from "@/components/gen/stub/CrewUserStub";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {uuid} from "uuidv4";

    @Component({name: 'account'})
    export default class Account extends Common {
        currentUser = this.getCurrentUser();
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();
        tabs: Array<string> = ['个人信息', '设置头像', '修改密码', '拥有角色', '所属班组'];
        selectedTab = 0;

        userSpec = USER_SPEC;
        user = new User();

        downloadUserAttachment = downloadUserAttachment;
        imageUuid = "";

        old = '';
        new1 = '';
        new2 = '';

        userRoleSpec = USERROLE_SPEC;
        userRoleTableModel = new PacTableModel('none').appendField(
            new PacTableFieldModel(this.userRoleSpec.fields.urroid.alias.toLowerCase(), this.userRoleSpec.fields.urroid.description, 120, true, true),
            new PacTableFieldModel(this.userRoleSpec.fields.urroname.alias.toLowerCase(), this.userRoleSpec.fields.urroname.description, 200, true, true));
        userRoleList = new Array<UserRole>();
        userRoleSelection = new Array<UserRole>();
        userRolePageSize = 50;
        userRolePageNumber = 1;
        userRoleFilterItemsModel = new FilterItemsModel(this.userRoleSpec);
        userRoleSortModel: SortModel | null = null;
        userRoleContentRange = new ContentRange();

        crewUserSpec = CREWUSER_SPEC;
        crewUserTableModel = new PacTableModel('none').appendField(
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

        async created(): Promise<void> {
            await this.get();
            await this.queryUserRole();
            await this.queryCrewUser();
            this.loading = false;
        }

        async get(): Promise<void> {
            if (this.currentUser !== null && this.currentUser.usid !== null) {
                const progress = this.progressModel.start();
                try {
                    const {user} = await getUser({usid: this.currentUser.usid});
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
        }

        async update(): Promise<void> {
            if (this.currentUser !== null && this.currentUser.usid !== null) {
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
        }

        async uploadUserAttachment(file: File): Promise<void> {
            if (this.currentUser !== null && this.currentUser.usid !== null) {
                const progress = this.progressModel.start();
                try {
                    await uploadUserAttachment({usid: this.currentUser.usid}, await file.arrayBuffer());
                    this.imageUuid = uuid();
                } catch (e) {
                    this.errorsModel.set(new PacErrorObj('uploadUserAttachment', {
                        subject: '远程服务器错误',
                        content: `远程服务器状态：${e.statusCode}`
                    }));
                } finally {
                    this.progressModel.stop(progress);
                }
            }
        }

        async queryUserRole(): Promise<void> {
            if (this.currentUser !== null && this.currentUser.usid !== null) {
                const progress = this.progressModel.start();
                try {
                    const {list, contentRange} = await queryUserRole({
                        filter: this.userRoleFilterItemsModel.expr !== undefined ?
                            this.userRoleFilterItemsModel.expr.equalsNumber(this.userRoleSpec.fields.urusid.alias, this.currentUser.usid) :
                            new FilterLogicExpr().equalsNumber(this.userRoleSpec.fields.urusid.alias, this.currentUser.usid),
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
        }

        async queryCrewUser(): Promise<void> {
            if (this.currentUser !== null && this.currentUser.usid !== null) {
                const progress = this.progressModel.start();
                try {
                    const {list, contentRange} = await queryCrewUser({
                        filter: this.crewUserFilterItemsModel.expr !== undefined ?
                            this.crewUserFilterItemsModel.expr.equalsNumber(this.crewUserSpec.fields.cuusid.alias, this.currentUser.usid) :
                            new FilterLogicExpr().equalsNumber(this.crewUserSpec.fields.cuusid.alias, this.currentUser.usid),
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
        }

        async password(): Promise<void> {
            if (this.old === '')
                this.errorsModel.set(new PacErrorObj('password', '请输入原密码'));
            else if (this.new1 === '' && this.new2 === '')
                this.errorsModel.set(new PacErrorObj('password', '请输入新密码'));
            else if (this.new1 !== this.new2)
                this.errorsModel.set(new PacErrorObj('password', '两次输入不一致'));
            else {
                const progress = this.progressModel.start();
                try {
                    await password(this.old, this.new1);
                    this.signout();
                } catch (e) {
                    this.errorsModel.set(new PacErrorObj('password', {
                        subject: '远程服务器错误',
                        content: `远程服务器状态：${e.statusCode}`
                    }));
                } finally {
                    this.progressModel.stop(progress);
                }
            }
        }

        focusTab(error: PacErrorModel) {
            if (error.paths.length > 0)
                this.selectedTab = parseInt(error.paths[0]);
        }
    }
</script>

<style lang="scss" scoped>

</style>