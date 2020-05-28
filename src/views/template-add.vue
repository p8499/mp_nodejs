<template>
    <pac-form name="模板新增" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame name="基本信息">
            <pac-input style="margin-top: 14px;"
                       :spec="spec.fields.ttname"
                       v-model="template.ttname" @input:error="errorsModel.set($event)"/>
            <pac-select style="margin-top: 14px;"
                        :spec="spec.fields.tttype"
                        v-model="template.tttype" @input:error="errorsModel.set($event)"/>
        </pac-frame>
        <pac-button style="margin-top: 14px;" text="新增" @input="add()"/>
    </pac-form>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import Common from "@/common";
    import {TEMPLATE_SPEC} from "@/components/gen/spec/TemplateSpec";
    import {Template} from "@/components/gen/bean/Template";
    import {addTemplate} from "@/components/gen/stub/TemplateStub";
    import {uuid} from "uuidv4";

    @Component({name: 'template-add'})
    export default class TemplateAdd extends Common {
        loading = false;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();

        spec = TEMPLATE_SPEC;
        template = new Template();

        async add(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {template} = await addTemplate(this.template);
                this.template = template;
                await this.$router.replace({path: `/template-update/${this.template.ttid}?uuid=${uuid()}`}, () => undefined, () => undefined);
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