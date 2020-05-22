import {Bean} from "@/components/gen/bean";

type Status = 'add' | 'discard' | 'update' | 'delete' | 'deleted' | null;

class Editable<B> {
    constructor(public rawItem: B, public status: Status = null) {
    }

    update(): void {
        if (this.status === null)
            this.status = 'update';
    }

    delete(): void {
        if (this.status === 'update' || this.status === null)
            this.status = 'delete';
        else if (this.status === 'add')
            this.status = 'discard';
    }

    afterAdd(successful: boolean, added?: B): void {
        if (successful) {
            this.status = null;
            if (added !== undefined)
                this.rawItem = added;
        }
    }

    afterUpdate(successful: boolean, updated?: B): void {
        if (successful) {
            this.status = null;
            if (updated !== undefined)
                this.rawItem = updated;
        }
    }

    afterDelete(successful: boolean): void {
        if (successful)
            this.status = 'deleted';
        else
            this.status = null;
    }
}

class EditableList<B extends Bean, K> {
    private editables: Array<Editable<B>> = new Array<Editable<B>>();

    constructor(public rawConstructor: () => B, public getKey: (rawItem: B) => K, public allowAdd: boolean) {
    }

    reset(rawItems: Array<B>): void {
        this.editables = rawItems.map(v => new Editable(v, null));
    }


    get rawItems(): Array<B> {
        return this.allowAdd ? [...this.editables.map(v => v.rawItem), this.rawConstructor()] : [...this.editables.map(v => v.rawItem)];
    }

    get hiddenItems(): Array<B> {
        return this.editables.filter(v =>
            v.status === 'discard' ||
            v.status === 'delete' ||
            v.status === 'deleted').map(v => v.rawItem);
    }

    isTail(rawItem: B): boolean {
        return this.editables.findIndex(v => v.rawItem === rawItem) === -1;
    }

    status(rawItem: B): Status | undefined {
        return this.editables.find(v => v.rawItem === rawItem)?.status;
    }

    add(rawItem: B): void {
        this.editables.push(new Editable<B>(rawItem, 'add'));
    }

    update(rawItem: B): void {
        const found = this.editables.find(v => v.rawItem === rawItem);
        if (found !== undefined)
            found.update();
        else if (!rawItem.equals(this.rawConstructor()))
            this.add(rawItem);
    }

    delete(rawItem: B): void {
        this.editables.find(v => v.rawItem === rawItem)?.delete();
    }

    afterAdd(requests: Array<B>, successes: Array<boolean>, response: Array<B>) {
        for (let i = 0; i < requests.length; i++)
            this.editables.find(v => v.rawItem === requests[i])?.afterAdd(successes[i], response[i]);
    }

    afterUpdate(requests: Array<B>, successes: Array<boolean>, response: Array<B>) {
        for (let i = 0; i < requests.length; i++)
            this.editables.find(v => v.rawItem === requests[i])?.afterUpdate(successes[i], response[i]);
    }

    afterDelete(requests: Array<{ rawItem: B; key: K }>, successes: Array<boolean>) {
        for (let i = 0; i < requests.length; i++)
            this.editables.find(v => v.rawItem === requests[i].rawItem)?.afterDelete(successes[i]);
    }

    get addRequests(): Array<B> {
        return this.editables.filter(v => v.status === 'add').map(v => v.rawItem);
    }

    get updateRequests(): Array<B> {
        return this.editables.filter(v => v.status === 'update').map(v => v.rawItem);
    }

    get deleteRequests(): Array<{ rawItem: B; key: K }> {
        return this.editables.filter(v => v.status === 'delete').map(v => ({
            rawItem: v.rawItem,
            key: this.getKey(v.rawItem)
        }));
    }
}

export {
    Status,
    Editable,
    EditableList,
}