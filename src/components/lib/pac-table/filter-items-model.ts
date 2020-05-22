import {filterExprToItemModel, FilterItemModel} from "./filter-item-model";
import {FilterLogicExpr, OP_AND} from "../../gen/filter";
import {BeanSpec} from "../../gen/spec";
import {Vue} from "vue-property-decorator";

class FilterItemsModel {
    public indexedElements: Array<{ id: number; item: FilterItemModel }>;

    constructor(public spec: BeanSpec, ...items: Array<FilterItemModel>) {
        this.indexedElements = items.map((value, index) => {
            return {id: index, item: value};
        });
    }

    add(item: FilterItemModel = new FilterItemModel(this.spec)): FilterItemsModel {
        this.indexedElements.push({
            id: this.indexedElements.length == 0 ? 0 : this.indexedElements[this.indexedElements.length - 1].id + 1,
            item: item
        });
        return this;
    }

    set(id: number, item: FilterItemModel): FilterItemsModel {
        const index = this.indexedElements.findIndex(v => v.id === id);
        if (index !== -1)
            Vue.set(this.indexedElements, index, {id, item});
        return this;
    }

    remove(id: number): FilterItemsModel {
        const index = this.indexedElements.findIndex(v => v.id === id);
        if (index > -1)
            this.indexedElements.splice(index, 1);
        return this;
    }

    get isEmpty(): boolean {
        return this.indexedElements.length === 0;
    }

    get isCompleted(): boolean {
        return this.indexedElements.every((value) => value.item.isCompleted);
    }

    get expr(): FilterLogicExpr | undefined {
        return !this.isEmpty && this.isCompleted ? new FilterLogicExpr(OP_AND).append(...this.indexedElements.map((value) => value.item.expr!)) : undefined;
    }
}

function filterExprToItemsModel(expr: FilterLogicExpr, spec: BeanSpec): FilterItemsModel {
    return expr.op === OP_AND ? new FilterItemsModel(spec, ...expr.data.map((value) => filterExprToItemModel(value, spec))) : new FilterItemsModel(spec);
}

export {
    FilterItemsModel,
    filterExprToItemsModel
}