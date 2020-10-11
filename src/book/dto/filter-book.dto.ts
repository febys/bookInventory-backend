import {IsEnum, IsOptional, IsString} from "class-validator";
import {BookCategory} from "../book-category.enum";
import {AbstractParamBeanModel} from "../../core/models/abstract-param-bean.model";

export class FilterBookDto extends AbstractParamBeanModel {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    author: string;

    @IsOptional()
    @IsString()
    @IsEnum(BookCategory)
    category: BookCategory;
}