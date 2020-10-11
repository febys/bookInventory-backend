import {objectCleaner} from "../functions/object.function";
import {ListModel} from "../models/list.model";

interface IFieldOptionsConfig<D> {
    fieldDataPool?: Array<D> | any;

    fieldRestPool?: string;
    fieldRestVal?: string;
    fieldDependsOn?: Array<string>;

    [other: string]: any;
}

class IdLabelModel {
    readonly id: string;
    readonly label: string;

    constructor(initData: any) {
        this.id = initData.id;
        this.label = initData.label;
    }
}

export function FieldOptions<D = any>(config: IFieldOptionsConfig<D>): any {
    return function (target: Function, key: string) {
        const metadata: any = {};

        if (Reflect.hasMetadata('fieldMetadata', target)) {
            Object.assign(metadata, Reflect.getMetadata('fieldMetadata', target));
        }

        const fieldRestConfig: any = {
            fieldRestPool: config.fieldRestPool,
            fieldRestVal: config.fieldRestVal,
            fieldDependsOn: config.fieldDependsOn
        };

        const fieldMetadata: IFieldOptionsConfig<any> = objectCleaner({
            fieldDataPool: config.fieldDataPool ?
                new ListModel(config.fieldDataPool, null, IdLabelModel) :
                null,
            ...fieldRestConfig
        });

        if (metadata[key]) {

            Object.assign(metadata[key], {...fieldMetadata});

        } else {

            Object.assign(metadata, {
                [key]: {
                    fieldName: key,
                    ...fieldMetadata
                }
            })

        }

        Reflect.defineMetadata('fieldMetadata', metadata, target);

        return this;
    }
}