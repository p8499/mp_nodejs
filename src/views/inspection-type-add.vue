<template>
    <pac-form name="巡视类型新增" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame name="基本信息">
            <pac-input :spec="spec.fields.itid" :suppressSelect="true"
                       v-model="inspectionType.itid" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px;"
                       :spec="spec.fields.itname"
                       v-model="inspectionType.itname" @input:error="errorsModel.set($event)"/>
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
    import {INSPECTIONTYPE_SPEC} from "@/components/gen/spec/InspectionTypeSpec";
    import {addInspectionType} from "@/components/gen/stub/InspectionTypeStub";
    import {InspectionType} from "@/components/gen/bean/InspectionType";
    import {uuid} from "uuidv4";

    @Component({name: 'inspection-type-add'})
    export default class InspectionTypeAdd extends Common {
        loading = false;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = INSPECTIONTYPE_SPEC;
        inspectionType = new InspectionType();

        async add(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {inspectionType} = await addInspectionType(this.inspectionType);
                this.inspectionType = inspectionType;
                await this.$router.replace({path: `inspection-type-update/${this.inspectionType.itid}?uuid=${uuid()}`}, () => undefined, () => undefined);
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