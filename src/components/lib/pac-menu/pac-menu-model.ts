let menuId = 0;

class PacMenuItemModel {
    id = menuId++;
    expanded = false;
    items: Array<PacMenuItemModel> = new Array<PacMenuItemModel>();

    constructor(public title = '',
                public target = '',
                public type = 0,
                public privilege: () => Promise<boolean> = async () => true) {
    }

    append(...items: Array<PacMenuItemModel>): PacMenuItemModel {
        this.items.push(...items);
        return this;
    }
}

export {
    PacMenuItemModel,
}