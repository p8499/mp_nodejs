<template>
    <pac-form name="权限修改" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame name="基本信息">
            <pac-input :spec="spec.fields.prid" :disabled="true"
                       v-model="privilege.prid" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px;"
                       :spec="spec.fields.prname"
                       v-model="privilege.prname" @input:error="errorsModel.set($event)"/>
        </pac-frame>
        <pac-button style="margin-top: 14px;"
                    text="更改" @input="update()"/>
    </pac-form>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import Common from "@/common";
    import {PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {PRIVILEGE_SPEC} from "@/components/gen/spec/PrivilegeSpec";
    import {Privilege} from "@/components/gen/bean/Privilege";
    import {parameters} from "@/components/gen/common";
    import {getPrivilege, updatePrivilege} from "@/components/gen/stub/PrivilegeStub";

    @Component({name: 'privilege-update'})
    export default class PrivilegeUpdate
        extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = PRIVILEGE_SPEC;

        @Prop({type: String, required: true})
        initPrid!: string;
        prid = this.initPrid;

        privilege = new Privilege();

        async created(): Promise<void> {
            await this.get();
            this.loading = false;
        }

        async get(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {privilege} = await getPrivilege({prid: this.prid});
                this.privilege = privilege;
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
                const {privilege} = await updatePrivilege(this.privilege);
                this.privilege = privilege;
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('update', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        get url(): string {
            return `/${this.$route.name}${parameters(Object({
                prid: this.prid
            }))}`;
        }
    }
</script>

<style lang="scss" scoped>
</style>