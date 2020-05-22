<template>
    <pac-form name="角色新增" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame name="基本信息">
            <pac-input :spec="spec.fields.roid" :suppressSelect="true"
                       v-model="role.roid" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px;"
                       :spec="spec.fields.roname"
                       v-model="role.roname" @input:error="errorsModel.set($event)"/>
        </pac-frame>
        <pac-button style="margin-top: 14px;"
                    text="新增" @input="add()"/>
    </pac-form>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import Common from "@/common";
    import {ROLE_SPEC} from "@/components/gen/spec/RoleSpec";
    import {Role} from "@/components/gen/bean/Role";
    import {addRole} from "@/components/gen/stub/RoleStub";
    import {uuid} from "uuidv4";

    @Component({name: 'role-add'})
    export default class RoleAdd extends Common {
        loading = false;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = ROLE_SPEC;
        role = new Role();

        async add(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {role} = await addRole(this.role);
                this.role = role;
                await this.$router.replace({path: `role-update/${this.role.roid}?uuid=${uuid()}`}, () => undefined, () => undefined);
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('add', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>