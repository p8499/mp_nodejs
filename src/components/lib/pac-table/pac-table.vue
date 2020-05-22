<template>
    <div class="pac-table" style="max-width: 100%; max-height: 100%;">
        <div>
            <div>
                <span v-if="contentRange.total > 0" :style="{display: paging? 'block' : 'none'}">
                    记录 {{contentRange.start + 1}} - {{contentRange.end + 1}} / {{contentRange.total}}
                </span>
                <span v-else :style="{display: paging? 'block' : 'none'}">
                    无记录
                </span>
                <img style="margin-left: 4px;" :style="{display: refreshable? 'block' : 'none'}"
                     src="" alt="" @click="$emit('refresh')"/>
            </div>
            <div :class="{'has-previous': contentRange.pageNumber(pageSize) > 1, 'has-next': contentRange.pageNumber(pageSize) < contentRange.pageMax(pageSize)}">
                <img :style="{display: paging? 'block' : 'none'}"
                     src="" alt="" @click="goto(1)"/>
                <img :style="{display: paging? 'block' : 'none'}"
                     src="" alt="" @click="goto(contentRange.pageNumber(pageSize)-1)"/>
                <input :style="{display: paging? 'block' : 'none'}"
                       :value="contentRange.pageNumber(pageSize)" @input="goto(parseInt($event.target.value))"/>
                <img :style="{display: paging? 'block' : 'none'}"
                     src="" alt="" @click="goto(contentRange.pageNumber(pageSize)+1)"/>
                <img :style="{display: paging? 'block' : 'none'}"
                     src="" alt="" @click="goto(contentRange.pageMax(pageSize))"/>
                <select style="margin-left: 4px;" :style="{display: paging? 'block' : 'none'}"
                        :value="pageSize" @input="size(parseInt($event.target.value))">
                    <option v-for="v in [50, 100, 200]" :key="v" :value="v">
                        {{v.toString()}}
                    </option>
                </select>
                <span style="margin-left: 4px;" :style="{display: paging? 'block' : 'none'}">
                    行 / 每页
                </span>
            </div>
        </div>
        <div ref="head-div">
            <table>
                <colgroup ref="head-colgroup">
                    <col width="26px"/>
                    <col v-for="(field, i) in model.fields" :key="i" :width="`${field.width}px`">
                </colgroup>
                <thead>
                <tr>
                    <th>
                        <div>
                            <input v-if="model.selectType === 'multiple'" style="margin: 1px 0 1px 1px;"
                                   type="checkbox" :checked="allSelected()"
                                   @input="$event.target.checked? select(...list) : deselect(...list)"/>
                        </div>
                    </th>
                    <th v-for="(field, i) in model.fields" :key="i">
                        <div>
                            <div :class="{
                                'asc': sortModel !== null && sortModel.prop === field.alias && sortModel.order === 'ascending',
                                'desc': sortModel !== null && sortModel.prop === field.alias && sortModel.order === 'descending',
                                'filtered': filtered(field.alias) && !filteredError(field.alias),
                                'filtered-error': filtered(field.alias) && filteredError(field.alias)}">
                                <div>{{field.title}}</div>
                                <img :style="{display: field.sortable? 'block' : 'none'}" src="" alt=""
                                     @click="sort(field.alias)"/>
                                <img :style="{display: field.filterable? 'block' : 'none'}" src="" alt=""
                                     @click="$set(filterShown, i, !filterShown[i])"/>
                                <pac-table-filter v-if="filterItemsModel !== null && filterShown[i]"
                                                  style="height: 100%;"
                                                  :value="filterItemsModel" :field="field.alias"
                                                  @close="$set(filterShown, i, false)"/>

                            </div>
                            <div @mousedown="startDrag($event, i + 1)"></div>
                        </div>
                    </th>
                </tr>
                </thead>
            </table>
        </div>
        <div ref="body-div" @scroll="scroll()">
            <table>
                <colgroup ref="body-colgroup">
                    <col width="26px"/>
                    <col v-for="(field, i) in model.fields" :key="i" :width="`${field.width}px`">
                </colgroup>
                <tbody>
                <tr v-for="(element, i) in list" :key="i"
                    :style="{display:hiddenList.includes(element)? 'none' : 'table-row'}">
                    <td>
                        <div>
                            <input v-if="model.selectType === 'single'"
                                   style="margin: 1px 0 1px 1px;" type="radio"
                                   :checked="selection.findIndex(v => compare(v, element)) > -1"
                                   @input="$emit('input:selection', $event.target.checked? [element] : [])"/>
                            <input v-if="model.selectType === 'multiple'"
                                   style="margin: 1px 0 1px 1px;" type="checkbox"
                                   :checked="selection.findIndex(v => compare(v, element)) > -1"
                                   @input="$event.target.checked? select(element) : deselect(element)"/>
                        </div>
                    </td>
                    <td v-for="(field, j) in model.fields" :key="j">
                        <div>
                            <slot :name="field.alias" :element="element"/>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {ContentRange} from "@/components/gen/range";
    import {PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {ResizeObserver} from "@juggle/resize-observer";

    @Component({name: 'pac-table'})
    export default class PacTable<T> extends Vue {
        @Prop({
            validator: (value): boolean => value instanceof PacTableModel,
            required: false,
            default: () => new PacTableModel()
        })
        model!: PacTableModel;

        @Prop({type: Number, required: false, default: 50})
        pageSize!: number;

        //有任一列filterable时，必须传入，否则无效，不会以emit形式传出，只会直接update
        @Prop({
            validator: (value) => value instanceof FilterItemsModel || value === null,
            required: false, default: null
        })
        filterItemsModel!: FilterItemsModel | null;

        //有任一列sortable时，必须传入，否则无效，以emit形式传出
        @Prop({
            validator: (value) => value instanceof Object || value === null,
            required: false, default: null
        })
        sortModel!: SortModel | null;

        @Prop({
            validator: (value): boolean => value instanceof ContentRange,
            required: false,
            default: () => new ContentRange()
        })
        contentRange!: ContentRange;

        @Prop({type: Array, required: false, default: () => []})
        list!: Array<T>;

        @Prop({type: Array, required: false, default: () => []})
        selection!: Array<T>;

        @Prop({type: Function, required: false, default: (e1: T, e2: T): boolean => e1 === e2})
        compare!: (e1: T, e2: T) => boolean;

        @Prop({type: Boolean, required: false, default: true})
        paging!: boolean;

        @Prop({type: Boolean, required: false, default: true})
        refreshable!: boolean;

        @Prop({type: Array, required: false, default: () => []})
        hiddenList!: Array<T>;

        filterShown: Array<boolean> = this.model.fields.map(() => false);

        //table参数控制函数
        @Watch('filterItemsModel.indexedElements')
        filter() {
            if (this.filterItemsModel !== null && this.filterItemsModel.isCompleted)
                this.$emit('refresh');
        }

        //table参数控制函数
        sort(alias: string): void {
            const reverse = (order: string) => order === 'ascending' ? 'descending' : 'ascending';
            if (this.sortModel !== null && this.sortModel.prop === alias)
                this.$emit('input:sortModel', new SortModel(alias, reverse(this.sortModel.order)));
            else
                this.$emit('input:sortModel', new SortModel(alias, 'ascending'));
            this.$emit('refresh');
        }

        //table参数控制函数
        goto(page: number) {
            if (page >= 1 && page <= this.contentRange.pageMax(this.pageSize)) {
                this.$emit('input:pageNumber', page);
                this.$emit('refresh');
            }
        }

        //table参数控制函数
        size(n: number) {
            this.$emit('input:pageSize', n);
            this.$emit('refresh');
        }

        //selection辅助函数
        allSelected(): boolean {
            return this.list.every(v1 => this.selection.findIndex(v2 => this.compare(v2, v1)) > -1);
        }

        //selection辅助函数
        select(...elements: Array<T>) {
            /*挑选那些不在selection中的*/
            const newElements = elements.filter(v1 => this.selection.findIndex(v2 => this.compare(v2, v1)) === -1);
            this.$emit('input:selection', [...this.selection, ...newElements]);
        }

        //selection辅助函数
        deselect(...elements: Array<T>) {
            const selection = [...this.selection];
            for (const element of elements) {
                const index = selection.findIndex(v => this.compare(v, element));
                if (index > -1)
                    selection.splice(index, 1);
            }
            this.$emit('input:selection', selection);
        }

        //style辅助函数
        filtered(alias: string): boolean {
            return this.filterItemsModel !== null && this.filterItemsModel.indexedElements.findIndex(v => v.item.operand1 === alias) > -1;
        }

        //style辅助函数
        filteredError(alias: string): boolean {
            //本列的itemModels
            const itemModels = this.filterItemsModel !== null ? this.filterItemsModel.indexedElements.filter(v => v.item.operand1 === alias) : [];
            return !itemModels.every(v => v.item.isCompleted);
        }

        resizeObserver = new ResizeObserver(() => this.resize());

        mounted() {
            this.resize();
            this.resizeObserver.observe(this.$refs['body-div'] as HTMLElement);
        }

        destroyed() {
            this.resizeObserver.disconnect();
        }

        resize() {
            const headDiv = this.$refs['head-div'] as HTMLElement;
            const bodyDiv = this.$refs['body-div'] as HTMLElement;
            //自动隐藏滚动条
            bodyDiv.style.overflowX = bodyDiv.scrollWidth === bodyDiv.clientWidth ? 'hidden' : 'auto';
            bodyDiv.style.overflowY = bodyDiv.scrollHeight === bodyDiv.clientHeight ? 'hidden' : 'auto';
            //头div的宽度=体div的宽度-滚动条
            headDiv.style.width = `${bodyDiv.clientWidth}px`;
        }

        scroll() {
            const headDiv = this.$refs['head-div'] as HTMLElement;
            const bodyDiv = this.$refs['body-div'] as HTMLElement;
            //同步h-scroll
            headDiv.scrollTo(bodyDiv.scrollLeft, 0);
        }

        dragCol: number | undefined = undefined;
        dragStartClientX: number | undefined = undefined;
        dragStartWidth: number | undefined = undefined;

        startDrag(event: MouseEvent, dragCol: number) {
            const headColgroup = this.$refs['head-colgroup'] as HTMLElement;
            this.dragCol = dragCol;
            this.dragStartClientX = event.clientX;
            const widthStr = (headColgroup.children[dragCol] as HTMLTableColElement).width;
            this.dragStartWidth = parseFloat(widthStr.substr(0, widthStr.length - 2));//if you use %, = th.width
            window.addEventListener('mousemove', this.drag);
            window.addEventListener('mouseup', this.stopDrag);
        }

        drag(event: MouseEvent) {
            const headColgroup = this.$refs['head-colgroup'] as HTMLElement;
            const bodyColgroup = this.$refs['body-colgroup'] as HTMLElement;
            if (this.dragCol !== undefined && this.dragStartClientX !== undefined && this.dragStartWidth !== undefined) {
                let targetWidth = this.dragStartWidth + event.clientX - this.dragStartClientX;
                targetWidth = targetWidth > 6 ? targetWidth : 6;//避免拖动把柄被隐藏
                (headColgroup.children[this.dragCol] as HTMLTableColElement).width = `${targetWidth}px`;
                (bodyColgroup.children[this.dragCol] as HTMLTableColElement).width = `${targetWidth}px`;
            }
        }

        stopDrag() {
            this.dragStartClientX = undefined;
            this.dragStartWidth = undefined;
            window.removeEventListener('mousemove', this.drag);
        }
    }
</script>

<style lang="scss">
    @import "pac-table";
</style>