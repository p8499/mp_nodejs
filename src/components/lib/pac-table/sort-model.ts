import {OrderByExpr} from "@/components/gen/order";

class SortModel {
    constructor(public prop: string, public order: 'ascending' | 'descending') {
    }

    get expr(): OrderByExpr {
        return new OrderByExpr(this.prop, this.order === 'ascending');
    }
}

function orderByExprToModel(expr: OrderByExpr): SortModel {
    return new SortModel(expr.field, expr.asc ? 'ascending' : 'descending');
}

export {
    SortModel,
    orderByExprToModel
}