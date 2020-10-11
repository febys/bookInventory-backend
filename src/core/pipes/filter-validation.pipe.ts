import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {AbstractParamBeanModel} from "../models/abstract-param-bean.model";

@Injectable()
export class FilterValidationPipe<T extends AbstractParamBeanModel> implements PipeTransform {
    transform(value: T | any, metadata: ArgumentMetadata): T {
        if (value) {
            if (typeof value === 'string') {
                return JSON.parse(value);
            }

            return value;
        }

        return value;
    }
}