<template>
    <pac-form name="巡视类型修改" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame name="基本信息">
            <pac-input :spec="spec.fields.itid" :disabled="true"
                       v-model="inspectionType.itid" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px;"
                       :spec="spec.fields.itname"
                       v-model="inspectionType.itname" @input:error="errorsModel.set($event)"/>
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
    import {INSPECTIONTYPE_SPEC} from "@/components/gen/spec/InspectionTypeSpec";
    import {InspectionType} from "@/components/gen/bean/InspectionType";
    import {getInspectionType, updateInspectionType} from "@/components/gen/stub/InspectionTypeStub";
    import {parameters} from "@/components/gen/common";

    @Component({name: 'inspection-type-update'})
    export default class InspectionTypeUpdate extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = INSPECTIONTYPE_SPEC;

        @Prop({type: String, required: true})
        initItid!: string;
        itid = this.initItid;

        inspectionType = new InspectionType();

        async created(): Promise<void> {
            await this.get();
            this.loading = false;
        }

        async get(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {inspectionType} = await getInspectionType({itid: this.itid});
                this.inspectionType = inspectionType;
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
                const {inspectionType} = await updateInspectionType(this.inspectionType);
                this.inspectionType = inspectionType;
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
                itid: this.itid
            }))}`;
        }
    }
</script>

<style lang="scss" scoped>
</style>