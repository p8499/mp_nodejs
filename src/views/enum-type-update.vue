<template>
    <pac-form name="枚举类型修改" :url="url" :loading="loading" :progressModel="progressModel">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event, focusTab)"/>
        <pac-tab style="width: 100%;" :tabs="tabs"
                 :selectedTab="selectedTab" @input:selectedTab="selectedTab = $event">
            <template v-slot:0>
                <pac-input :spec="enumTypeSpec.fields.etid" :disabled="true"
                           v-model="enumType.etid" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-input style="margin-top: 14px"
                           :spec="enumTypeSpec.fields.etname"
                           v-model="enumType.etname" @input:error="errorsModel.set($event.setPath('0'))"/>
                <pac-button style="margin-top: 14px;"
                            text="更改" @input="update()"/>
            </template>
            <template v-slot:1>
                <div>
                    <pac-button text="保存" @input="saveEnumTypeValue()"/>
                    <pac-button style="margin-left: 8px;"
                                text="删除" @input="delEnumTypeValue()"
                                v-if="enumTypeValueSelection.length > 0"/>
                </div>
                <pac-table style="margin-top: 14px; max-width: 100%; max-height: 480px;"
                           :model="enumTypeValueTableModel" :paging="false"
                           :list="enumTypeValueEditableList.rawItems"
                           :selection="enumTypeValueSelection" @input:selection="enumTypeValueSelection = $event"
                           :refreshable="true" @refresh="queryEnumTypeValue()"
                           :hiddenList="enumTypeValueEditableList.hiddenItems">
                    <template v-slot:evval="data">
                        <pac-input class="cell-full"
                                   :spec="enumTypeValueSpec.fields.evval" :label="null"
                                   :required="enumTypeValueEditableList.isTail(data.element)? false : undefined"
                                   v-model="data.element.evval"
                                   @input="enumTypeValueEditableList.update(data.element)"
                                   @input:error="errorsModel.set($event.setPath('1'))"/>
                    </template>
                    <template v-slot:evdescription="data">
                        <pac-input class="cell-full"
                                   :spec="enumTypeValueSpec.fields.evdescription" :label="null"
                                   :required="enumTypeValueEditableList.isTail(data.element)? false : undefined"
                                   v-model="data.element.evdescription"
                                   @input="enumTypeValueEditableList.update(data.element)"
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
    import {ENUMTYPE_SPEC} from "@/components/gen/spec/EnumTypeSpec";
    import {EnumType} from "@/components/gen/bean/EnumType";
    import {ENUMTYPEVALUE_SPEC} from "@/components/gen/spec/EnumTypeValueSpec";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {EnumTypeValue} from "@/components/gen/bean/EnumTypeValue";
    import {getEnumType, updateEnumType} from "@/components/gen/stub/EnumTypeStub";
    import {
        batchAddEnumTypeValue,
        batchDeleteEnumTypeValue,
        batchUpdateEnumTypeValue,
        queryEnumTypeValue
    } from '@/components/gen/stub/EnumTypeValueStub';
    import {FilterLogicExpr} from "@/components/gen/filter";
    import {OrderByExpr} from "@/components/gen/order";
    import {parameters} from "@/components/gen/common";
    import {EditableList} from "@/components/editable";

    @Component({name: 'enum-type-update'})
    export default class EnumTypeUpdate extends Common {
        loading = true;
        progressModel = new PacProgressModel();
        errorsModel = new PacErrorsModel();
        tabs: Array<string> = ['基本信息', '值列表'];
        selectedTab = 0;

        enumTypeSpec = ENUMTYPE_SPEC;
        @Prop({type: String, required: true})
        initEtid!: string;
        etid = this.initEtid;
        enumType = new EnumType();

        enumTypeValueSpec = ENUMTYPEVALUE_SPEC;
        enumTypeValueTableModel = new PacTableModel('multiple').appendField(
            new PacTableFieldModel(this.enumTypeValueSpec.fields.evval.alias.toLowerCase(), this.enumTypeValueSpec.fields.evval.description, 120, false, false),
            new PacTableFieldModel(this.enumTypeValueSpec.fields.evdescription.alias.toLowerCase(), this.enumTypeValueSpec.fields.evdescription.description, 200, false, false));
        enumTypeValueCreate = (): EnumTypeValue => {
            const enumTypeValue = new EnumTypeValue();
            enumTypeValue.evetid = this.etid;
            return enumTypeValue;
        };
        enumTypeValueGetKey = (rawItem: EnumTypeValue): { evid: number } => ({evid: rawItem.evid === null ? this.enumTypeValueSpec.fields.evid.min - 1 : rawItem.evid});
        enumTypeValueEditableList = new EditableList(this.enumTypeValueCreate, this.enumTypeValueGetKey, true);
        enumTypeValueSelection = new Array<EnumTypeValue>();

        async created(): Promise<void> {
            await this.get();
            await this.queryEnumTypeValue();
            this.loading = false;
        }

        async get(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {enumType} = await getEnumType({etid: this.etid});
                this.enumType = enumType;
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
                const {enumType} = await updateEnumType(this.enumType);
                this.enumType = enumType;
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('update', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        async queryEnumTypeValue(): Promise<void> {
            const progress = this.progressModel.start();
            try {
                const {list} = await queryEnumTypeValue({
                    filter: new FilterLogicExpr().equalsString(this.enumTypeValueSpec.fields.evetid.alias.toLowerCase(), this.etid),
                    orderBy: new OrderByExpr(this.enumTypeValueSpec.fields.evval.alias.toLowerCase(), true).only(),
                    pageSize: 2 ** 10,
                    pageNumber: 1
                });
                this.$nextTick(() => this.enumTypeValueEditableList.reset([]));
                this.$nextTick(() => this.enumTypeValueEditableList.reset(list));
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('queryEnumTypeValue', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            } finally {
                this.progressModel.stop(progress);
            }
        }

        delEnumTypeValue(): void {
            if (window.confirm(`是否删除${this.enumTypeValueSelection.length}条记录？`)) {
                for (const item of this.enumTypeValueSelection)
                    this.enumTypeValueEditableList.delete(item);
                this.enumTypeValueSelection = [];
            }
        }

        async saveEnumTypeValue(): Promise<void> {
            const progress = this.progressModel.start();
            //delete
            const deleteRequests = this.enumTypeValueEditableList.deleteRequests;
            const deleteReturns = await batchDeleteEnumTypeValue(this.enumTypeValueEditableList.deleteRequests.map(v => v.key));
            const deleteSuccess = deleteReturns.map(v => v.statusCode < 400);
            this.enumTypeValueEditableList.afterDelete(deleteRequests, deleteSuccess);
            this.progressModel.stop(progress);
            //update
            const updateRequests = this.enumTypeValueEditableList.updateRequests;
            const updateReturns = await batchUpdateEnumTypeValue(this.enumTypeValueEditableList.updateRequests);
            const updateSuccesses = updateReturns.map(v => v.statusCode < 400);
            const updateResponses = updateReturns.map(v => v.enumTypeValue);
            this.enumTypeValueEditableList.afterUpdate(updateRequests, updateSuccesses, updateResponses);
            //add
            const addRequests = this.enumTypeValueEditableList.addRequests;
            const addReturns = await batchAddEnumTypeValue(this.enumTypeValueEditableList.addRequests);
            const addSuccesses = addReturns.map(v => v.statusCode < 400);
            const addResponses = addReturns.map(v => v.enumTypeValue);
            this.enumTypeValueEditableList.afterUpdate(addRequests, addSuccesses, addResponses);
            //raise error
            const addSuccessfulCount = addSuccesses.filter(v => v).length;
            const updateSuccessfulCount = updateSuccesses.filter(v => v).length;
            const deleteSuccessfulCount = deleteSuccess.filter(v => v).length;
            const addFailedCount = addSuccesses.filter(v => !v).length;
            const updateFailedCount = updateSuccesses.filter(v => !v).length;
            const deleteFailedCount = deleteSuccess.filter(v => !v).length;
            if (addSuccessfulCount + updateSuccessfulCount + deleteSuccessfulCount === 0 &&
                addFailedCount + updateFailedCount + deleteFailedCount == 1)
                this.errorsModel.set(new PacErrorObj('saveEnumTypeValue', {
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
                this.errorsModel.set(new PacErrorObj('saveEnumTypeValue', {
                    subject: `保存结果：${addSuccessfulCount + updateSuccessfulCount + deleteSuccessfulCount}条成功，${addFailedCount + updateFailedCount + deleteFailedCount}条失败`,
                    content: content.join('；')
                }));
            } else
                this.errorsModel.set(new PacErrorObj('saveEnumTypeValue', null));
        }

        get url(): string {
            return `/${this.$route.name}${parameters(Object({
                etid: this.etid
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
