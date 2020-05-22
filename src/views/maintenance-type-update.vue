<template>
    <pac-form name="维保类型修改" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame name="基本信息">
            <pac-input :spec="spec.fields.mtid" :disabled="true"
                       v-model="maintenanceType.mtid" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px;"
                       :spec="spec.fields.mtname"
                       v-model="maintenanceType.mtname" @input:error="errorsModel.set($event)"/>
        </pac-frame>
        <pac-button style="margin-top: 14px;"
                    text="更改" @input="update()"/>
    </pac-form>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import Common from "@/common";
    import {MAINTENANCETYPE_SPEC} from "@/components/gen/spec/MaintenanceTypeSpec";
    import {MaintenanceType} from "@/components/gen/bean/MaintenanceType";
    import {getMaintenanceType, updateMaintenanceType} from "@/components/gen/stub/MaintenanceTypeStub";
    import {parameters} from "@/components/gen/common";

    @Component({name: 'maintenance-type-update'})
    export default class MaintenanceTypeUpdate extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = MAINTENANCETYPE_SPEC;

        @Prop({type: String, required: true})
        initMtid!: string;
        mtid = this.initMtid;

        maintenanceType = new MaintenanceType();

        async created(): Promise<void> {
            await this.get();
            this.loading = false;
        }

        async get(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {maintenanceType} = await getMaintenanceType({mtid: this.mtid});
                this.maintenanceType = maintenanceType;
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
                const {maintenanceType} = await updateMaintenanceType(this.maintenanceType);
                this.maintenanceType = maintenanceType;
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
                mtid: this.mtid
            }))}`;
        }
    }
</script>

<style lang="scss" scoped>
</style>