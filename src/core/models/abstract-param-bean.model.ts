import {IsBoolean, IsNumber, IsOptional, Max} from "class-validator";

export class AbstractParamBeanModel {
    @IsOptional()
    @IsBoolean()
    fillFieldLabels: boolean;

    @IsOptional()
    @IsNumber()
    pageNo: number;

    @IsOptional()
    @Max(20)
    @IsNumber()
    pageSize: number;
}