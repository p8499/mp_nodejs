type SelectType = 'none' | 'single' | 'multiple';

class PacTableFieldModel {
    constructor(
        public alias: string = '',
        public title: string = '',
        public width: number = 100,
        public sortable: boolean = true,
        public filterable: boolean = true) {
    }
}

class PacTableModel {
    constructor(
        public selectType: SelectType = 'none',
        public fields: Array<PacTableFieldModel> = new Array<PacTableFieldModel>()) {
    }

    appendField(...fields: Array<PacTableFieldModel>) {
        this.fields.push(...fields);
        return this;
    }
}

export {
    SelectType,
    PacTableFieldModel,
    PacTableModel
}