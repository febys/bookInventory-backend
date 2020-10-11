interface IListModelMetadata {
    pageNo: number;
    pageSize: number;
    totalPages?: number;
    totalRecords: number;
}

export class ListModel<T> implements IListModelMetadata {
    list: Array<T>;
    pageNo: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;

    constructor(list: Array<T> | any, configs?: IListModelMetadata, classInstance?: any) {
        if (typeof list === 'object') {
            if (list instanceof Array) {

                list = [...list];

            } else {

                list = Object
                    .keys(list)
                    .map(key => {
                        return {
                            id: list[key],
                            label: key
                        }
                    });
            }
        }

        this.list = classInstance ?
            this._mapClass(list, classInstance) :
            [...list];

        if (configs) {

            this.pageNo = configs.pageNo;
            this.pageSize = configs.pageSize;
            this.totalRecords = configs.totalRecords;

            this.totalPages = Math.ceil((this.totalRecords / this.pageSize));

        } else {

            this.pageNo = 1;
            this.pageSize = 20;
            this.totalRecords = this.list.length;

            this.totalPages = Math.ceil((this.totalRecords / this.pageSize));

        }
    }

    private _mapClass(list: Array<T>, classInstance: any): Array<T> {
        return [...list].map(listItem => (new classInstance(listItem)));
    }
}