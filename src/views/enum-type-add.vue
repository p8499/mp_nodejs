<template>
    <pac-form name="枚举类型新增" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame name="基本信息">
            <pac-input :spec="spec.fields.etid" :suppressSelect="true"
                       v-model="enumType.etid" @input:error="errorsModel.set($event)"/>
            <pac-input style="margin-top: 14px;"
                       :spec="spec.fields.etname"
                       v-model="enumType.etname" @input:error="errorsModel.set($event)"/>
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
    import {ENUMTYPE_SPEC} from "@/components/gen/spec/EnumTypeSpec";
    import {EnumType} from "@/components/gen/bean/EnumType";
    import {uuid} from "uuidv4";
    import {addEnumType} from "@/components/gen/stub/EnumTypeStub";

    @Component({name: 'enum-type-add'})
    export default class EnumTypeAdd extends Common {
        loading = false;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = ENUMTYPE_SPEC;
        enumType = new EnumType();


        async add(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {enumType} = await addEnumType(this.enumType);
                this.enumType = enumType;
                await this.$router.replace({path: `/enum-type-update/${this.enumType.etid}?uuid=${uuid()}`}, () => undefined, () => undefined);
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