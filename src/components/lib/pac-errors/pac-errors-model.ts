import {Vue} from "vue-property-decorator";

type PacErrorMessage = { subject: string; content: string | null }

class PacErrorObj {
    public paths: Array<string>;

    constructor(public id: string,
                public message: string | PacErrorMessage | null = null,
                public path: string | null = null) {
        this.paths = path !== null ? [path] : [];
    }

    setPath(...paths: Array<string>): PacErrorObj {
        this.paths = paths;
        return this;
    }
}

type PacErrorModel = { id: string; message: PacErrorMessage; paths: Array<string>; expanded: boolean }

class PacErrorsModel {
    constructor(
        public errors: Array<PacErrorModel> = []) {

    }

    set(errorObj: PacErrorObj): void {
        const index = this.errors.findIndex(v => v.id === errorObj.id);
        if (errorObj.message !== null)
            if (index > -1)
                Vue.set(this.errors, index, {
                    id: errorObj.id,
                    message: typeof (errorObj.message) === 'string' ? {
                        subject: errorObj.message,
                        content: null
                    } : errorObj.message,
                    paths: errorObj.paths,
                    expanded: false
                });
            else
                this.errors.push({
                    id: errorObj.id,
                    message: typeof (errorObj.message) === 'string' ? {
                        subject: errorObj.message,
                        content: null
                    } : errorObj.message,
                    paths: errorObj.paths,
                    expanded: false
                });
        else
            Vue.delete(this.errors, index);
    }

    findByPath(...paths: Array<string>): Array<PacErrorModel> {
        return this.errors.filter(v => v.paths.length >= paths.length && paths.every((p, j) => p === v.paths[j]));
    }
}

export {
    PacErrorObj,
    PacErrorModel,
    PacErrorsModel
}