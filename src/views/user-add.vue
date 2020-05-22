<template>
    <pac-form name="用户新增" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame name="基本信息">
            <pac-input :spec="spec.fields.usstatus"
                       v-model="user.usstatus" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px" :spec="spec.fields.usname"
                       v-model="user.usname" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px" :spec="spec.fields.usan8"
                       v-model="user.usan8" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px" :spec="spec.fields.uscell"
                       v-model="user.uscell" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px" :spec="spec.fields.usmail"
                       v-model="user.usmail" @input:error="errorsModel.set($event)"/>
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
    import {USER_SPEC} from "@/components/gen/spec/UserSpec";
    import {User} from "@/components/gen/bean/User";
    import {addUser} from "@/components/gen/stub/UserStub";
    import {uuid} from "uuidv4";

    @Component({name: 'user-add'})
    export default class UserAdd extends Common {
        loading = false;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = USER_SPEC;
        user = new User();

        async add(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {user} = await addUser(this.user);
                this.user = user;
                await this.$router.replace({path: `user-update/${this.user.usid}?uuid=${uuid()}`}, () => undefined, () => undefined);
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