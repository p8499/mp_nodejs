<template>
    <pac-form name="权限新增" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame name="基本信息">
            <pac-input :spec="spec.fields.prid" :suppressSelect="true"
                       v-model="privilege.prid" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px;"
                       :spec="spec.fields.prname"
                       v-model="privilege.prname" @input:error="errorsModel.set($event)"/>
        </pac-frame>
        <pac-button style="margin-top: 14px;"
                    text="新增" @input="add()"/>
    </pac-form>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import Common from "@/common";
    import {PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {PRIVILEGE_SPEC} from "@/components/gen/spec/PrivilegeSpec";
    import {Privilege} from "@/components/gen/bean/Privilege";
    import {addPrivilege} from "@/components/gen/stub/PrivilegeStub";
    import {uuid} from "uuidv4";

    @Component({name: 'privilege-add'})
    export default class PrivilegeAdd extends Common {
        loading = false;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = PRIVILEGE_SPEC;
        privilege = new Privilege();

        async add(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {privilege} = await addPrivilege(this.privilege);
                this.privilege = privilege;
                await this.$router.replace({path: `privilege-update/${this.privilege.prid}?uuid=${uuid()}`}, () => undefined, () => undefined);
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