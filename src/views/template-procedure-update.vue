<template>
    <pac-form name="模板规程修改" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-tab style="width: 100%;" :tabs="tabs"
                 :selectedTab="selectedTab" @input:selectedTab="selectedTab = $event">
            <template v-slot:0>
                <pac-input :spec="templateProcedureSpec.fields.tpseq"
                           v-model="templateProcedure.tpseq" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-textarea style="margin-top: 14px"
                              :spec="templateProcedureSpec.fields.tpdescription"
                              v-model="templateProcedure.tpdescription"
                              @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-select style="margin-top: 14px"
                            :spec="templateProcedureSpec.fields.tpphoto"
                            v-model="templateProcedure.tpphoto" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-button style="margin-top: 14px;"
                            text="更改" @input="update()"/>
            </template>
            <template v-slot:1>
                <div>
                    <pac-button text="保存" @input="saveTemplateMeasurement()"/>
                    <pac-button style="margin-left: 8px;"
                                text="删除" @input="delTemplateMeasurement()"
                                v-if="templateMeasurementSelection.length > 0"/>
                </div>
                <pac-table style="margin-top: 14px; max-width: 100%; max-height: 480px;"
                           :model="templateMeasurementTableModel" :paging="false"
                           :list="templateMeasurementEditableList.rawItems"
                           :selection="templateMeasurementSelection"
                           @input:selection="templateMeasurementSelection = $event"
                           :refreshable="true" @refresh="queryEtidValues()"
                           :hiddenList="templateMeasurementEditableList.hiddenItems">
                    <template v-slot:tsseq="data">
                        <pac-input class="cell-full"
                                   :spec="templateMeasurementSpec.fields.tsseq" :label="null"
                                   :required="templateMeasurementEditableList.isTail(data.element)? false : undefined"
                                   v-model="data.element.tsseq"
                                   @input="templateMeasurementEditableList.update(data.element)"
                                   @input:error="errorsModel.set($event.setPath('1'))"/>
                    </template>
                    <template v-slot:tsname="data">
                        <pac-input class="cell-full"
                                   :spec="templateMeasurementSpec.fields.tsname" :label="null"
                                   :required="templateMeasurementEditableList.isTail(data.element)? false : undefined"
                                   v-model="data.element.tsname"
                                   @input="templateMeasurementEditableList.update(data.element)"
                                   @input:error="errorsModel.set($event.setPath('1'))"/>
                    </template>
                    <template v-slot:tsetid="data">
                        <pac-select-string class="cell-full"
                                           :label="null" :required="false" :disabled="false"
                                           v-model="data.element.tsetid" :values="() => etidValues"
                                           @input="templateMeasurementEditableList.update(data.element)"
                                           @input:error="errorsModel.set($event.setPath('1'))"/>
                    </template>
                    <template v-slot:tsmin="data">
                        <pac-input class="cell-full" v-if="data.element.tsetid === null"
                                   :spec="templateMeasurementSpec.fields.tsmin" :label="null"
                                   :required="templateMeasurementEditableList.isTail(data.element)? false : undefined"
                                   v-model="data.element.tsmin"
                                   @input="templateMeasurementEditableList.update(data.element)"
                                   @input:error="errorsModel.set($event.setPath('1'))"/>
                        <pac-select-number v-else class="cell-full"
                                           :label="null" :required="false" :disabled="false"
                                           v-model="data.element.tsmin"
                                           :values="async () => queryMinMaxValues(data.element.tsetid)"
                                           @input="templateMeasurementEditableList.update(data.element)"
                                           @input:error="errorsModel.set($event.setPath('1'))"/>
                    </template>
                    <template v-slot:tsmax="data">
                        <pac-input v-if="data.element.tsetid === null" class="cell-full"
                                   :spec="templateMeasurementSpec.fields.tsmax" :label="null"
                                   :required="templateMeasurementEditableList.isTail(data.element)? false : undefined"
                                   v-model="data.element.tsmax"
                                   @input="templateMeasurementEditableList.update(data.element)"
                                   @input:error="errorsModel.set($event.setPath('1'))"/>
                        <pac-select-number v-else class="cell-full"
                                           :label="null" :required="false" :disabled="false"
                                           v-model="data.element.tsmax"
                                           :values="async () => queryMinMaxValues(data.element.tsetid)"
                                           @input="templateMeasurementEditableList.update(data.element)"
                                           @input:error="errorsModel.set($event.setPath('1'))"/>
                    </template>
                    <template v-slot:tsunit="data">
                        <pac-input class="cell-full" v-if="data.element.tsetid === null"
                                   :spec="templateMeasurementSpec.fields.tsunit" :label="null"
                                   :required="templateMeasurementEditableList.isTail(data.element)? false : undefined"
                                   v-model="data.element.tsunit"
                                   @input="templateMeasurementEditableList.update(data.element)"
                                   @input:error="errorsModel.set($event.setPath('1'))"/>
                    </template>
                    <template v-slot:tsphoto="data">
                        <pac-select class="cell-full"
                                    :spec="templateMeasurementSpec.fields.tsphoto" :label="null"
                                    :required="templateMeasurementEditableList.isTail(data.element)? false : undefined"
                                    v-model="data.element.tsphoto"
                                    @input="templateMeasurementEditableList.update(data.element)"
                                    @input:error="errorsModel.set($event.setPath('1'))"/>
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
    import {TEMPLATEMEASUREMENT_SPEC} from "@/components/gen/spec/TemplateMeasurementSpec";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {TemplateMeasurement} from "@/components/gen/bean/TemplateMeasurement";
    import {EditableList} from "@/components/editable";
    import {
        batchAddTemplateMeasurement,
        batchDeleteTemplateMeasurement,
        batchUpdateTemplateMeasurement,
        queryTemplateMeasurement
    } from "@/components/gen/stub/TemplateMeasurementStub";
    import {FilterLogicExpr} from "@/components/gen/filter";
    import {OrderByExpr} from "@/components/gen/order";
    import {parameters} from "@/components/gen/common";
    import {TEMPLATEPROCEDURE_SPEC} from "@/components/gen/spec/TemplateProcedureSpec";
    import {TemplateProcedure} from "@/components/gen/bean/TemplateProcedure";
    import {getTemplateProcedure, updateTemplateProcedure} from "@/components/gen/stub/TemplateProcedureStub";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";
    import {queryEnumType} from "@/components/gen/stub/EnumTypeStub";
    import {queryEnumTypeValue} from "@/components/gen/stub/EnumTypeValueStub";
    import {ENUMTYPEVALUE_SPEC} from "@/components/gen/spec/EnumTypeValueSpec";

    @Component({name: 'template-procedure-update'})
    export default class TemplateMeasurementUpdate extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();
        tabs: Array<string> = ['基本信息', '测量列表'];
        selectedTab = 0;

        templateProcedureSpec = TEMPLATEPROCEDURE_SPEC;
        @Prop({type: Number, required: true})
        initTpid!: number;
        tpid = this.initTpid;
        templateProcedure = new TemplateProcedure();

        templateMeasurementSpec = TEMPLATEMEASUREMENT_SPEC;
        templateMeasurementTableModel = new PacTableModel('multiple').appendField(
            new PacTableFieldModel(this.templateMeasurementSpec.fields.tsseq.alias.toLowerCase(), this.templateMeasurementSpec.fields.tsseq.description, 60, false, false),
            new PacTableFieldModel(this.templateMeasurementSpec.fields.tsname.alias.toLowerCase(), this.templateMeasurementSpec.fields.tsname.description, 200, false, false),
            new PacTableFieldModel(this.templateMeasurementSpec.fields.tsetid.alias.toLowerCase(), this.templateMeasurementSpec.fields.tsetid.description, 100, false, false),
            new PacTableFieldModel(this.templateMeasurementSpec.fields.tsmin.alias.toLowerCase(), this.templateMeasurementSpec.fields.tsmin.description, 120, false, false),
            new PacTableFieldModel(this.templateMeasurementSpec.fields.tsmax.alias.toLowerCase(), this.templateMeasurementSpec.fields.tsmax.description, 120, false, false),
            new PacTableFieldModel(this.templateMeasurementSpec.fields.tsunit.alias.toLowerCase(), this.templateMeasurementSpec.fields.tsunit.description, 80, false, false),
            new PacTableFieldModel(this.templateMeasurementSpec.fields.tsphoto.alias.toLowerCase(), this.templateMeasurementSpec.fields.tsphoto.description, 80, false, false));
        templateMeasurementCreate = (): TemplateMeasurement => {
            const templateMeasurement = new TemplateMeasurement();
            templateMeasurement.tstpid = this.tpid;
            return templateMeasurement;
        };
        templateMeasurementGetKey = (rawItem: TemplateMeasurement): { tsid: number } => ({tsid: rawItem.tsid === null ? this.templateMeasurementSpec.fields.tsid.min - 1 : rawItem.tsid});
        templateMeasurementEditableList = new EditableList(this.templateMeasurementCreate, this.templateMeasurementGetKey, true);
        templateMeasurementSelection = new Array<TemplateMeasurement>();
        etidValues = new Array<PacValueModel>();

        async created(): Promise<void> {
            await this.get();
            await this.queryTemplateMeasurement();
            await this.queryEtidValues();
            this.loading = false;
        }

        async get(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {templateProcedure} = await getTemplateProcedure({tpid: this.tpid});
                this.templateProcedure = templateProcedure;
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
                const {templateProcedure} = await updateTemplateProcedure(this.templateProcedure);
                this.templateProcedure = templateProcedure;
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('update', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async queryTemplateMeasurement(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {list} = await queryTemplateMeasurement({
                    filter: new FilterLogicExpr().equalsNumber(this.templateMeasurementSpec.fields.tstpid.alias.toLowerCase(), this.tpid),
                    orderBy: new OrderByExpr(this.templateMeasurementSpec.fields.tsseq.alias.toLowerCase(), true).only(),
                    pageSize: 2 ** 10,
                    pageNumber: 1
                });
                this.$nextTick(() => this.templateMeasurementEditableList.reset([]));
                this.$nextTick(() => this.templateMeasurementEditableList.reset(list));
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('queryEtidValues', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async queryEtidValues(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {list} = await queryEnumType({
                    pageSize: 2 ** 10,
                    pageNumber: 1
                });
                this.etidValues = list.map(v => new PacValueModel(v.etid === null ? '' : v.etid, v.etname === null ? '' : v.etname));
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('queryEnumType', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));

            } finally {
                this.progressModel.stop(progress);
            }
        }

        async queryMinMaxValues(etid: string): Promise<Array<PacValueModel>> {
            const progress = this.progressModel.start();
            try {
                const {list} = await queryEnumTypeValue({
                    filter: new FilterLogicExpr().equalsString(ENUMTYPEVALUE_SPEC.fields.evetid.alias.toLowerCase(), etid),
                    orderBy: new OrderByExpr(ENUMTYPEVALUE_SPEC.fields.evval.alias.toLowerCase(), true).only(),
                    pageSize: 2 ** 10,
                    pageNumber: 1
                });
                return list.map(v => new PacValueModel(v.evval === null ? '' : v.evval.toString(), v.evdescription === null ? '' : v.evdescription));
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('queryMinMaxValues', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
                return [];
            } finally {
                this.progressModel.stop(progress);
            }
        }

        delTemplateMeasurement(): void {
            if (window.confirm(`是否删除${this.templateMeasurementSelection.length}条记录？`)) {
                for (const item of this.templateMeasurementSelection)
                    this.templateMeasurementEditableList.delete(item);
                this.templateMeasurementSelection = [];
            }
        }

        async saveTemplateMeasurement(): Promise<void> {
            const progress = this.progressModel.start();
            //delete
            const deleteRequests = this.templateMeasurementEditableList.deleteRequests;
            const deleteReturns = await batchDeleteTemplateMeasurement(this.templateMeasurementEditableList.deleteRequests.map(v => v.key));
            const deleteSuccess = deleteReturns.map(v => v.statusCode < 400);
            this.templateMeasurementEditableList.afterDelete(deleteRequests, deleteSuccess);
            this.progressModel.stop(progress);
            //update
            const updateRequests = this.templateMeasurementEditableList.updateRequests;
            const updateReturns = await batchUpdateTemplateMeasurement(this.templateMeasurementEditableList.updateRequests);
            const updateSuccesses = updateReturns.map(v => v.statusCode < 400);
            const updateResponses = updateReturns.map(v => v.templateMeasurement);
            this.templateMeasurementEditableList.afterUpdate(updateRequests, updateSuccesses, updateResponses);
            //add
            const addRequests = this.templateMeasurementEditableList.addRequests;
            const addReturns = await batchAddTemplateMeasurement(this.templateMeasurementEditableList.addRequests);
            const addSuccesses = addReturns.map(v => v.statusCode < 400);
            const addResponses = addReturns.map(v => v.templateMeasurement);
            this.templateMeasurementEditableList.afterUpdate(addRequests, addSuccesses, addResponses);
            //raise error
            const addSuccessfulCount = addSuccesses.filter(v => v).length;
            const updateSuccessfulCount = updateSuccesses.filter(v => v).length;
            const deleteSuccessfulCount = deleteSuccess.filter(v => v).length;
            const addFailedCount = addSuccesses.filter(v => !v).length;
            const updateFailedCount = updateSuccesses.filter(v => !v).length;
            const deleteFailedCount = deleteSuccess.filter(v => !v).length;
            if (addSuccessfulCount + updateSuccessfulCount + deleteSuccessfulCount === 0 &&
                addFailedCount + updateFailedCount + deleteFailedCount == 1)
                this.errorsModel.set(new PacErrorObj('saveTemplateMeasurement', {
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
                this.errorsModel.set(new PacErrorObj('saveTemplateMeasurement', {
                    subject: `保存结果：${addSuccessfulCount + updateSuccessfulCount + deleteSuccessfulCount}条成功，${addFailedCount + updateFailedCount + deleteFailedCount}条失败`,
                    content: content.join('；')
                }));
            } else
                this.errorsModel.set(new PacErrorObj('saveTemplateMeasurement', null));
        }

        get url(): string {
            return `/${this.$route.name}${parameters(Object({
                tpid: this.tpid
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
</style>