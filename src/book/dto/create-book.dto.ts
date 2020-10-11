import {AbstractBookDto} from "./abstract-book.dto";
import { IsDateString, IsDecimal, IsNumber, IsString, Length } from 'class-validator';
import { BookCategory } from '../book-category.enum';

export class CreateBookDto extends AbstractBookDto {

    @Length(3, 75)
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsString()
    image: string;
}