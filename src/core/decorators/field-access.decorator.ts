interface IFieldAccessConfig {
    canGet?: number;
    canPost?: number;
    canPut?: number;
}

interface IFieldAccessMetadataConfig extends IFieldAccessConfig{
    fieldName: string;
    [other: string]: any;
}

interface IFieldAccessMetadata {
    [fieldName: string]: IFieldAccessMetadataConfig;
}

class FieldAccessConfig {
    private readonly _canGet: number;
    private readonly _canPost: number;
    private readonly _canPut: number;

    constructor(initData?: IFieldAccessConfig) {
        if (initData) {

            this._canGet = initData.canGet || 3;
            this._canPost = initData.canPost || 3;
            this._canPut = initData.canPut || 3;

        } else {

            this._canGet = 3;
            this._canPost = 3;
            this._canPut = 3;

        }
    }

    get canGet(): number {
        return this._canGet;
    }

    get canPost(): number {
        return this._canPost;
    }

    get canPut(): number {
        return this._canPut;
    }

    get fieldAccess(): number {
        return +`${this._canGet}${this._canPost}${this._canPut}`;
    }
}

export function FieldAccess(config?: IFieldAccessConfig): any {
    const fieldAccessConfig = new FieldAccessConfig(config);

    return function (target: Function, key: string) {
        const metadata: IFieldAccessMetadata = {};

        if (Reflect.hasMetadata('fieldMetadata', target)) {
            Object.assign(metadata, Reflect.getMetadata('fieldMetadata', target));
        }

        const fieldType: any = Reflect.getMetadata('design:type', target, key);
        const fieldAccessMetadata: IFieldAccessConfig = {
            canGet: fieldAccessConfig.canGet,
            canPost: fieldAccessConfig.canPost,
            canPut: fieldAccessConfig.canPut
        };

        if (metadata[key]) {

            Object.assign(metadata[key], {
                inputType: fieldType.name,
                ...fieldAccessMetadata
            });

        } else {

            Object.assign(metadata, {
                [key]: {
                    fieldName: key,
                    inputType: fieldType.name,
                    ...fieldAccessMetadata
                }
            });

        }

        Reflect.defineMetadata('fieldMetadata', metadata, target);

        return this;
    }
}