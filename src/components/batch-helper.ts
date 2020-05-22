class BatchHelper<T> {
    action: Map<T, 'add' | 'update' | number> = new Map<T, 'add' | 'update' | number>();

    addIntent(foregroundList: Array<T>, obj: T): void {
        console.log('addIntent');
        const index = foregroundList.indexOf(obj);
        if (index > -1)
            return;
        foregroundList.push(obj);
        this.action.set(obj, 'add');
    }

    updateIntent(foregroundList: Array<T>, obj: T): void {
        debugger
        console.log('updateIntent');
        const index = foregroundList.indexOf(obj);
        if (index === -1)
            return;
        this.action.set(obj, 'update');
    }

    delIntent(foregroundList: Array<T>, obj: T): void {
        console.log('delIntent');
        const index = foregroundList.indexOf(obj);
        if (index === -1)
            return;
        foregroundList.splice(index, 1);
        if (this.action.get(obj) === 'add')
            this.action.delete(obj);
        else
            this.action.set(obj, index);
    }

    resetIntents(): void {
        this.action.clear();
    }

    async save<K>(foregroundList: Array<T>,
                  batchAdd: (objs: Array<T>) => Promise<Array<{ successful: boolean; statusCode: number; bean: T }>>,
                  batchUpdate: (objs: Array<T>) => Promise<Array<{ successful: boolean; statusCode: number; bean: T }>>,
                  batchDel: (keys: Array<K>) => Promise<Array<{ successful: boolean; statusCode: number; key: K }>>,
                  key: (obj: T) => K): Promise<{
        addSuccessful: Array<{ statusCode: number; bean: T }>;
        addFailed: Array<{ statusCode: number; bean: T }>;
        updateSuccessful: Array<{ statusCode: number; bean: T }>;
        updateFailed: Array<{ statusCode: number; bean: T }>;
        delSuccessful: Array<{ statusCode: number; key: K }>;
        delFailed: Array<{ statusCode: number; key: K }>;
    }> {
        debugger
        const objsAdd = new Array<T>();
        this.action.forEach((k, v) => {
            if (k === 'add') objsAdd.push(v);
        });
        const addResultList = await batchAdd(objsAdd);
        for (const i in objsAdd) {
            if (addResultList[i].successful) {
                const index = foregroundList.indexOf(objsAdd[i]);
                foregroundList[index] = addResultList[i].bean;
                this.action.delete(objsAdd[i]);
            }
        }

        const objsUpdate = new Array<T>();
        this.action.forEach((k, v) => {
            if (k === 'update') objsUpdate.push(v);
        });
        const updateResultList = await batchUpdate(objsUpdate);
        for (const i in objsUpdate) {
            if (updateResultList[i].successful) {
                const index = foregroundList.indexOf(objsUpdate[i]);
                foregroundList[index] = updateResultList[i].bean;
                this.action.delete(objsAdd[i]);
            }
        }

        const objsDel = new Array<T>();
        this.action.forEach((k, v) => {
            if (typeof (k) === 'number') objsDel.push(v);
        });
        const keysDel = objsDel.map(v => key(v));
        const delResultList = await batchDel(keysDel);
        for (const i in objsDel) {
            if (delResultList[i].successful) {
                this.action.delete(objsDel[i]);
            } else {
                foregroundList.splice(this.action.get(objsDel[i]) as number, 0, objsDel[i]);
                this.action.delete(objsDel[i]);
            }
        }
        return {
            addSuccessful: addResultList.filter(v => v.successful),
            addFailed: addResultList.filter(v => !v.successful),
            updateSuccessful: updateResultList.filter(v => v.successful),
            updateFailed: updateResultList.filter(v => !v.successful),
            delSuccessful: delResultList.filter(v => v.successful),
            delFailed: delResultList.filter(v => !v.successful),
        }
    }
}

export {
    BatchHelper
}