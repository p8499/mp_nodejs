<template>
    <pac-form name="模板修改" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-tab style="width: 100%;" :tabs="tabs"
                 :selectedTab="selectedTab" @input:selectedTab="selectedTab = $event">
            <template v-slot:0>
                <pac-input :spec="templateSpec.fields.ttname"
                           v-model="template.ttname" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-select style="margin-top: 14px"
                            :spec="templateSpec.fields.tttype"
                            v-model="template.tttype" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-button style="margin-top: 14px;"
                            text="更改" @input="update()"/>
            </template>
            <template v-slot:1>
                <div>
                    <pac-button text="保存" @input="saveTemplateProcedure()"/>
                    <pac-button style="margin-left: 8px;"
                                text="删除" @input="delTemplateProcedure()"
                                v-if="templateProcedureSelection.length > 0"/>
                </div>
                <pac-table style="margin-top: 14px; max-width: 100%; max-height: 480px;"
                           :model="templateProcedureTableModel" :paging="false"
                           :list="templateProcedureEditableList.rawItems"
                           :selection="templateProcedureSelection"
                           @input:selection="templateProcedureSelection = $event"
                           :refreshable="true" @refresh="queryTemplateProcedure()"
                           :hiddenList="templateProcedureEditableList.hiddenItems">
                    <template v-slot:tpseq="data">
                        <pac-input class="cell-full"
                                   :spec="templateProcedureSpec.fields.tpseq" :label="null"
                                   :required="templateProcedureEditableList.isTail(data.element)? false : undefined"
                                   v-model="data.element.tpseq"
                                   @input="templateProcedureEditableList.update(data.element)"
                                   @input:error="errorsModel.set($event.setPath('1'))"/>
                    </template>
                    <template v-slot:tpdescription="data">
                        <pac-input class="cell-full"
                                   :spec="templateProcedureSpec.fields.tpdescription" :label="null"
                                   :required="templateProcedureEditableList.isTail(data.element)? false : undefined"
                                   v-model="data.element.tpdescription"
                                   @input="templateProcedureEditableList.update(data.element)"
                                   @input:error="errorsModel.set($event.setPath('1'))"/>
                    </template>
                    <template v-slot:tpphoto="data">
                        <pac-select class="cell-full"
                                    :spec="templateProcedureSpec.fields.tpphoto" :label="null"
                                    :required="templateProcedureEditableList.isTail(data.element)? false : undefined"
                                    v-model="data.element.tpphoto"
                                    @input="templateProcedureEditableList.update(data.element)"
                                    @input:error="errorsModel.set($event.setPath('1'))"/>
                    </template>
                    <template v-slot:tpsize="data">
                        <div class="cell-right">
                            {{data.element.tpsize}}
                        </div>
                    </template>
                    <template v-slot:action="data">
                        <router-link
                                v-if="['update', null].includes(templateProcedureEditableList.status(data.element))"
                                :to="{path: `/template-procedure-update/${data.element.tpid}`}">
                            进入
                        </router-link>
                    </template>
                </pac-table>
            </template>
        </pac-tab>
    </pac-form>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import {PacProgressModel} from "@/components/lib/pac-form/pac-form-model";
    import {PacErrorModel, PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import Common from "@/common";
    import {TEMPLATE_SPEC} from "@/components/gen/spec/TemplateSpec";
    import {Template} from "@/components/gen/bean/Template";
    import {TEMPLATEPROCEDURE_SPEC} from "@/components/gen/spec/TemplateProcedureSpec";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {TemplateProcedure} from "@/components/gen/bean/TemplateProcedure";
    import {EditableList} from "@/components/editable";
    import {getTemplate, updateTemplate} from "@/components/gen/stub/TemplateStub";
    import {FilterLogicExpr} from "@/components/gen/filter";
    import {OrderByExpr} from "@/components/gen/order";
    import {
        batchAddTemplateProcedure,
        batchDeleteTemplateProcedure,
        batchUpdateTemplateProcedure,
        queryTemplateProcedure
    } from "@/components/gen/stub/TemplateProcedureStub";
    import {parameters} from "@/components/gen/common";

    @Component({name: 'template-update'})
    export default class TemplateUpdate extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();
        tabs: Array<string> = ['基本信息', '规程列表'];
        selectedTab = 0;

        templateSpec = TEMPLATE_SPEC;
        @Prop({type: Number, required: true})
        initTtid!: number;
        ttid = this.initTtid;
        template = new Template();

        templateProcedureSpec = TEMPLATEPROCEDURE_SPEC;
        templateProcedureTableModel = new PacTableModel('multiple').appendField(
            new PacTableFieldModel(this.templateProcedureSpec.fields.tpseq.alias.toLowerCase(), this.templateProcedureSpec.fields.tpseq.description, 60, false, false),
            new PacTableFieldModel(this.templateProcedureSpec.fields.tpdescription.alias.toLowerCase(), this.templateProcedureSpec.fields.tpdescription.description, 960, false, false),
            new PacTableFieldModel(this.templateProcedureSpec.fields.tpphoto.alias.toLowerCase(), this.templateProcedureSpec.fields.tpphoto.description, 80, false, false),
            new PacTableFieldModel(this.templateProcedureSpec.fields.tpsize.alias.toLowerCase(), this.templateProcedureSpec.fields.tpsize.description, 80, false, false),
            new PacTableFieldModel('action', '指令', 60, false, false));
        templateProcedureCreate = (): TemplateProcedure => {
            const templateProcedure = new TemplateProcedure();
            templateProcedure.tpttid = this.ttid;
            return templateProcedure;
        };
        templateProcedureGetKey = (rawItem: TemplateProcedure): { tpid: number } => ({tpid: rawItem.tpid === null ? this.templateProcedureSpec.fields.tpid.min - 1 : rawItem.tpid});
        templateProcedureEditableList = new EditableList(this.templateProcedureCreate, this.templateProcedureGetKey, true);
        templateProcedureSelection = new Array<TemplateProcedure>();

        async created(): Promise<void> {
            await this.get();
            await this.queryTemplateProcedure();
            this.loading = false;
        }

        async get(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {template} = await getTemplate({ttid: this.ttid});
                this.template = template;
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
                const {template} = await updateTemplate(this.template);
                this.template = template;
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('update', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async queryTemplateProcedure(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {list} = await queryTemplateProcedure({
                    filter: new FilterLogicExpr().equalsNumber(this.templateProcedureSpec.fields.tpttid.alias.toLowerCase(), this.ttid),
                    orderBy: new OrderByExpr(this.templateProcedureSpec.fields.tpseq.alias.toLowerCase(), true).only(),
                    pageSize: 2 ** 10,
                    pageNumber: 1
                });
                this.$nextTick(() => this.templateProcedureEditableList.reset([]));
                this.$nextTick(() => this.templateProcedureEditableList.reset(list));
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('queryTemplateProcedure', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        delTemplateProcedure(): void {
            if (window.confirm(`是否删除${this.templateProcedureSelection.length}条记录？`)) {
                for (const item of this.templateProcedureSelection)
                    this.templateProcedureEditableList.delete(item);
                this.templateProcedureSelection = [];
            }
        }

        async saveTemplateProcedure(): Promise<void> {
            const progress = this.progressModel.start();
            //delete
            const deleteRequests = this.templateProcedureEditableList.deleteRequests;
            const deleteReturns = await batchDeleteTemplateProcedure(this.templateProcedureEditableList.deleteRequests.map(v => v.key));
            const deleteSuccess = deleteReturns.map(v => v.statusCode < 400);
            this.templateProcedureEditableList.afterDelete(deleteRequests, deleteSuccess);
            this.progressModel.stop(progress);
            //update
            const updateRequests = this.templateProcedureEditableList.updateRequests;
            const updateReturns = await batchUpdateTemplateProcedure(this.templateProcedureEditableList.updateRequests);
            const updateSuccesses = updateReturns.map(v => v.statusCode < 400);
            const updateResponses = updateReturns.map(v => v.templateProcedure);
            this.templateProcedureEditableList.afterUpdate(updateRequests, updateSuccesses, updateResponses);
            //add
            const addRequests = this.templateProcedureEditableList.addRequests;
            const addReturns = await batchAddTemplateProcedure(this.templateProcedureEditableList.addRequests);
            const addSuccesses = addReturns.map(v => v.statusCode < 400);
            const addResponses = addReturns.map(v => v.templateProcedure);
            this.templateProcedureEditableList.afterUpdate(addRequests, addSuccesses, addResponses);
            //raise error
            const addSuccessfulCount = addSuccesses.filter(v => v).length;
            const updateSuccessfulCount = updateSuccesses.filter(v => v).length;
            const deleteSuccessfulCount = deleteSuccess.filter(v => v).length;
            const addFailedCount = addSuccesses.filter(v => !v).length;
            const updateFailedCount = updateSuccesses.filter(v => !v).length;
            const deleteFailedCount = deleteSuccess.filter(v => !v).length;
            if (addSuccessfulCount + updateSuccessfulCount + deleteSuccessfulCount === 0 &&
                addFailedCount + updateFailedCount + deleteFailedCount == 1)
                this.errorsModel.set(new PacErrorObj('saveTemplateProcedure', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${[
                        ...addReturns.filter(v => v.statusCode >= 400).map(v => v.statusCode),
                        ...updateReturns.filter(v => v.statusCode >= 400).map(v => v.statusCode),
                        ...deleteReturns.filter(v => v.statusCode >= 400).map(v => v.statusCode)][0]}`
                }));
            else if (addFailedCount + updateFailedCount + deleteFailedCount > 0) {
                const content = new Array<string>();
                if (addSuccessfulCount > 0 || addFailedCount > 0)
                    content.push(`新增：${addSuccessfulCount}条成功，${addFailedCount}条失败`);
                if (updateSuccessfulCount > 0 || updateFailedCount > 0)
                    content.push(`修改：${updateSuccessfulCount}条成功，${updateFailedCount}条失败`);
                if (deleteSuccessfulCount > 0 || deleteFailedCount > 0)
                    content.push(`删除：${deleteSuccessfulCount}条成功，${deleteFailedCount}条失败`);
                this.errorsModel.set(new PacErrorObj('saveTemplateProcedure', {
                    subject: `保存结果：${addSuccessfulCount + updateSuccessfulCount + deleteSuccessfulCount}条成功，${addFailedCount + updateFailedCount + deleteFailedCount}条失败`,
                    content: content.join('；')
                }));
            } else
                this.errorsModel.set(new PacErrorObj('saveTemplateProcedure', null));
        }

        get url(): string {
            return `/${this.$route.name}${parameters(Object({
                ttid: this.ttid
            }))}`;
        }

        focusTab(error: PacErrorModel) {
            if (error.paths.length > 0)
                this.selectedTab = parseInt(error.paths[0]);
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep.cell-full {
        width: 100%;

        > input, select {
            width: 0;
            flex-grow: 1;
            flex-shrink: 1;
        }
    }

    .cell-right {
        width: 100%;
        height: fit-content;
        vertical-align: center;
        text-align: right;
    }
</style>