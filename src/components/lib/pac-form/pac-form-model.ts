let _nextInt = 0;

function nextInt(): number {
    return _nextInt++;
}

class PacProgressModel {
    items: Array<number> = new Array<number>();

    start(): number {
        const id = nextInt();
        this.items.push(id);
        return id;
    }

    stop(id: number): void {
        const index = this.items.indexOf(id);
        if (index > -1)
            this.items.splice(index, 1);
    }
}

export {
    PacProgressModel
}