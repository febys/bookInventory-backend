import { IsDecimal, IsEnum, IsNumber, IsString } from 'class-validator';
// import {BookCurrency} from "../book-currency.enum";
import {BookCategory} from "../book-category.enum";

export class AbstractBookDto {
    @IsString()
    description: string;

    @IsString()
    @IsEnum(BookCategory)
    category: BookCategory;

    @IsNumber()
    price: number;

    // @IsString()
    // @IsEnum(BookCurrency)
    // currency: BookCurrency;
}
