<template>
    <pac-form name="维保类型新增" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame name="基本信息">
            <pac-input :spec="spec.fields.mtid" :suppressSelect="true"
                       v-model="maintenanceType.mtid" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px;"
                       :spec="spec.fields.mtname"
                       v-model="maintenanceType.mtname" @input:error="errorsModel.set($event)"/>
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
    import {MAINTENANCETYPE_SPEC} from "@/components/gen/spec/MaintenanceTypeSpec";
    import {MaintenanceType} from "@/components/gen/bean/MaintenanceType";
    import {addMaintenanceType} from "@/components/gen/stub/MaintenanceTypeStub";
    import {uuid} from "uuidv4";

    @Component({name: 'maintenance-type-add'})
    export default class MaintenanceTypeAdd extends Common {
        loading = false;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = MAINTENANCETYPE_SPEC;
        maintenanceType = new MaintenanceType();

        async add(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {maintenanceType} = await addMaintenanceType(this.maintenanceType);
                this.maintenanceType = maintenanceType;
                await this.$router.replace({path: `/maintenance-type-update/${this.maintenanceType.mtid}?uuid=${uuid()}`}, () => undefined, () => undefined);
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